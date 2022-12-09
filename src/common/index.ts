
/**
 * 图片文件转base64
 * @param file 图片文件
 * @returns base64 url
 */
export const base64fromFile = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject('读取文件错误')
    }
  })
}