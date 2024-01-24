//
// 라우팅 컴포넌트
//

// libs
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AssignmentPage from './pages/AssignmentPage';
import CoursePage from './pages/CoursePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
