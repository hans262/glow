import { useRef } from 'react'
import * as tf from '@tensorflow/tfjs';
import { loadImageData, loadLabelData, IMAGE_SIZE, IMAGE_H, IMAGE_W, NUM_CLASSES } from './MnistData'
import { Button, message, InputNumber, Alert, Progress, Space } from 'antd'
import { useMount, useSetState } from 'react-use';

export default function MnistTrain() {
  const imageBoxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const model = useRef<tf.Sequential>()
  const images = useRef<Uint8Array>()
  const labels = useRef<Uint8Array>()

  const [state, setState] = useSetState({
    mnistDataPending: false,
    trainPending: false,
    trainEpoch: 1,
    valAcc: 0,
    valLoss: 0,
    trainProgress: 0,
    predictResult: 0
  })

  useMount(() => {
    initCanvas()
  })

  const loadMnistData = async () => {
    if (images.current && labels.current) {
      return message.warning('数据已经加载了')
    }
    setState({ mnistDataPending: true })
    const result = await Promise.all([loadImageData(), loadLabelData()])
    images.current = result[0]
    labels.current = result[1]
    setState({ mnistDataPending: false })
    return message.success('loading done!')
  }

  const train = async () => {
    if (!model.current) {
      return message.warning('模型还没创建')
    }
    if (!images.current || !labels.current) {
      return message.warning('请先加载数据')
    }
    const epochs = state.trainEpoch
    setState({ trainPending: true })
    console.log('Training model...')
    // const model = this.model
    const batchSize = 320
    //遗留15%的训练数据进行验证，以监控训练期间的过度拟合
    const validationSplit = 0.15
    const xs = tf.tensor4d(
      images.current,
      [images.current.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1]
    )

    const ys = tf.tensor2d(
      labels.current, [labels.current.length / NUM_CLASSES, NUM_CLASSES]
    )
    //当前批次
    let trainBatchCount = 0
    //总批次
    const totalNumBatches = Math.ceil(xs.shape[0] * (1 - validationSplit) / batchSize) * epochs
    await model.current.fit(xs, ys, {
      batchSize,
      validationSplit,
      epochs,
      callbacks: {
        onBatchEnd: async (batch, logs: any) => {
          trainBatchCount++
          const trainProgress = ~~((trainBatchCount / totalNumBatches * 100) * 100) / 100
          setState({ trainProgress, valAcc: logs.acc, valLoss: logs.loss })
          // this.updateChart(logs.loss, logs.acc)
          if (batch % 10 === 0) {
            testImagePredict()
          }
          await tf.nextFrame()
        },
        onEpochEnd: async (epoch, logs: any) => {
          console.log("Epoch: " + epoch + " Loss: " + logs.loss)
          setState({ valAcc: logs.val_acc, valLoss: logs.val_loss })
          await tf.nextFrame()
        },
        onTrainEnd: () => {
          console.log('Train done!')
          setState({ trainPending: false })
        }
      }
    })
  }

  const createConvModel = () => {
    if (model.current) {
      return message.success('Model is created!')
    }
    const md = tf.sequential()
    md.add(tf.layers.conv2d({
      inputShape: [IMAGE_H, IMAGE_W, 1],
      kernelSize: 3,
      filters: 16,
      activation: 'relu'
    }))
    md.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    md.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    md.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    md.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    md.add(tf.layers.flatten({}))
    md.add(tf.layers.dense({ units: 64, activation: 'relu' }))
    md.add(tf.layers.dense({ units: 10, activation: 'softmax' }))
    md.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
    md.summary()
    model.current = md
    message.success('Model create done!')
  }

  const createDenseModel = () => {
    if (model.current) {
      return message.success('Model is created!')
    }
    const md = tf.sequential()
    md.add(tf.layers.flatten({ inputShape: [IMAGE_H, IMAGE_W, 1] }))
    md.add(tf.layers.dense({ units: 42, activation: 'relu' }))
    md.add(tf.layers.dense({ units: 10, activation: 'softmax' }))
    md.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
    md.summary()
    model.current = md
    message.success('Model create done!')
  }

  /**
   * 测试预测图片结果
   */
  const testImagePredict = () => {
    if (!images.current || !labels.current || !model.current) return
    //获取图片总张数
    // console.log('Img total is ' + this.images.length / 784)
    //渲染范围 0 ~ 100 总的范围 0 ~ (this.images.length / 784)
    const range = [100, 200]
    const count = range[1] - range[0]
    //按范围截取图片
    const cimages = images.current.slice(IMAGE_SIZE * range[0], range[1] * IMAGE_SIZE)
    const clabels = labels.current.slice(NUM_CLASSES * range[0], range[1] * NUM_CLASSES)

    // tensor4d ->  [n 28 28 1]
    const xs = tf.tensor4d(cimages, [cimages.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1])

    //获取真实结果
    const reals = clabels.reduce<number[]>((cur, item, i) => item ? [...cur, i % 10] : cur, [])
    //预测结果
    const output = model.current.predict(xs) as tf.Tensor2D
    const predictions = Array.from(output.argMax(1).dataSync())
    //必须显式的销毁
    xs.dispose()
    output.dispose()
    renderCanvas(cimages, count, predictions, reals)
  }

  const renderCanvas = (images: Uint8Array, count: number, predictions: number[], reals: number[]) => {
    const imageBox = imageBoxRef.current!
    imageBox.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const image = images.slice(i * 784, i * 784 + 784)
      const prediction = predictions[i]
      const real = reals[i]
      const div = document.createElement('div')
      div.className = 'pred-container'
      const canvas = document.createElement('canvas')
      canvas.className = 'prediction-canvas'
      const [width, height] = [28, 28]
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      const imageData = new ImageData(width, height)
      /**
       * ImageData.prototype.Uint8ClampedArray: Uint8ClampedArray
       * 是一个8位无符号整型数组，8个二进制位有256种变化
       * 所以能存储的十进制数就是0 ~ 255
       * 
       * 一张图片是 28X28，那么它就有 28X28 个像素点
       * 每一个像素点需要四个数据来表示 =  R红 G绿 B蓝 A色彩空间
       * 
       * 那么我们就需要 28 x 28 x 4 个字节来存储这张图片
       * 也就是new ImageData(28, 28)自动创建的内存空间大小
       */
      for (let i = 0; i < height * width; i++) {
        const j = i * 4
        imageData.data[j + 0] = image[i]
        imageData.data[j + 1] = image[i]
        imageData.data[j + 2] = image[i]
        imageData.data[j + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      const pred = document.createElement('div')
      const correct = prediction === real
      pred.style.backgroundColor = correct ? '#34d66a' : 'red'
      pred.innerText = `预测: ${prediction}`
      div.appendChild(pred)
      div.appendChild(canvas)
      imageBox.appendChild(div)
    }
  }

  const predict = () => {
    const canvasImg = imageRef.current!
    const drawCtx = canvasRef.current!.getContext('2d')!
    if (!model.current) {
      return message.warning('请先创建模型')
    }

    //只要红色通道
    const image3d280 = tf.browser.fromPixels(canvasImg, 1)
    const image3d28 = tf.image.resizeBilinear(image3d280, [28, 28])
    const image4d28 = image3d28.as4D(1, 28, 28, 1)

    const prediction = model.current.predict(image4d28) as tf.Tensor2D
    const maxIndex = prediction.argMax(1).dataSync()
    setState({ predictResult: maxIndex[0] })
    drawCtx.fillRect(0, 0, 280, 280)
  }

  const initCanvas = () => {
    const canvas = canvasRef.current!
    const image = imageRef.current!
    canvas.width = 280
    canvas.height = 280
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 280, 280)
    let moused = false
    canvas.addEventListener('mousedown', (e) => {
      moused = true
    })
    canvas.addEventListener('mouseup', (e) => {
      moused = false
      image.src = canvas.toDataURL('image/png')
    })
    canvas.addEventListener('mousemove', (e) => {
      if (!moused) return
      ctx.beginPath()
      ctx.lineWidth = 32
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'white'
      ctx.moveTo(e.offsetX, e.offsetY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="font-bold text-2xl mb-2">
        TRAINING PARAMETERS
      </div>
      <Space className='mb-2'>
        <Button
          loading={state.mnistDataPending}
          type="primary" size="large"
          onClick={loadMnistData}
        >LOAD DATA</Button>
        <Button
          onClick={createConvModel}
          type="primary"
          size="large"
        >CREATE MODEL</Button>
        <Button
          onClick={train}
          size="large"
          danger
          loading={state.trainPending}
        >TRAIN MODEL</Button>
        <span>EPOCHS</span>
        <InputNumber
          min={1} max={3}
          defaultValue={1}
          size="large"
          onChange={(e) => {
            if (typeof e === 'number') {
              setState({ trainEpoch: e })
            }
          }}
        />
      </Space>
      <div className="font-bold text-2xl mb-2">
        TRAINING PROGRESS
      </div>
      <div>
        {state.valAcc ? <Alert
          message={`精度：${state.valAcc}，误差：${state.valLoss}`}
          type="success"
        /> : null}
        <Progress percent={state.trainProgress} steps={30} strokeColor="#52c41a" />
      </div>
      <div ref={imageBoxRef} className="flex flex-wrap mb-2"></div>
      <div className="font-bold text-2xl mb-2">
        TEST MODEL
      </div>
      <div className="bt">
        <Button size="large" type="primary" onClick={predict}>PREDICT</Button>
      </div>
      <div className="draw">
        <canvas ref={canvasRef}></canvas>
        <img alt="" ref={imageRef} style={{ width: 280, height: 280, marginLeft: '2px' }} />
        <span style={{ fontSize: '80px', marginLeft: '30px', fontWeight: 600 }}>{state.predictResult}</span>
      </div>
    </div>
  )
}