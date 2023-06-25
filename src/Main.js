import CheckList from "./CheckList";
import CourseList from "./CourseList";
import UserCourses from "./UserCourses";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// 메인화면
const Main = () => {
  const location = useLocation();
  const id = location.state && location.state.id; // 접속한 아이디
  const [courses, setCourses] = useState([]);

  // 유저의 과목 가져오기
  const fetchUserCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/users/${id}/courses`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("유저 과목 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, [id]);

  return (
    <Wrapper>
      <CourseList userid={id}></CourseList>
      <UserCourses userid={id} courses={courses} setCourses={setCourses} />
      <CheckList userid={id} courses={courses}></CheckList>
    </Wrapper>
  );
};

const List = styled.div`
  display: flex;
`;

const Wrapper = styled.div``;

export default Main;
