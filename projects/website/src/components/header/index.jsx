import { useNavigate } from 'react-router-dom'
import './style.scss'

export default () => {
  const navigate = useNavigate()
  const nav = [
    {
      name: '关于我们',
      nick: 'about',
    },
    {
      name: '项目案例',
      nick: 'project',
    },
    {
      name: '工作流程',
      nick: 'workflow',
    },
    {
      name: '联系我们',
      nick: 'contact',
    },
  ]

  return (
    <header className="header">
      <div className="logo">
        <img
          src="/logo.png"
          alt="范本设计"
          onClick={() => navigate('/')}
        />
      </div>
      <ul>
        {
          nav.map(
            (v) => (
              <li key={v.nick}>
                <p>{v.nick.toUpperCase()}</p>
                <p>{v.name}</p>
              </li>
            )
          )
        }
      </ul>
    </header>
  )
}