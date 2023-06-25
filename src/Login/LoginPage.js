import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 유저 정보
    const userData = {
      id: studentId,
      password: password,
    };

    // 서버 요청
    axios
      .post("http://localhost:8000/api/login", userData)
      .then((response) => {
        alert("로그인 성공");
        navigate("/main", { state: { id: studentId } });
      })
      .catch((error) => {
        alert("로그인 실패");
      });
  };

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <div>
          <label htmlFor="studentId">학번</label>
          <input
            type="number"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
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
    </div>
  );
};

export default LoginPage;
