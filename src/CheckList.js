import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Write from "./Write";

// 과제 목록
const CheckList = ({ userid, courses }) => {
  const [completedList, setCompletedList] = useState([]); // 완료된 과제 목록
  const [incompletedList, setIncompletedList] = useState([]); // 미완료된 과제 목록
  const [selectedAssignment, setSelectedAssignment] = useState(null); // 선택된 과제
  const [showWrite, setShowWrite] = useState(false); // 과제 보여주기

  // 과제 삭제
  const handleDelete = async (asgId) => {
    try {
      await axios.delete(`http://localhost:8000/api/asg/delete/${asgId}`, {});
      window.location.reload();
      alert("삭제되었습니다");
    } catch (error) {
      console.error("과제 삭제 실패:", error);
      alert("과제 삭제에 실패했습니다");
    }
  };

  // 과제 완료
  const handleComplete = async (asgId) => {
    try {
      const endpoint = "incomplete";
      const message = "완료했습니다";
      await axios.patch(`http://localhost:8000/api/asg/${endpoint}/${asgId}`);
      window.location.reload();
      alert(message);
    } catch (error) {
      console.error("과제 완료 실패:", error);
      alert("과제 상태 업데이트에 실패했습니다");
    }
  };

  // 과제 미완료
  const handleIncomplete = async (asgId) => {
    try {
      const endpoint = "completed";
      const message = "미완료 상태로 돌아갑니다";
      await axios.patch(`http://localhost:8000/api/asg/${endpoint}/${asgId}`);
      window.location.reload();
      alert(message);
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("과제 상태 업데이트에 실패했습니다");
    }
  };

  // 완료된 과제 불러오기
  const fetchCompletedList = async () => {
    try {
      let url;
      url = "http://localhost:8000/api/asg/completed";
      const response = await axios.get(url, { params: { userid: userid } });
      const { data } = response;
      setCompletedList(data);
    } catch (error) {
      console.error("완료된 과제 불러오기 실패:", error);
    }
  };

  // 미완료된 과제 불러오기
  const fetchIncompletedList = async () => {
    try {
      let url;
      url = "http://localhost:8000/api/asg/incomplete";
      const response = await axios.get(url, { params: { userid: userid } });
      const { data } = response;
      setIncompletedList(data);
    } catch (error) {
      console.error("미완료된 과제 불러오기 실패:", error);
    }
  };

  // 과제 수정
  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setShowWrite(true);
  };

  useEffect(() => {
    fetchCompletedList();
    fetchIncompletedList();
  }, []);

  return (
    <div>
      {showWrite && (
        <Write
          userid={userid}
          courses={courses}
          assignment={selectedAssignment}
          setShowWrite={setShowWrite}
        />
      )}
      {!showWrite && (
        <Button onClick={() => setShowWrite(true)}>새로운 과제 추가</Button>
      )}

      <h1>미완료 과제들</h1>
      <Table>
        <tbody>
          {incompletedList.map((asg) => (
            <tr>
              <Td>
                <Button onClick={() => handleDelete(asg.asg_id)}>삭제</Button>
              </Td>
              <Td>{asg.course_name}</Td>
              <Td>{asg.title}</Td>
              <Td>
                {new Date(asg.deadline)
                  .toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(",", "")}
              </Td>
              <Td>
                {(() => {
                  const currentDate = new Date();
                  const deadlineDate = new Date(asg.deadline);
                  if (currentDate > deadlineDate) {
                    return "기한마감";
                  } else {
                    const timeDiff = Math.abs(
                      deadlineDate.getTime() - currentDate.getTime()
                    );
                    const daysLeft = Math.ceil(
                      timeDiff / (1000 * 60 * 60 * 24)
                    );
                    return `${daysLeft - 1}일 남음`;
                  }
                })()}
              </Td>
              <Td>
                <Button onClick={() => handleEdit(asg)}>수정</Button>
                <Button onClick={() => handleComplete(asg.asg_id)}>완료</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1>완료 과제들</h1>
      <Table>
        <tbody>
          {completedList.map((asg) => (
            <tr>
              <Td>
                <Button onClick={() => handleDelete(asg.asg_id)}>삭제</Button>
              </Td>
              <Td>{asg.course_name}</Td>
              <Td>{asg.title}</Td>
              <Td>
                {new Date(asg.deadline)
                  .toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                  .replace(",", "")}
              </Td>
              <Td>
                {(() => {
                  const currentDate = new Date();
                  const deadlineDate = new Date(asg.deadline);
                  if (currentDate > deadlineDate) {
                    return "기한마감";
                  } else {
                    const timeDiff = Math.abs(
                      deadlineDate.getTime() - currentDate.getTime()
                    );
                    const daysLeft = Math.ceil(
                      timeDiff / (1000 * 60 * 60 * 24)
                    );
                    return `${daysLeft - 1}일 남음`;
                  }
                })()}
              </Td>
              <Td>
                <Button onClick={() => handleEdit(asg)}>수정</Button>
                <Button onClick={() => handleIncomplete(asg.asg_id)}>
                  미완료
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  /* 버튼 스타일을 설정하세요 */
`;

export default CheckList;
