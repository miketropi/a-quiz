import { useState, useEffect, useMemo } from "react";
import useStore from "../stores/store";
import Button from "./Button";
import { ChevronRight, ChevronLeft, Grip, House } from 'lucide-react'; 

export default function Question({ __currentPathId, __currentQuestionId, userAnwser, onConfirm }) {
  const [ answer, setAnswer ] = useState("");
  const { quizData, setCurrentPathId, setCurrentQuestionId, ...rest } = useStore();
  const currentPath = quizData.find(q => q.id === __currentPathId);
  const currentQuestion = currentPath.questions.find(q => q.id === __currentQuestionId);
  const totalQuestions = currentPath.questions.length;
  const currentQuestionIndex = currentPath.questions.findIndex(q => q.id === __currentQuestionId);
  const nextQuestionId = currentPath.questions[currentQuestionIndex + 1]?.id;
  const prevQuestionId = currentPath.questions[currentQuestionIndex - 1]?.id;
  const totalPoint = useMemo(() => {
    // console.log([...rest.userAnwser].filter(i => i.pathId == __currentPathId));
    return [...rest.userAnwser].filter(i => i.pathId == __currentPathId).reduce((total, question) => {
      if(question.rightAnwser == question.userAnwser) {
        return total + question.point;
      } else {
        return total; 
      }
    }, 0);
  }, [rest.userAnwser])

  useEffect(() => {
    rest.updateReport(__currentPathId, totalPoint, 'doing')
  }, [totalPoint])

  useEffect(() => {
    // console.log('userAnwser', userAnwser)
    setAnswer(userAnwser)
  }, [userAnwser, __currentQuestionId])

  const onNext = () => {
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId);
    }
  }

  const onPrev = () => {
    if (prevQuestionId) {
      setCurrentQuestionId(prevQuestionId);
    }
  }

  const onFinish = () => { 
    // console.log('Finish!!!')
    rest.updateReport(__currentPathId, totalPoint, 'done')
  }

  return <div className="questions">
    <h4>{ currentPath.name } ({ currentQuestionIndex + 1 } / { totalQuestions })</h4> 
    {/* ({ totalPoint }) */}

    <hr style={{ margin: `1em 0` }} />

    <div dangerouslySetInnerHTML={{__html: currentQuestion.question.replace(/\n\n/g, '<br/>')}}></div>

    <hr style={{ margin: `1em 0` }} />
    
    <strong>Chọn câu trả lời: { answer }</strong>
    <div className="questions-options">
      {
        [...Object.keys(currentQuestion.options)].map(key => {
          const option = currentQuestion.options[key];
          return <div className={ ['questions-option', (key == answer ? '__selected' : '')].join(' ') } key={ `${ __currentPathId }__${ key }` }>
            <input type="radio" name="option" id={ key } checked={ (key == answer ? true : false) } onChange={ e => {
              setAnswer(key);
            } } /> 
            <label htmlFor={ key }>{ key }. { option }</label>
          </div>
        })
      }
    </div>
    <div className="questions-actions">
      <Button disabled={ (prevQuestionId ? false : true) } variant="outline" onClick={ onPrev }><ChevronLeft /> Trở lại</Button>
      <Button onClick={ e => {
        e.preventDefault();
        setCurrentPathId(null)
      } }><House /></Button>
      <Button disabled={ (answer ? false : true) } variant="primary" onClick={ (e) => {
        e.preventDefault();
        
        onConfirm(answer, __currentPathId, __currentQuestionId);
        if(nextQuestionId) {
          onNext()
        } else {
          onFinish()
        }
      } }>
        {
          nextQuestionId ? (<>Tiếp tục <ChevronRight/></>) : 'Hoàn thành'
        }
      </Button>
    </div>
  </div>
}