import { useEffect, useRef, useState } from 'react'
import { interval, Subject, take, concatMap, map } from 'rxjs';
import { Button } from 'antd';

/**
 * rxjs 的队列实现
 * @returns 
 */
export default function Queue() {
  const content = useRef<HTMLDivElement>(null)
  const subject = useRef((new Subject<number>()))
  const [nums, setNums] = useState<number[]>([])

  const click = () => {
    const random = ~~(Math.random() * 10)
    subject.current.next(random)
    setNums([random, ...nums])
  }

  useEffect(() => {
    const observable = subject.current.pipe(
      concatMap(v => interval(1000).pipe(take(1), map(x => v)))
    )
    const sub = observable.subscribe(v => {
      writeBall(v, content.current!)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <div className='px-8 py-3'>
      <div className="text-4xl mb-2">RxJs 队列实现</div>
      <div className='mb-2'>
        <Button onClick={click} size="large" type='primary'>push</Button>
      </div>
      <div
        className={'h-[100px] border-solid border-amber-800 border-2 ' +
          ' rounded-lg relative overflow-hidden'}
        ref={content}
      ></div>
      <div>{nums.map((n, key) => <span key={key} className='mx-2'>{n}</span>)}      </div>
    </div>
  )
}


//写入流
const writeBall = (num: number, content: HTMLDivElement) => {
  const color = 'rgba(' + [
    Math.random() * 256,
    Math.random() * 256,
    Math.random() * 256
  ].join(',') + ', 1)'

  const ball = document.createElement('div')
  ball.style.position = 'absolute'
  ball.style.top = '25px'
  ball.style.width = '50px'
  ball.style.height = '50px'
  ball.style.background = color
  ball.style.borderRadius = '50%'
  ball.style.fontSize = '16px'
  ball.style.textAlign = 'center'
  ball.style.fontWeight = 'bold'
  ball.style.lineHeight = '50px'
  ball.style.color = '#fff'
  ball.style.boxShadow = '1px 1px 1px #bbb'
  ball.innerHTML = num.toString()
  ball.className = 'animate-move-right'
  content.appendChild(ball)

  const id = setTimeout(() => {
    content.removeChild(ball)
    clearTimeout(id)
  }, 5000)
}
