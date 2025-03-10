import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'
import quizData1 from '../data/quiz-path-1.json'
import quizData2 from '../data/quiz-path-2.json'
import quizData3 from '../data/quiz-path-3.json'
import quizData4 from '../data/quiz-path-4.json'
import quizData5 from '../data/quiz-path-5.json'

const quizData = [
  quizData1.path, 
  quizData2.path, 
  quizData3.path,
  quizData4.path,
  quizData5.path,
];
const userAnwser = [];
[...quizData].map(pItem => {
  return [...pItem.questions].map(qItem => {
    userAnwser.push({
      id: `${ pItem.id }.${ qItem.id }`,
      pathId: pItem.id,
      questionId: qItem.id,
      userAnwser: '',
      rightAnwser: qItem.right_answer,
      point: qItem.point,
      pathReportViewId: '',
    })
  })
})
const reports = [...quizData].map(pItem => {
  return {
    pathName: pItem.name,
    pathID: pItem.id,
    userTotalPoins: 0,
    pathTotalPoins: pItem.total_points,
    status: '', // doing / done
  }
})

// Define the initial state
const initialState = {
  version: `1.0.0`,
  quizData,
  currentPathId: null,
  currentQuestionId: null,
  userAnwser,
  reports,
}

const persistStore = (set, get) => ({
  ...initialState,
  setCurrentPathId: (pathId) => {
    set((state) => {
      state.currentPathId = pathId
    })
  },
  setCurrentQuestionId: (questionId) => {
    set((state) => {
      state.currentQuestionId = questionId
    })
  },
  onSetUserAnwser: (userAnwser, id) => {
    set((state) => {
      state.userAnwser.map(item => {
        if (item.id === id) {
          item.userAnwser = userAnwser
        }
      })
    })
  },
  updateReport: (pathId, userTotalPoints, status) => {
    set((state) => {
      state.reports.map(item => {
        if (item.pathID === pathId) {
          item.userTotalPoins = userTotalPoints
          item.status = status
        }
      })
    })
  },
  setReport: (report) => {
    set((state) => {
      state.reports = report
    })
  },
})

const useStore = create(
  persist(
    immer(persistStore),
    {
      name: 'quiz-storage',
      version: 1,
      partialize: (state) => ({
        userAnwser: state.userAnwser,
        reports: state.reports,
      })
    }
  )
)

export default useStore