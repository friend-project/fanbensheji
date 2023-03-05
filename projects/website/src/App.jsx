import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/home'
import Project from './pages/project'

function App() {
  // 北京梵本装饰有限公司
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/project/:id"
        element={<Project />}
      />
    </Routes>
  )
}

export default App
