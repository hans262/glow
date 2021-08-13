import React from "react"
import { title1 } from "./styles"
import { ACTION, papersub } from "./subject"
import type { Item } from "./types"

interface RightProps {
  width: number
  layers: Item[]
}

export default function Right(props: RightProps) {
  const { width, layers } = props
  return (
    <div style={{ width, padding: 10, overflowY: 'scroll' }}>
      <div style={{ ...title1 }}>Layers:</div>
      {layers.map(l => <LayerView layer={l} key={l.id} />)}
    </div>
  )
}

export const LayerView: React.FC<{ layer: Item }> = ({ layer }) => {
  const onVisibleChange = (e: { visible: boolean, className: string, id: number }) => {
    papersub.next({ type: ACTION.VISIBLE_ITEM, payload: e })
  }

  return <>
    <div style={{
      display: 'flex', cursor: 'pointer',
      background: '#ccc', height: 30, alignItems: 'center'
    }}>
      <input defaultChecked={layer.visible} type="checkbox" style={{ marginRight: 10, cursor: 'pointer' }}
        onChange={e => onVisibleChange({
          visible: e.target.checked,
          className: layer.className, id: layer.id
        })} />
      <span>Layer {layer.id}</span>
    </div>
    {layer.children?.map(i =>
      <div key={i.id}
        className="cursor hover1"
      >
        <input type="checkbox" defaultChecked={i.visible} style={{ marginRight: 10, cursor: 'pointer' }}
          onChange={e => onVisibleChange({
            visible: e.target.checked,
            className: i.className, id: i.id
          })}
        />
        <span style={{ marginLeft: 10 }}>{i.className + i.id}</span>
      </div>
    )}
  </>
}