import { useSetState, useLocalStorage } from "react-use";
import { Configuration, OpenAIApi } from 'openai'
import { Button, Input, message, Skeleton, Tooltip } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons';
import { useRef } from "react";

type Words = {
  id: number,
  Me: string,
  ChatGpt3: string | string[],
  pending: boolean,
  type: 'text' | 'image'
}

export default function ChatGpt3() {
  const [state, setState] = useSetState({
    meMsg: '',
    words: [] as Words[],
  })
  const [openApiKey, setOpenApiKey] = useLocalStorage<string>(
    'openai-api-key',
    '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'
  )

  const openai = useRef(new OpenAIApi(new Configuration({
    apiKey: openApiKey,
  })))

  const onClick = async () => {
    if (state.meMsg === '') {
      return message.warning('请输入文字')
    }

    if (state.words[0]?.type === 'text' && state.words[0]?.pending) {
      return message.warning('请等待')
    }

    const id = Date.now() + Math.random()

    let newWords: Words[] = [
      { id, Me: state.meMsg, ChatGpt3: '', pending: true, type: 'text' },
      ...state.words
    ]
    setState({ words: newWords, meMsg: '' })

    const prompt = newWords
      .filter(v => v.type === 'text')
      .map(v => v.Me + '\n' + v.ChatGpt3)
      .reverse()
      .join('\n');

    const response = await openai.current.createCompletion({
      model: "text-davinci-003",
      prompt: prompt + '\n',
      max_tokens: 1000,
      frequency_penalty: 1.0,
      presence_penalty: 1.0,
      top_p: 0.9, //概率质量
    })
    
    console.log(response)
    newWords = newWords.map(v => {
      return v.id === id ? { ...v, ChatGpt3: response.data.choices[0].text!, pending: false } : v
    })
    setState({ words: newWords })
  }

  const onImage = async () => {
    if (state.meMsg === '') {
      return message.warning('请输入文字')
    }
    const id = Date.now() + Math.random()

    let newWords: Words[] = [
      { id, Me: state.meMsg, ChatGpt3: '', pending: true, type: 'image' },
      ...state.words
    ]
    setState({ words: newWords, meMsg: '' })

    const imageRes = await openai.current.createImage({
      prompt: state.meMsg,
      n: 2, //图片张数
      size: "256x256",
      // response_format: 'b64_json'
    })

    newWords = newWords.map(v => {
      return v.id === id ? { ...v, ChatGpt3: imageRes.data.data.map(v => v.url!), pending: false } : v
    })
    setState({ words: newWords })
    // console.log(imageRes.data.data)
  }

  return (
    <div className="px-8 py-3">
      <div className="text-4xl text-center mb-4">OpenAI-Chat-GPT3</div>
      <Input
        size="small"
        prefix={<span className="text-red-700">apiKey</span>}
        defaultValue={openApiKey}
        className="mb-2"
        suffix={
          <Tooltip title="请到openai官网获取apiKey
          https://beta.openai.com/account/api-keys">
            <InfoCircleOutlined style={{ color: 'rgba(255,200,0)' }} />
          </Tooltip>
        }
        onPressEnter={(e: any) => setOpenApiKey(e.target.value)}
      />

      <div className="flex mb-2">
        <Input className="mr-2 flex-1" value={state.meMsg} onChange={e => {
          setState({ meMsg: e.target.value })
        }} onPressEnter={onClick} />
        <Button onClick={onClick} className="mr-2"
          loading={state.words[0]?.type === 'text' && state.words[0]?.pending}
        >文字</Button>
        <Button onClick={onImage}
          loading={state.words[0]?.type === 'image' && state.words[0]?.pending}
        >图片</Button>
      </div>
      {state.words.map(v => <div key={v.id} className="mt-3">
        <div className="whitespace-pre-line">{
          v.pending ? <Skeleton.Input size="small" active /> :
            Array.isArray(v.ChatGpt3) ? v.ChatGpt3.map(i => <img className="mr-1" src={i} key={i} alt="" />) :
              v.ChatGpt3
        }</div>
        <div className="font-bold mt-1">Me: {v.Me}</div>
      </div>)}
    </div>
  )
}