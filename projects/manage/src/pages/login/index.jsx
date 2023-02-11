import { useState } from 'react'
import { Input, Button } from 'antd'
import './style.scss'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    console.log('a')
  }

  return (
    <div className="login">
      <div className='row'>
        <span>账号：</span>
        <Input
          size="large"
          placeholder="请输入账号..."
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          onPressEnter={() => submit()}
        />
      </div>
      <div className='row'>
        <span>密码：</span>
        <Input
          size="large"
          placeholder="请输入密码..."
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          onPressEnter={() => submit()}
        />
      </div>
      <div className="row">
        <Button
          className='button'
          size="large"
          type="primary"
          disabled={!username.length || !password.length}
        >
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
