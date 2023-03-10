import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Layout, theme } from 'antd';

import Header from '../components/header'
import Nav from '../components/nav'

import Project from './project'
import ProjectEdit from './project/edit'
import Workflow from './workflow'
import Press from './press'
import Awards from './awards'
import About from './about'
import Contact from './contact'

const { Content } = Layout;



const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{
      minHeight: '100%',
    }}>
      <Header />
      <Layout>
       <Nav />
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route
                path="/"
                element={(<Navigate to='/main/contact' />)}
              />
              <Route path="project" element={<Project />} />
              <Route path="project/add" element={<ProjectEdit />} />
              <Route path="project/edit/:id" element={<ProjectEdit />} />
              <Route path="workflow" element={<Workflow />} />
              <Route path="press" element={<Press />} />
              <Route path="awards" element={<Awards />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App;