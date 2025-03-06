import { CirclePlay } from "lucide-react";
import useStore from "../stores/store"

export default function QuizPathList({ onSelect }) {
  const { quizData, version } = useStore()
  console.log(version)
  return <div className="quiz-path-list">
    <strong>Chọn phần trắc nghiệm dưới đây và hoàn thành nó (không giới hạn thời gian).</strong>
    <ul className="quiz-path-list-option">
      {quizData.map((quiz, index) => {
        const { id, name, total_questions, total_points } = quiz
        return <li className="quiz-path-list-item" key={ id } onClick={ e => onSelect(quiz) }>
          <div className="quiz-path-list-path-name">
            <span className="__label">Phần { index + 1 }: {name} ({ total_points } điểm / { total_questions } câu hỏi)</span>
            <span className="__icon"><CirclePlay /></span>
          </div>
        </li>
      })}
    </ul> 
  </div>
}