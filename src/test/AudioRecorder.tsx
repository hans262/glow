import { Button, Divider } from "antd";
import { createRef, useEffect, useRef } from "react";
import { useSetState } from "react-use";

const drawNextFrame = (
  analyserNode: AnalyserNode, canvas: HTMLCanvasElement
) => {
  requestAnimationFrame((n) => { drawNextFrame(analyserNode, canvas) })
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount)
  // 长度为 analyser.frequencyBinCount
  const bufferLength = dataArray.length
  const ctx = canvas.getContext('2d')!
  //复制当前波形或时域数据到buffer
  analyserNode.getByteFrequencyData(dataArray)
  //getByteFrequencyData getByteTimeDomainData

  const [width, height] = [600, 300]
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = 'rgb(200, 200, 200)'
  ctx.strokeStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(0, 0, width, height)

  let sliceWidth = width / bufferLength
  let x = 0
  for (let i = 0; i < bufferLength; i++) {
    let y = (dataArray[i] * height) / 256
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, y)
    ctx.stroke()
    x += sliceWidth
  }
}

const AudioRecorder: React.FC = () => {
  const canvasRef = createRef<HTMLCanvasElement>()
  const streamRef = useRef<MediaStream>()
  const mediaRecorderRef = useRef<MediaRecorder>()
  const analyserNodeRef = useRef<AnalyserNode>()

  const [state, setState] = useSetState({
    status: 'inactive' as 'inactive' | 'recording' | 'paused',
    chunks: [] as Blob[]
  })

  useEffect(() => {
    if (!canvasRef.current) return
    navigator.mediaDevices.getUserMedia({
      audio: true,
    }).then(stream => {
      streamRef.current = stream
      mediaRecorderRef.current = new MediaRecorder(stream)
      mediaRecorderRef.current.ondataavailable = (evt) => {
        console.log(evt.data)
        setState(e => ({ chunks: [...e.chunks, evt.data] }))
        // const blob = new window.Blob(this.chunks, { 'type': 'audio/webm; codecs=opus' })
      }

      const audioCtx = new AudioContext()
      //媒体流音频节点
      const sourceNode = audioCtx.createMediaStreamSource(stream)

      //实时频域节点
      analyserNodeRef.current = audioCtx.createAnalyser()
      // new AnalyserNode(audioCtx) audioCtx.createAnalyser()
      analyserNodeRef.current.fftSize = 512
      sourceNode.connect(analyserNodeRef.current)

      drawNextFrame(analyserNodeRef.current, canvasRef.current!)

    }).catch(err => {
      console.log(err)
    })
  }, [])


  const onRecordClick = () => {
    if (mediaRecorderRef.current?.state === 'inactive') {
      mediaRecorderRef.current?.start()
      setState({ status: 'recording' })
    } else if (
      mediaRecorderRef.current?.state === 'recording' ||
      mediaRecorderRef.current?.state === 'paused'
    ) {
      mediaRecorderRef.current?.stop()
      setState({ status: 'inactive' })
    }
  }

  const onPausedClick = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current?.pause()
      setState({ status: 'paused' })
    } else if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current?.resume()
      setState({ status: 'recording' })
    }
  }

  return (
    <div>
      <h1>音频采样</h1>
      <canvas ref={canvasRef} />
      <Divider />
      <div style={{
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '10px',
        width: 32, height: 32, borderRadius: '50%',
        background: state.status === 'inactive' ? 'rgb(10, 10, 10)' :
          state.status === 'recording' ? 'rgb(255, 0, 0)' : 'rgb(35, 116, 15)'
      }} />
      <Button onClick={onRecordClick}>
        {state.status === 'inactive' ? '录制' : '结束'}
      </Button>
      {['recording', 'paused'].includes(state.status) && <Button
        onClick={onPausedClick}>
        {state.status === 'recording' ? '暂停' : '继续'}
      </Button>}
      {state.chunks.length > 0 && <audio
        controls
        src={window.URL.createObjectURL(
          new window.Blob(state.chunks, { 'type': 'audio/webm; codecs=opus' })
        )}
      />}
      <div >
        {state.chunks.map((d, i) => <audio
          controls key={i}
          src={window.URL.createObjectURL(d)}
        />)}
      </div>
    </div>
  )
}

export default AudioRecorder