import useStore from "../stores/store"
import QuizPathList from "./QuizPathList"
import Question from "./Question";

export default function Start() {
  const { quizData, currentPathId, currentQuestionId, setCurrentPathId, setCurrentQuestionId, userAnwser, onSetUserAnwser } = useStore();

  return <div className="start">
    <h2>Bộ câu hỏi trắc nghiệm A1Academy</h2>
    <p>Tổng hợp và đánh giá kiến thức nền căn bản trong đầu tư Crypto cho người mới. Bao gồm { quizData.length } phần, hãy lần lượt trả lời để nhận được kết quả đánh giá kiến thức đầu tư của bạn.</p>
    { console.log(userAnwser) }
    
    {
      currentPathId ? <Question 
        __currentPathId={ currentPathId } 
        __currentQuestionId={ currentQuestionId } 
        userAnwser={ userAnwser.find(u => u.id == `${ currentPathId }.${ currentQuestionId }`)?.userAnwser } 
        onConfirm={ (answer, pID, qID) => {
          // console.log(answer, `${ pID }.${ qID }`);
          onSetUserAnwser(answer, `${ pID }.${ qID }`);
        } } />  : (
        <QuizPathList onSelect={ q => {
          setCurrentPathId(q.id);
          setCurrentQuestionId(q.questions[0].id);
        } } />
      )
    }
  </div>
}