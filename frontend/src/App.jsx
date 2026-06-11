import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Layout from './components/Layout';
import Dgtech from './pages/Dgtech';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dgtech" />} />
        <Route path="/dgtech" element={
          <Layout>
            <Dgtech />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App