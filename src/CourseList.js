import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// 전체 과목 목록
const CourseList = ({ userid }) => {
  const [courses, setCourses] = useState([]); // 과목
  const [searchQuery, setSearchQuery] = useState(""); // 검색
  const [searchField, setSearchField] = useState("course_num"); // 검색 설정

  // 수강 과목으로 등록
  const handleEnroll = async (course) => {
    try {
      await axios.post("http://localhost:8000/api/courses/enroll", {
        courseId: course.course_id,
        userId: userid,
      });
      alert("수강과목 등록 완료");
      window.location.reload();
    } catch (error) {
      alert("수강과목 등록 실패");
    }
  };

  // 과목 필터링
  const filteredCourses = courses.filter((course) => {
    const {
      course_num, // 학수번호
      course_class, // 분반
      course_name, // 과목명
      professor, // 교수명
      credit, // 학점
      univ, // 개설대학
      department, // 주관학과
    } = course;
    const lowerCaseQuery = searchQuery.toLowerCase();

    switch (searchField) {
      case "course_num":
        return course_num.toLowerCase().includes(lowerCaseQuery);
      case "course_class":
        return course_class.toLowerCase().includes(lowerCaseQuery);
      case "course_name":
        return course_name.toLowerCase().includes(lowerCaseQuery);
      case "professor":
        return professor.toLowerCase().includes(lowerCaseQuery);
      case "credit":
        return credit.toLowerCase().includes(lowerCaseQuery);
      case "univ":
        return univ.toLowerCase().includes(lowerCaseQuery);
      case "department":
        return department.toLowerCase().includes(lowerCaseQuery);
      default:
        return false;
    }
  });

  // 검색
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색 구분
  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/courses").then((response) => {
      setCourses(response.data);
    });
  }, []);

  return (
    <div>
      <h1>전체 강의 목록</h1>
      <SearchForm>
        <Select onChange={handleSearchFieldChange}>
          <option value="course_num">학수번호</option>
          <option value="course_class">분반</option>
          <option value="course_name">과목명</option>
          <option value="professor">교수</option>
          <option value="credit">학점</option>
          <option value="univ">개설대학</option>
          <option value="department">주관학과</option>
        </Select>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchForm>

      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>학수번호</th>
              <th>분반</th>
              <th>과목명</th>
              <th>교수</th>
              <th>학점</th>
              <th>개설대학</th>
              <th>주관학과</th>
              <th>등록</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_num}</td>
                <td>{course.course_class}</td>
                <td>{course.course_name}</td>
                <td>{course.professor}</td>
                <td>{course.credit}</td>
                <td>{course.univ}</td>
                <td>{course.department}</td>
                <td>
                  <button onClick={() => handleEnroll(course)}>등록</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
};

const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Select = styled.select`
  width: 150px;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export default CourseList;
