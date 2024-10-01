import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddSpacecraftPage from './pages/AddSpacecraftPage'
import './App.css'

/**
 * Renders a Router and a set the Routes.
 * The "/" URL maps to the HomePage component, and
 * the "/add" URL maps to the AddSpacecraftPage component.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddSpacecraftPage />} />
      </Routes>
    </Router>
  );
};

export default App
