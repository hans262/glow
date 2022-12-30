/**
 * 图片尺寸信息
 */
export const IMAGE_H = 28
export const IMAGE_W = 28
export const IMAGE_SIZE = IMAGE_H * IMAGE_W

/**
 * 图片像素点数据
 * 宽 784 * 高 65000
 * 每一行的784个像素点 -> 28 * 28 的一张图片
 * 
 * Uint8Array 八位无符号整型数组存储 只存储一个通道
 * byteLength = 65000 * 784
 */

const NUM_DATASET_ELEMENTS = 65000 //图片总数
const MNIST_IMAGES_SPRITE_PATH = import.meta.env.BASE_URL + 'mnist_images.png'

/**
 * 图片label数据
 * Uint8Array 用8位无符号整数存储
 * length = 65000 * 10 | byteLength = 65000 * 10
 * 
 * 用每十个字节位来表示 0 ~ 9
 * 1000000000 => 0
 * 0100000000 => 1
 * 0100000001 => 9
 */
export const NUM_CLASSES = 10
const MNIST_LABELS_PATH = import.meta.env.BASE_URL + 'mnist_labels_uint8'

/**
 * 取前五万张
 */
const NUM_TRAIN_ELEMENTS = 50000

export function loadImageData(): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    img.src = MNIST_IMAGES_SPRITE_PATH
    img.onload = () => {
      img.width = img.naturalWidth
      img.height = img.naturalHeight
      const datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE)
      //一次裁剪5000高度的图片，以获取像素，避免内存泄露；也就是5000张图片
      const chunkSize = 5000
      canvas.width = img.width
      canvas.height = chunkSize
      for (let i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
        ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const datasetBytesView = new Uint8Array(
          datasetBytesBuffer,
          i * img.width * chunkSize,
          img.width * chunkSize
        )
        for (let j = 0; j < datasetBytesView.length; j++) {
          //只要一个通道训练即可 红色通道 rgba
          datasetBytesView[j] = imageData.data[j * 4]
        }
      }
      const datasetImages = new Uint8Array(datasetBytesBuffer)
      console.log(datasetImages)
      const res = datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS)
      resolve(res)
    }
  })
}

export function loadLabelData(): Promise<Uint8Array> {
  return new Promise(async (resolve) => {
    const labelsResponse = await fetch(MNIST_LABELS_PATH).then(r => r.arrayBuffer())
    const datasetLabels = new Uint8Array(labelsResponse)
    const res = datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS)
    resolve(res)
  })
}