import { Input, InputRef } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { fromEvent, map, debounceTime } from 'rxjs'

/**
 * input值改变后，延迟1s发送一个请求
 * 
 * 实现防抖
 */

export default function RxInput() {
	const inp = useRef<InputRef>(null)
	const [value, setValue] = useState('')

	useEffect(() => {
		const observable = fromEvent(inp.current?.input!, 'keyup').pipe(
			debounceTime(1000),
			map((e: any) => e.target.value)
		)
		const sub = observable.subscribe(v => {
			setValue(v)
			//发送请求
		})

		return () => {
			sub.unsubscribe()
		}
	}, [])

	return (
		<div className='px-8 py-6'>
			<h1>RxInput</h1>
			<Input ref={inp} type="text" size='large' />
			<h2>{value}</h2>
		</div>
	)
}