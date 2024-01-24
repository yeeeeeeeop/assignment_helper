import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // 유저 정보
    const userData = {
      id: studentId,
      password: password,
    };

    // 서버 요청
    axios
      .post('http://localhost:8000/api/login', userData)
      .then((response) => {
        alert('로그인 성공');
        navigate('/main', { state: { id: studentId } });
      })
      .catch((error) => {
        alert('로그인 실패');
      });
  };

  return (
    <Wrapper>
      <h1>과제 관리 도우미야야야 </h1>
      <h2>로그인</h2>
      <form>
        <div>
          <Label htmlFor="studentId">학번</Label>
          <Input
            type="number"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          로그인
        </button>
      </form>
      <p>
        아직 회원이 아니신가요? <Link to="/signup">회원가입</Link> 페이지로
        이동하세요.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 0;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #000;
`;

export default LoginPage;
