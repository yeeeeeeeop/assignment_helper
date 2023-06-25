import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// 과제 작성 페이지
const Write = ({ userid, courses, assignment, setShowWrite }) => {
  const [asg, setAsg] = useState({
    course_id: assignment ? assignment.course_id : "", // 과목 번호
    title: assignment ? assignment.title : "", // 제목
    deadline: assignment ? assignment.deadline : "", // 마감기한
    content: assignment ? assignment.content : "", // 내용
    status: assignment ? assignment.status : "N", // 상태
    userid: userid, // 유저 아이디
  });

  // 과제 추가
  const addAsg = (e) => {
    e.preventDefault();
    if (!asg.course_id || !asg.title || !asg.deadline) {
      alert("세부내용을 제외한 모든 항목을 입력해주세요.");
      return;
    }
    axios.post("http://localhost:8000/api/asg/write", asg).then(() => {
      window.location.reload();
      alert("추가 성공");
    });
  };

  // 과제 수정
  const updateAsg = (e) => {
    e.preventDefault();
    if (!asg.course_id || !asg.title || !asg.deadline) {
      alert("세부내용을 제외한 모든 항목을 입력해주세요.");
      return;
    }
    axios
      .patch(`http://localhost:8000/api/asg/update/${assignment.asg_id}`, asg)
      .then(() => {
        window.location.reload();
        alert("수정 성공");
      });
  };

  // 과제 내용 입력
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsg((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 작성 취소
  const handleCancel = () => {
    setShowWrite(false);
  };

  return (
    <Wrapper>
      <h1>{assignment ? "과제 수정" : "과제 추가"}</h1>
      <form>
        <Flex>
          <div>
            <H4>과목 선택</H4>
            <select
              name="course_id"
              value={asg.course_id}
              onChange={handleInputChange}
            >
              <option value="">과목 선택</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {`${course.course_name} (${course.course_class})`}
                </option>
              ))}
            </select>
          </div>
        </Flex>
        <div>
          <H4>제목</H4>
          <Input
            type="text"
            name="title"
            value={asg.title}
            onChange={handleInputChange}
          ></Input>
        </div>
        <div>
          <H4>세부내용</H4>
          <Text
            name="content"
            value={asg.content}
            onChange={handleInputChange}
          ></Text>
        </div>
        <div>
          <H4>기한</H4>
          <Input
            type="datetime-local"
            name="deadline"
            value={asg.deadline}
            onChange={handleInputChange}
          ></Input>
        </div>
      </form>
      <div>
        <button type="submit" onClick={assignment ? updateAsg : addAsg}>
          {assignment ? "수정완료" : "작성완료"}
        </button>
        <button type="submit" onClick={handleCancel}>
          취소
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  border: 1px solid #000;
  form {
    padding: 20px;
  }
`;

const H4 = styled.h4`
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

const Text = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #000;
`;

const Flex = styled.div`
  display: flex;
`;

export default Write;
