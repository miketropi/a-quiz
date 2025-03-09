import { useEffect } from "react";
import useStore from "../stores/store"
import QuizPathList from "./QuizPathList"
import Question from "./Question";
import PathReport from "./PathReport";

export default function Start() {
  const { quizData, currentPathId, currentQuestionId, setCurrentPathId, setCurrentQuestionId, userAnwser, onSetUserAnwser, reports } = useStore();

  const View = (
    <>
      {
        (() => {
          let currentReport = reports.find(r => r.pathID == currentPathId);
          if(currentReport?.status == 'done') {
            return <PathReport pathID={ currentPathId } />
          } else {
            return <Question 
              __currentPathId={ currentPathId } 
              __currentQuestionId={ currentQuestionId } 
              userAnwser={ userAnwser.find(u => u.id == `${ currentPathId }.${ currentQuestionId }`)?.userAnwser } 
              onConfirm={ (answer, pID, qID) => {
                onSetUserAnwser(answer, `${ pID }.${ qID }`);
              } } 
            />;
          }
        })()
      }
    </>
  )

  return <div className="start">
    <h2>Bộ câu hỏi trắc nghiệm A1Academy</h2>
    <p>Tổng hợp và đánh giá kiến thức nền căn bản trong đầu tư Crypto cho người mới. Bao gồm { quizData.length } phần, hãy lần lượt trả lời để nhận được kết quả đánh giá kiến thức đầu tư của bạn.</p>
    { JSON.stringify(reports) }
    {/* { JSON.stringify(userAnwser) } */}
    
    {
      currentPathId ? View  : (
        <QuizPathList onSelect={ q => {
          setCurrentPathId(q.id);
          setCurrentQuestionId(q.questions[0].id);
        } } />
      )
    }
    {/* <PathReport pathID={ '103827a5-b064-4314-b0b3-22b4a6e9e186' } /> */}
  </div>
}