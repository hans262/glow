import { ResizeBox } from "../components/ResizeBox";
import bg from '../common/abc.jpeg'
import { BgCover } from "../components/BgCover";
import { useState } from "react";
import { FlowBox } from '../components/FlowBox'

export default function Test() {
  const [list, setList] = useState(new Array(10).fill(1))

  const onScrollBottom = () => {
    console.log('到底了')
    setList(e => [...e, ...new Array(10).fill(1)])
  }

  return (
    <div style={{
      margin: '0 100px',
      border: '1px solid',
    }}>
      <FlowBox style={{ padding: 10 }} height={600} onScrollBottom={onScrollBottom}>
        {list.map((v, key) => <ResizeBox key={key} height={'50%'} style={{
          borderRadius: 8, overflow: 'hidden', marginBottom: 10
        }}>
          <BgCover src={bg} style={{ height: '100%' }}>
            {key}
          </BgCover>
        </ResizeBox>)}
      </FlowBox>
    </div>
  )
}