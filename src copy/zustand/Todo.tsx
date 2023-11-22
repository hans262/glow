import { Input, List, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
import { useTodoStore, TodoFilter } from '../store/todo'

let todoId = 0

export default function Todo() {
  const store = useTodoStore(state => state)

  const onSearch = (v: string) => {
    if (!v.trim()) return
    const todo = { id: todoId++, text: v, completed: false }
    store.addTodo(todo)
  }

  const onRadioChange = (e: RadioChangeEvent) => {
    const filter = e.target.value as TodoFilter
    store.switchTodoFilter(filter)
  }

  const filterTodo = (filter: TodoFilter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return store.data.filter(td => td.completed)
      case 'SHOW_ACTIVE':
        return store.data.filter(td => !td.completed)
      default:
        return store.data
    }
  }

  return (
    <div>
      <Input.Search
        placeholder="input todo"
        enterButton="Add Todo"
        size="large"
        onSearch={onSearch}
      />
      <List
        bordered
        dataSource={filterTodo(store.filter)}
        renderItem={(v) =>
          <List.Item
            onClick={() => store.toggleTodo(v.id)}
            style={{ color: v.completed ? 'red' : 'green', cursor: 'pointer' }}
          >{v.text}</List.Item>
        }
      />
      <Radio.Group
        defaultValue={store.filter}
        onChange={onRadioChange}
        buttonStyle="solid"
      >
        <Radio.Button value="SHOW_ALL">SHOW_ALL</Radio.Button>
        <Radio.Button value="SHOW_COMPLETED">SHOW_COMPLETED</Radio.Button>
        <Radio.Button value="SHOW_ACTIVE">SHOW_ACTIVE</Radio.Button>
      </Radio.Group>
    </div>
  )
}
