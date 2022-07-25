import { message } from "antd"
import { useState } from "react"
import { classNames } from "../common/classNames"
import { Button } from "../components/Button"
import { Input } from "../components/Input"

const Index: React.FC = () => {
  // const onFinish
  return (
    <>
      <LoginMysqlPg />
    </>
  )
}

export default Index

const LoginMysqlPg: React.FC<{
  onFinish?: (payload: any) => void
}> = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    if (!account || !password) {
      message.warning('请输入帐号或密码')
    }
    console.log(account, password)
  }

  return (
    <div className={classNames(
      'flex items-center justify-center flex-col h-screen',
      ''
    )}>
      <div className="flex flex-col items-center">
        <div className="text-7xl">MYSQL</div>
        <div className='mb-1'>
          帐号：<Input value={account} onChange={e => setAccount(e.target.value)} />
        </div>
        <div className='mb-1'>
          密码：<Input value={password} type={'password'} onChange={e => {
            setPassword(e.target.value)
          }} />
        </div>
        <div className="w-full text-right"><Button onClick={onSubmit}>提交</Button></div>
      </div>
    </div>
  )
}
