import { ResizeBox } from "../components/ResizeBox";
import bg from '../common/abc.jpeg'
import { BgCover } from "../components/BgCover";
import { useState } from "react";
import { FoldBox } from "../components/FoldBox";

export default function Test() {
  const [show, setShow] = useState(false)
  return (
    <div style={{ margin: '0 100px' }}>
      <button onClick={() => setShow(!show)}>show</button>
      <FoldBox visible={show}>
        <ResizeBox height={'50%'} style={{
          borderRadius: 8, overflow: 'hidden'
        }}>
          <BgCover src={bg} style={{ height: '100%' }}>
            hello world
          </BgCover>
        </ResizeBox>
      </FoldBox>
    </div>
  )
}