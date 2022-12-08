import * as tf from '@tensorflow/tfjs';
import { data, lablel } from './irisData'
import { useMount } from "react-use";

export default function TestTensor() {
  useMount(() => {
    tensor()
  })

  const tensor = () => {
    console.clear()
    //一个2层张量，第一层三个值，第二层两个值
    tf.tensor<tf.Rank.R2>([1, 2, 3, 4, 5, 6], [3, 2]).print()

    /** shape.length 总层数 shape[x] 表示每一层的个数 */
    tf.tensor1d([1, 2, 3, 4]).print() // [4]
    tf.tensor2d([1, 2, 3, 4], [4, 1]).print() // [2,1]
    tf.tensor3d([1, 2, 3, 4], [2, 1, 2]).print()
    tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 1, 2]).print()
  }

  const train = () => {
    // simulation -> y = 2x - 1
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1])
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1])

    //定义线性回归模型
    const model = tf.sequential()
    //该模型包含两层，第一层隐藏层，第二层输出层1个神经元
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
    //损失函数 优化器
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
    model.summary()
    model.fit(xs, ys, {
      epochs: 500,
      callbacks: {
        onEpochEnd: (_, logs) => {
          console.log(logs)
        },
        onTrainEnd: () => {
          const txs = tf.tensor2d([10, 3, 6, 7], [4, 1])
          const tys = model.predict(txs) as tf.Tensor2D
          tys.print()
        }
      }
    })
  }

  const trainIris = () => {
    /**
     * xs = [[5.1, 3.5, 1.4, 0.2], [7, 3.2, 4.7, 1.4]]
     * ys = [[1, 0, 0], [0, 1, 0]]
     */
    const dxs = data.map(d => d[0])
    const dys = data.map(d => {
      const index = lablel.findIndex(v => v === d[1][0])
      return new Array<number>(3).fill(0).fill(1, index, index + 1)
    })

    const xs = tf.tensor2d(dxs, [dxs.length, 4])
    const ys = tf.tensor2d(dys, [dys.length, 3])

    const model = tf.sequential()
    model.add(tf.layers.dense({
      inputShape: [4], // 隐藏层 4个输入值
      activation: "sigmoid", //激活函数sigmoid
      units: 5 // 第一层5个神经元
    }))
    //第二层，也是输出层，3个神经元
    model.add(tf.layers.dense({ activation: "softmax", units: 3 }))
    model.compile({ loss: "categoricalCrossentropy", optimizer: tf.train.adam(0.06) })

    model.fit(xs, ys, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs: any) => {
          console.log("Epoch: " + epoch + " Loss: " + logs.loss)
        },
        onTrainEnd: () => {
          const txs = tf.tensor2d([
            [5.8, 2.7, 5.1, 1.9], //virginica
            [6.4, 3.2, 4.5, 1.5], //versicolor
            [4.4, 2.9, 1.4, 0.2], //setosa
          ], [3, 4])
          const tys = model.predict(txs) as tf.Tensor2D
          // tys.print()
          //返回每行最大值的索引
          const pIndex = tys.argMax(1).arraySync() as number[]
          console.log(pIndex.map(v => lablel[v]))
        }
      }
    })
  }

  return (
    <div>
      <h1>Tensor</h1>
    </div>
  )
}

/**
 * Tensor -> 张量
 *
 * tf.tensor<R extends Rank>(
 * values: TensorLike, shape?: ShapeMap[R], dtype?: DataType
 * ): Tensor<R>
 *
 * values 值
 * shape  形状
 * dtype  类型
 *
 * 1d = [1,2,3]            shape [3]
 * 2d = [[1],[2],[3]]      shape [3, 1]
 * 3d = [[[1,2]],[[3,4]]]  shape [2, 1, 2]
 * 4d = [[[[1]]],[[[2]]]]  shpe  [2, 1, 1, 1]
 */