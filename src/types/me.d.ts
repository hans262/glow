declare interface Window {
  MediaRecorder: any
  MathJax: any
  AMap: any
}

declare module '*.ogg' {
  const source: string
  export default source
}