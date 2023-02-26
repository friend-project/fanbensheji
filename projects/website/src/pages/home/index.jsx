import './style.scss'

import Header from '../../components/header'
import About from '../../components/about'
import Project from '../../components/project'
import Workflow from '../../components/workflow'
import Contact from '../../components/contact'
import Footer from '../../components/footer'

export default () => {
  return (
    <>
      <Header />
      {true ? <About /> : null}
      {true ? <Project /> : null}
      {true ? <Workflow /> : null}
      {true ? <Contact /> : null}
      {true ? <Footer /> : null}
    </>
  )
}