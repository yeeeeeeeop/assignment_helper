import React, { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = () => {
    // 회원가입 정보
    const userData = {
      id: studentId,
      password: password,
      name: name,
    };

    // 서버 요청
    axios
      .post("http://localhost:8000/api/signup", userData)
      .then((response) => {
        alert("회원가입 성공");
        window.location.href = "/";
      })
      .catch((error) => {
        alert("회원가입 실패", error);
      });
  };

  return (
    <div>
      <h1>회원가입</h1>
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
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
