import useStore from "../stores/store";
import QuestionsReport from "./QuestionsReport";

export default function PathReport({ pathID }) {
  const { quizData, reports } = useStore();
  const pathData = quizData.find(p => p.id == pathID);
  const currentReport = reports.find(r => r.pathId == pathID);

  return <div className="path-report">
    <div className="path-report__header">
      <p>Kết quả phần trắc nghiệm <strong>{ currentReport?.pathName }</strong>, bạn đã dành được <strong>{ currentReport?.userTotalPoins }</strong> điểm trên tổng số <strong>{ currentReport?.pathTotalPoins }</strong> điểm của phần này.</p>
    </div>
    <div className="path-report__questions">
      {
        pathData?.questions && <QuestionsReport questions={ pathData?.questions } />
      }
    </div>
  </div>
}