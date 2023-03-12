import { useSearchParams } from 'react-router-dom'
import { Element, animateScroll as scroll } from 'react-scroll'


import './style.scss'

import Header from '../../components/header'
import About from '../../components/about'
import Project from '../../components/project'
import Workflow from '../../components/workflow'
import Contact from '../../components/contact'
import Footer from '../../components/footer'

import Detail from '../project'

export default () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id')

  if (id) return <Detail />
  return (
    <>
      <Header />
      <Element>
        <About />
      </Element>
      <Element>
        <Project />
      </Element>
      <Element>
        <Workflow />
      </Element>
        <Element>
          <Contact />
        </Element>
      <Footer />
    </>
  )
}
