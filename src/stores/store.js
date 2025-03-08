import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import quizData1 from '../data/quiz-path-1.json'
import quizData2 from '../data/quiz-path-2.json'

const quizData = [quizData1.path, quizData2.path];
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
    })
  })
})
const reports = [...quizData].map(pItem => {
  return {
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

// Create store with Zustand + Immer
const useStore = create(
  immer((set) => ({
    // Initial state
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
  }))
)

export default useStore