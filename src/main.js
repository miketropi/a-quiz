import { createRoot } from 'react-dom/client';
import QuizApp from './components/QuizApp.jsx';

;((w) => {
  "use strict"

  const aQuizInit = () => {
    const quiz = document.querySelector("#A_QUIZ_ROOT");
    if (!quiz) return;

    const root = createRoot(quiz);
    root.render(<QuizApp />);
  }
 
  document.addEventListener("DOMContentLoaded", () => {
    aQuizInit();
  })

})(window)