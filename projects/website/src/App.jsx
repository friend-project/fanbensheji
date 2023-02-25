import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from './pages/home'

function App() {
  // 北京梵本装饰有限公司
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
    </Routes>
  )
}

export default App
