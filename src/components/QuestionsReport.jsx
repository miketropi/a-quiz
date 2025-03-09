import useStore from "../stores/store";

export default function QuestionsReport({ questions }) {
  const { userAnwser } = useStore();

  return <div className="questions-report-view">
    {
      questions.map((question, index) => {
        const { id, point } = question;
        const userAnwserItem = userAnwser.find(u => u.questionId == id);
        return <div className="questions-report" key={ id }>
          {/* { JSON.stringify(userAnwserItem) } */}
          <div className="questions-report__question-text">
            <span className="questions-report__number">Câu { index + 1 }. </span>
            <div dangerouslySetInnerHTML={{__html: question.question.replace(/\n\n/g, '<br/>')}}></div>
          </div>
          <hr style={{ margin: `1em 0` }} />
          <div className="questions-report__answer">
            { 
              [...Object.keys(question.options)].map((__key, index) => {
                let classes = ['questions-report__answer__item'];
                let passed = false;
                if(question.right_answer == __key) {
                  classes.push('questions-report__answer__item--right');
                }

                if(userAnwserItem?.userAnwser == __key) {
                  classes.push('questions-report__answer__item--user-selected');
                }

                if(userAnwserItem?.userAnwser == __key && question.right_answer == __key) {
                  classes.push('questions-report__answer__item--correct');
                  passed = true;
                } 

                if(userAnwserItem?.userAnwser == __key && question.right_answer != __key) {
                  classes.push('questions-report__answer__item--wrong');
                }

                return <div className={ classes.join(' ') } key={ index }>
                  <span className="questions-report__answer__item__label">{ __key }. </span>
                  <span className="questions-report__answer__item__content">
                    { question.options[__key] }
                    {
                      passed == true ? <span style={{ marginLeft: '1em' }}>(+{ point } điểm)</span> : ''
                    }
                  </span>
                </div>
              })
            }
          </div>
          <hr style={{ margin: `1em 0` }} />
          <div className="questions-report__question-explain">
            <label>Giải thích: </label>
            <div dangerouslySetInnerHTML={{__html: question?.explanation}}></div>
          </div>
        </div>
      })
    }
  </div>
}