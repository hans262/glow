import { Button, Divider } from "antd";
import clsx from "clsx";
import { useRef } from "react";
import { useMount, useSetState } from "react-use";

const AudioRecorder: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStream = useRef<MediaStream>();
  const mediaRecorderRef = useRef<MediaRecorder>();
  const analyserNodeRef = useRef<AnalyserNode>();

  const [state, setState] = useSetState({
    status: "inactive" as "inactive" | "recording" | "paused",
    chunks: [] as Blob[],
  });

  useMount(async () => {
    try {
      if (!canvasRef.current) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStream.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (evt) => {
        console.log(evt.data);
        setState((e) => ({ chunks: [...e.chunks, evt.data] }));
        // const blob = new Blob(this.chunks, { 'type': 'audio/webm; codecs=opus' })
      };

      const audioCtx = new AudioContext();
      //媒体流音频节点
      const sourceNode = audioCtx.createMediaStreamSource(stream);

      //实时频域节点
      analyserNodeRef.current = audioCtx.createAnalyser();
      analyserNodeRef.current.fftSize = 512;
      sourceNode.connect(analyserNodeRef.current);

      drawNextFrame(analyserNodeRef.current, canvasRef.current, getRootWidth);
    } catch (err) {
      console.log(err);
      console.log("麦克风访问错误");
    }
  });

  const onRecord = () => {
    if (mediaRecorderRef.current?.state === "inactive") {
      mediaRecorderRef.current?.start();
      setState({ status: "recording" });
    } else if (
      mediaRecorderRef.current?.state === "recording" ||
      mediaRecorderRef.current?.state === "paused"
    ) {
      mediaRecorderRef.current?.stop();
      setState({ status: "inactive" });
    }
  };

  const onPaused = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current?.pause();
      setState({ status: "paused" });
    } else if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current?.resume();
      setState({ status: "recording" });
    }
  };

  const getRootWidth = () => {
    return rootRef.current?.getBoundingClientRect().width ?? 0;
  };

  return (
    <div className="container mx-auto p-20">
      <div className="text-2xl text-center mb-2">音频采样</div>
      <div ref={rootRef}>
        <canvas ref={canvasRef} className="rounded-md" />
      </div>
      <Divider />
      <div className="flex items-center space-x-2">
        <div
          className={clsx("rounded-full w-7 h-7 bg-black", {
            "!bg-[red]": state.status === "recording",
            "!bg-[green]": state.status === "paused",
          })}
        />
        <Button onClick={onRecord} type="primary">
          {state.status === "inactive" ? "录制" : "结束"}
        </Button>
        {["recording", "paused"].includes(state.status) && (
          <Button onClick={onPaused}>
            {state.status === "recording" ? "暂停" : "继续"}
          </Button>
        )}
      </div>
      <div>
        {state.chunks.map((d, k) => (
          <audio controls key={k} src={window.URL.createObjectURL(d)} />
        ))}
      </div>
    </div>
  );
};

export default AudioRecorder;

/**
 * 实现测量当前分贝
 */

const drawNextFrame = (
  analyserNode: AnalyserNode,
  canvas: HTMLCanvasElement,
  getRootWidth: () => number
) => {
  requestAnimationFrame((n) => {
    drawNextFrame(analyserNode, canvas, getRootWidth);
  });
  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  // 长度为 analyser.frequencyBinCount
  const bufferLength = dataArray.length;
  const ctx = canvas.getContext("2d")!;
  //复制当前波形或时域数据到buffer
  analyserNode.getByteFrequencyData(dataArray);
  //getByteFrequencyData getByteTimeDomainData

  const [width, height] = [getRootWidth(), 300];
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "rgb(200, 200, 200)";
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, width, height);

  let sliceWidth = width / bufferLength;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    let y = (dataArray[i] * height) / 256;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    x += sliceWidth;
  }
};
