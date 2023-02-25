import './style.scss'

import Header from '../../components/header'
import About from '../../components/about'
import Project from '../../components/project'
import Workflow from '../../components/workflow'
import Contact from '../../components/contact'

export default () => {
  return (
    <>
      <Header />
      {false ? <About /> : null}
      {false ? <Project /> : null}
      {false ? <Workflow /> : null}
      {true ? <Contact /> : null}
    </>
  )
}