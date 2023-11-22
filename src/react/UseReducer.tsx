import { createContext, useContext, useReducer } from 'react'
import { Button } from 'antd'

type Action = { type: 'RESET' } | { type: 'INCREMENT' } | { type: 'DECREMENT' }

interface Context {
	state: { count: number }
	dispatch: (action: Action) => void
}

const defaultContext = {
	state: { count: 5 },
	dispatch: (_: Action) => { }
} as Context

const MyContext = createContext(defaultContext)

export default function UseReducer() {
	const [state, dispatch] = useReducer(
		(state: Context['state'], action: Action) => {
			switch (action.type) {
				case 'RESET':
					return defaultContext.state
				case 'INCREMENT':
					return { ...state, count: state.count + 1 }
				case 'DECREMENT':
					return { ...state, count: state.count - 1 }
				default:
					return state
			}
		}, defaultContext.state
	)

	return (
		<MyContext.Provider value={{ state, dispatch }}>
			<h1>React: useReducer + useContext</h1>
			<View />
			<Control />
		</MyContext.Provider>
	)
}

const View: React.FC = () => {
	const { state } = useContext(MyContext)
	return (
		<h3>Count: {state.count}</h3>
	)
}

const Control: React.FC = () => {
	const { dispatch } = useContext(MyContext)
	return (
		<>
			<Button onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
			<Button onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>
			<Button onClick={() => dispatch({ type: 'RESET' })}>RESET</Button>
		</>
	)
}