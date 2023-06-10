import { Button, List } from 'antd'
import { useMusicStore } from '../store/music'

export default function LoadData() {
  const store = useMusicStore(state => state)

  return (
    <div>
      <Button
        loading={store.pending}
        size="large"
        danger
        type="primary"
        onClick={() => store.fetch('music')}
      >LOAD DATA</Button>
      <List
        bordered
        dataSource={store.data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}