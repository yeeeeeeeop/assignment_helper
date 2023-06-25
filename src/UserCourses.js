import axios from "axios";
import styled from "styled-components";

// 유저가 수강중인 목록
const UserCourses = ({ userid, courses, setCourses }) => {
  // 수강 과목 삭제
  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/users/${userid}/courses/${courseId}`
      );
      alert("과목 삭제 완료");
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.course_id !== courseId)
      );
    } catch (error) {
      alert("과목삭제 실패:", error);
    }
  };

  return (
    <div>
      <h1>수강중인 목록</h1>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <th>학수번호</th>
              <th>분반</th>
              <th>과목명</th>
              <th>교수</th>
              <th>학점</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td>{course.course_num}</td>
                <td>{course.course_class}</td>
                <td>{course.course_name}</td>
                <td>{course.professor}</td>
                <td>{course.credit}</td>
                <td>
                  <button onClick={() => handleDeleteCourse(course.course_id)}>
                    삭제
                  </button>
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

export default UserCourses;
