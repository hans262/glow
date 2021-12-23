declare interface Window {
  MediaRecorder: any
  MathJax: any
}

declare module '*.ogg' {
  const source: string
  export default source
}