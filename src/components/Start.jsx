import { useEffect } from "react";
import useStore from "../stores/store"
import QuizPathList from "./QuizPathList"
import Question from "./Question";
import PathReport from "./PathReport";
import MainReport from "./MainReport";
import Button from "./Button";
import UserFinanceForm from "./UserFinanceForm";

const components = {
  "UserFinanceForm": UserFinanceForm,
}

export default function Start() {
  const { quizData, currentPathId, currentQuestionId, setCurrentPathId, setCurrentQuestionId, userAnwser, onSetUserAnwser, reports, setReport, updateReportMetaPoints } = useStore();

  const View = (
    <>
      {
        (() => {
          let currentReport = reports.find(r => r.pathID == currentPathId);
          if(currentReport?.status == 'done') {
            return <PathReport pathID={ currentPathId } />
          } else {
            let currentQuestionData = quizData.find(p => p.id == currentPathId)?.questions.find(q => q.id == currentQuestionId);
            // console.log(currentQuestionData);

            if(currentQuestionData?.type == 'custom_question') {
              let CustomComponent = components[currentQuestionData?.component];
              let __userAnswerData = userAnwser.find(u => u.id == `${ currentPathId }.${ currentQuestionId }`)?.userAnwser;
              let __props = __userAnswerData ? {... __userAnswerData} : { ...currentQuestionData?.props }
              let __id = `${ currentPathId }.${ currentQuestionId }`;
              return <>
                {/* ({ totalPoint }) */}
                {/* <h4 dangerouslySetInnerHTML={{__html: currentQuestionData.question.replace(/\n\n/g, '<br/>')}}></h4> */}

                <CustomComponent 
                  heading={ currentQuestionData.question }
                  __currentPathId={ currentPathId } 
                  __currentQuestionId={ currentQuestionId } 
                  { ...__props } 
                  onUpdate={ (fields, point) => {
                    // console.log(fields, point);
                    onSetUserAnwser({ fields }, `${ currentPathId }.${ currentQuestionId }`);
                    updateReportMetaPoints(currentPathId, {
                      name: currentQuestionData?.component,
                      point: point,
                    })
                  } } />
              </>
            }

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
    {/* { JSON.stringify(reports) } */}
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
    {/* <Button onClick={ e => {
      const getRandomNumber = (min = 1, max = 24) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      let __reports = [...reports].map(item => {
        return {
          ...item,
          userTotalPoins: getRandomNumber(),
          status: 'done'
        }
      })

      setReport(__reports)
    } }>Make Random Report (test report)</Button> */}

    {/* <UserFinanceForm /> */}

    {
      reports.length > 0 && reports.every(report => report.status === 'done') && <>
        <MainReport />
        <Button onClick={ e => {
          window.localStorage.removeItem('quiz-storage');
          window.location.reload();
        } }>Reset</Button>
      </>
    }

    {/* <MainReport /> */}
  </div>
}