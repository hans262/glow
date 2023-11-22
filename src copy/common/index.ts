
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

/**
 * 金额转换
 * @param number 
 * @returns ¥123,456.79
 */
export const NumberFormat = (number: number) => {
  const china = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  });
  return china.format(number)
}