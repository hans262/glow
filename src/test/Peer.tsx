import { Spin, Divider, message } from "antd";
import { useEffect, useRef } from "react";
import Peer, { DataConnection, MediaConnection } from "peerjs";
import { useSetState } from 'react-use'
import { Button } from "../components/Button";
import { Input, Textarea } from "../components/Input";

//视频配置
const msc = {
  video: { width: 200, height: 200 },
  audio: true,
}

const App = () => {
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const currentConnection = useRef<DataConnection>();
  const currentCall = useRef<MediaConnection>();

  const peer = useRef<Peer>()
  const [state, setState] = useSetState({
    localId: undefined as (undefined | string),
    remoteId: '' as (undefined | string),
    messages: [] as { id: string, type: 'remote' | 'localId', data: string }[],
    customMsg: '',
    connected: false
  })

  useEffect(() => {
    if (state.connected && currentConnection.current) {
      const connection = currentConnection.current
      setState({ remoteId: connection.peer })
      connection.on('data', (data: any) => {
        setState(e => ({
          messages: e.messages.concat({
            id: connection.peer, type: 'remote',
            data: data
          })
        }))
      })
      connection.on('close', () => {
        console.log('关闭')
      })
    }
  }, [state.connected])

  useEffect(() => {
    peer.current = new Peer();
    peer.current.on("open", id => {
      setState({ localId: id })
    })

    // 监听别人连我，只有别人连我才会触发
    // 还没有考虑管理多个连接的问题，新连接会覆盖以前的连接
    // 导致新连接 on data 不触发
    peer.current.on('connection', (connection) => {
      if (currentConnection.current) {
        currentConnection.current.close()
        setState({ connected: false })
      }
      currentConnection.current = connection
      setState({ connected: true })
    })

    // 监听别人call
    peer.current.on('call', async (call) => {
      if (window.confirm(`是否接受 ${call.peer}?`)) {
        call.on('stream', (stream) => {
          remoteVideo.current!.srcObject = stream;
        })
        currentCall.current = call
        let stream = undefined
        try {
          stream = await navigator.mediaDevices.getUserMedia(msc)
        } catch (error) {
          message.warning('没有本地摄像头')
        } finally {
          call.answer(stream)
        }
      } else {
        call.close()
        alert('已关闭')
      }
    })

    return () => {
      console.log('销毁peer')
      peer.current?.destroy()
    }
  }, [])

  const callUser = async () => {
    if (!state.remoteId) {
      return message.warning('请输入对方id')
    }
    if (peer.current) {
      const connection = peer.current.connect(state.remoteId)
      connection.on('open', () => {
        currentConnection.current = connection
        setState({ connected: true })
      })

      // 获取本地视频流 需要https环境才可以
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(msc)
      } catch (error) {
        message.warning('没有本地摄像头，不能打给别人')
        return
      }

      // 多媒体传输
      const call = peer.current.call(state.remoteId, stream)
      call.on("stream", (stream: any) => {
        remoteVideo.current!.srcObject = stream;
      });

      call.on("error", (err: any) => {
        console.error(err);
      });

      call.on('close', () => {
        currentCall.current?.close()
      })
      currentCall.current = call
    }
  }

  const sendMsg = () => {
    if (!state.customMsg) {
      return message.warning('请输入内容')
    }
    if (!currentConnection.current) {
      return message.warning('请先连接对方')
    }
    const connection = currentConnection.current
    connection.send(state.customMsg)
    setState(e => ({
      messages: e.messages.concat({
        id: connection.peer, type: 'localId',
        data: state.customMsg
      }),
      customMsg: ''
    }))
  }

  const onCopyId = () => {
    navigator.clipboard.writeText(state.localId!).then(() => {
      message.success('复制成功')
    })
  }

  return (
    <div className='container mx-auto px-4 py-4' >
      <div className="mb-2 space-x-2">
        {state.localId ? <>
          我的ID: {state.localId}
          <span className="cursor-pointer text-green-800"
            onClick={onCopyId}
          >拷贝</span>
        </> : <Spin spinning={true} />}
      </div>
      <div className="mb-2 space-x-2">
        <Input
          readOnly={state.connected}
          value={state.remoteId}
          onChange={e => setState({ remoteId: e.target.value })}
          placeholder="对方id"
        />
        <Button onClick={callUser}
          disabled={state.connected}
        >
          {state.connected ? '已连接' : '连接对方'}
        </Button>
      </div>
      <div>
        <div>对方摄像头</div>
        <video autoPlay ref={remoteVideo} style={{
          width: msc.video.width, height: msc.video.height, background: '#000'
        }} />
      </div>
      <Divider />
      <div className="space-x-2 sticky top-0 mb-2">
        <Textarea
          value={state.customMsg}
          onChange={e => setState({ customMsg: e.target.value })}
          placeholder="请输入..."
        />
        <Button onClick={sendMsg}>发消息</Button>
      </div>
      <div>
        {state.messages.map((v, k) => <div key={k}>
          {v.type === 'remote' ? '对方：' : '我：'}
          {v.data}
        </div>)}
      </div>
    </div>
  );
}

export default App