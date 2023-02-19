import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    quiz: {
      loading: false,
      questionCategory: ``,
      questionDifficulty: ``,
      questionType: ``,
      amountOfQuestions: 20
    },
    settingIsShown: true,
    questions: [],
    answerSelected: false,
    canNotStart: false,
    index: 0,
    score: 0,
    triedToStart: false
  }

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeLoading: (state, action) => {
      state.quiz.loading = action.payload;
    },
    changeCategory: (state, action) => {
      state.quiz.questionCategory = action.payload;
    },
    changeDifficulty: (state, action) => {
      state.quiz.questionDifficulty = action.payload;
    },
    changeType: (state, action) => {
      state.quiz.questionType = action.payload;
    },
    changeAmount: (state, action) => {
      state.quiz.amountOfQuestions = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setAnswerSelected: (state, action) => {
      state.answerSelected = action.payload;
    },
    setCanNotStart: (state, action) => {
      state.canNotStart = action.payload;
    },
    setTriedToStart: (state, action) => {
      state.triedToStart = action.payload;
    },
    setSettingIsShown: (state, action) => {
      state.settingIsShown = action.payload;
    },
  },
})

export const {
  changeLoading,
  changeCategory,
  changeDifficulty,
  changeType,
  changeAmount,
  setQuestions,
  setScore,
  setIndex,
  setAnswerSelected,
  setCanNotStart,
  setTriedToStart,
  setSettingIsShown
} = quizSlice.actions;

export default quizSlice.reducer;