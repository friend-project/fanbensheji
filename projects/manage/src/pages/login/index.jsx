import { useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  Input,
  Button,
  message,
} from 'antd'
import r from '../../library/request'

import './style.scss'

function Login() {
  const [, setCookie] = useCookies([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async () => {
    const rst = await r(
      '/user',
      {
        username,
        password,
      },
      'POST',
    )
    if (rst.code) {
      message.error('账号或密码错误')
    } else {
      setCookie(
        'userjwt',
        'f715ed50ac09682c7fceec6b394b48d5',
        {
          path: '/',
          maxAge: 24 * 60 * 60,
        }
      )
      window.location.href = '/'
    }
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
          onClick={() => submit()}
        >
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
