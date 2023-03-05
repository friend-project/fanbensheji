import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Link, animateScroll as scroll } from 'react-scroll'

import './style.scss'

export default () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [fixed, setFixed] = useState(false)
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
  
  const scrollTop = () => {
    const top = document.body.scrollTop || document.documentElement.scrollTop
    if (top > 2000) {
      setShow(true)
    } else {
      setShow(false)
    }
    if (top >= 312) {
      setFixed(true)
    } else {
      setFixed(false)
    }
  }

  useEffect(
    () => {
      document.addEventListener('scroll', scrollTop)
    },
    [],
  )

  return (
    <>
      <header
        className={
          classNames(
            'header',
          )
        }
      >
        <div className="logo">
          <img
            src="/logo.png"
            alt="范本设计"
            onClick={() => navigate('/')}
          />
          <div
            className={
              classNames(
                'menu',
                {
                  active: open,
                }
              )
            }
            onClick={() => setOpen(!open)}
          >
            <span className="top" />
            <span className="middle" />
            <span className="bottom" />
          </div>
        </div>
        <ul className={
          classNames(
            'nav',
            {
              active: open,
            }
          )
        }>
          {
            nav.map(
              (v) => (
                <li
                  key={v.nick}
                  className={
                    classNames({
                      active: active === v.nick
                    })
                  }
                >
                  <Link
                    activeClass="active"
                    to={v.nick}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onSetActive={
                      () => {
                        setActive(v.nick)
                        setOpen(false)
                      }
                    }
                  >
                    <p>{v.nick.toUpperCase()}</p>
                    <p>{v.name}</p>
                  </Link>
                </li>
              )
            )
          }
        </ul>
      </header>
      {
        fixed ? (
          <header
            className={
              classNames(
                'header',
                {
                  active: fixed,
                }
              )
            }
          >
            <div className="logo">
              <img
                src="/logo.png"
                alt="范本设计"
                onClick={() => navigate('/')}
              />
              <div
                className={
                  classNames(
                    'menu',
                    {
                      active: open,
                    }
                  )
                }
                onClick={() => setOpen(!open)}
              >
                <span className="top" />
                <span className="middle" />
                <span className="bottom" />
              </div>
            </div>
            <ul className={
              classNames(
                'nav',
                {
                  active: open,
                }
              )
            }>
              {
                nav.map(
                  (v) => (
                    <li
                      key={v.nick}
                      className={
                        classNames({
                          active: active === v.nick
                        })
                      }
                    >
                      <Link
                        activeClass="active"
                        to={v.nick}
                        spy={true}
                        smooth={true}
                        duration={500}
                        onSetActive={
                          () => {
                            setActive(v.nick)
                            setOpen(false)
                          }
                        }
                      >
                        <p>{v.nick.toUpperCase()}</p>
                        <p>{v.name}</p>
                      </Link>
                    </li>
                  )
                )
              }
            </ul>
          </header>
        ) : null
      }
      <div className="slide">
        {
          nav.map(
            (v) => (
              <Link
                key={v.nick}
                activeClass="active"
                to={v.nick}
                spy={true}
                smooth={true}
                duration={500}
                onSetActive={
                  () => {
                    setActive(v.nick)
                    setOpen(false)
                  }
                }
              >
                <div />
                <p>{v.nick.toUpperCase()}</p>
              </Link>
            )
          )
        }
      </div>
      {
        show ? (
          <div
            className="backtop"
            onClick={() => scroll.scrollToTop()}
          >
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
            >
              <path
                d="M535.12 442.432v210.016a16 16 0 0 1-16 16h-16.16a16 16 0 0 1-16-16V440.208l-32.88 32.864a16 16 0 0 1-11.312 4.688h-28.304a14.464 14.464 0 0 1-10.24-24.688l97.824-97.808a11.136 11.136 0 0 1 15.744 0l97.808 97.808a14.464 14.464 0 0 1-10.24 24.688h-28.288a16 16 0 0 1-11.312-4.688l-30.64-30.64zM512 800c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
                fill="#000000"
              />
            </svg>
          </div>
        ) : null
      }
    </>
  )
}
