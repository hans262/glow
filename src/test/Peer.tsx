import { Button, Col, List, Row, Space, Spin, Input, Tag, message } from "antd";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const App = () => {
  const [loading, setLoading] = useState(true);

  const [localId, setLocalId] = useState('');
  const [remoteId, setRemoteId] = useState('');

  const [messages, setMessages] = useState<any>([]);
  const [customMsg, setCustomMsg] = useState('');

  const currentCall = useRef<any>();
  const currentConnection = useRef<any>();

  const peer = useRef<any>()

  const localVideo = useRef<any>();
  const remoteVideo = useRef<any>();

  useEffect(() => {
    createPeer()

    return () => {
      endCall()
    }
  }, [])

  const endCall = () => {
    if (currentCall.current) {
      currentCall.current.close()
    }
  }

  const createPeer = () => {
    peer.current = new Peer();
    peer.current.on("open", (id: any) => {
      setLocalId(id)
      setLoading(false)
    });

    // 纯数据传输
    peer.current.on('connection', (connection: any) => {
      // 接受对方传来的数据
      connection.on('data', (data: any) => {
        setMessages((curtMessages: any) => [
          ...curtMessages,
          { id: curtMessages.length + 1, type: 'remote', data }
        ])
      })

      currentConnection.current = connection
    })

    // 监听别人连我
    peer.current.on('call', async (call: any) => {
      if (window.confirm(`是否接受 ${call.peer}?`)) {
        // 获取本地流
        let stream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          //播放本地流
          localVideo.current.srcObject = stream
          localVideo.current.play()
          // 本地流响应给对方
          call.answer(stream)
        } catch (error) {
          message.warning('没有本地摄像头')

        } finally {
          // 监听对方流，并更新到 remoteVideo 上
          call.on('stream', (stream: any) => {
            remoteVideo.current.srcObject = stream;
            remoteVideo.current.play()
          })
          currentCall.current = call
        }
      } else {
        call.close()
        alert('已关闭')
      }
    })
  }

  //拨打给对方
  const callUser = async () => {
    // 获取本地视频流 需要https环境才可以
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    } catch (error) {
      message.warning('没有本地摄像头，不能打给别人')
      return
    }

    //播放本地流
    localVideo.current.srcObject = stream
    localVideo.current.play()

    // 数据传输
    const connection = peer.current.connect(remoteId);
    currentConnection.current = connection
    connection.on('open', () => {
      message.info('已连接')
    })

    // 多媒体传输
    const call = peer.current.call(remoteId, stream)
    call.on("stream", (stream: any) => {
      remoteVideo.current.srcObject = stream;
      remoteVideo.current.play()
    });
    call.on("error", (err: any) => {
      console.error(err);
    });
    call.on('close', () => {
      endCall()
    })

    currentCall.current = call
  }

  const sendMsg = () => {
    // 发送自定义内容
    if (!currentConnection.current) {
      message.warn('还未建立链接')
    }
    if (!customMsg) {
      return;
    }
    currentConnection.current.send(customMsg)
    setMessages((curtMessages: any) => [
      ...curtMessages,
      { id: curtMessages.length + 1, type: 'local', data: customMsg }
    ])
    setCustomMsg('');
  }

  return (
    <div className='p-3' >
      <h1>本地 Peer ID: {localId || <Spin spinning={loading} />}</h1>

      <div>
        <Space>
          <Input value={remoteId} onChange={e => setRemoteId(e.target.value)} type="text" placeholder="对方 Peer 的 Id" />
          <Button type="primary" onClick={callUser}>视频通话</Button>
          <Button type="primary" danger onClick={endCall}>结束通话</Button>
        </Space>
      </div>

      <Row gutter={16}>
        <Col span={12}>
          <h2>本地摄像头</h2>
          <video controls autoPlay ref={localVideo} muted />
        </Col>
        <Col span={12}>
          <h2>远程摄像头</h2>
          <video controls autoPlay ref={remoteVideo} />
        </Col>
      </Row>

      <h1>发送消息</h1>
      <div>
        <h2>消息列表</h2>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(msg: any) => (
            <List.Item key={msg.id}>
              <div>
                <span>{msg.type === 'local' ? <Tag color="red">我</Tag> : <Tag color="green">对方</Tag>}</span>
                <span>{msg.data}</span>
              </div>
            </List.Item>
          )}
        />

        <h2>自定义消息</h2>
        <Input.TextArea
          placeholder="发送自定义内容"
          value={customMsg}
          onChange={e => setCustomMsg(e.target.value)}
          rows={4}
        />
        <Button
          disabled={!customMsg}
          type="primary"
          onClick={sendMsg}
          style={{ marginTop: 16 }}>
          发送
        </Button>
      </div>
    </div>
  );
}

export default App