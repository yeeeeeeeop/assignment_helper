import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
    <Wrapper>
      <h1>회원가입</h1>
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
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
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

export default SignupPage;
