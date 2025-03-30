import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignUp from './pages/SignUp';
import './App.css'
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Interview from './pages/Interview';
import InterviewFeedback from './pages/InterviewFeedback';

function AppContent() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />  
      <Route path="/dashboard" element={
          <Dashboard />
      } />
       <Route path="/dashboard/interview/:id" element={
          <Interview />
      } />
      <Route path="/dashboard/interview/:id/feedback" element={
          <InterviewFeedback />
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App
