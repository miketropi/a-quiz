import useStore from "../stores/store";
import Button from "./Button";
import QuestionsReport from "./QuestionsReport";
import { ChevronLeft } from 'lucide-react';

export default function PathReport({ pathID }) {
  const { quizData, reports, setCurrentPathId } = useStore();
  const pathData = quizData.find(p => p.id == pathID);
  const currentReport = reports.find(r => r.pathID == pathID);

  const reportTemp = (
    <div className="path-report__header">
      <p>Kết quả phần trắc nghiệm <strong>{ currentReport?.pathName }</strong>, bạn đã dành được <strong>{ currentReport?.userTotalPoins }</strong> điểm trên tổng số <strong>{ currentReport?.pathTotalPoins }</strong> điểm của phần này.</p>
      <hr style={{ margin: `1em 0` }} />
      <Button onClick={ e => {
        e.preventDefault();
        setCurrentPathId(null);
      } }><ChevronLeft /> Trở lại</Button>
    </div>
  )

  return <div className="path-report">
    { reportTemp }
    <div className="path-report__questions">
      {
        pathData?.questions && <QuestionsReport questions={ pathData?.questions } />
      }
    </div>
    { reportTemp }
  </div>
}