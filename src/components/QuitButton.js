import { setQuestions, setTriedToStart, setSettingIsShown } from '../features/quiz/quizSlice';
import { useDispatch, useSelector } from 'react-redux'


export default function QuitButton() {

  const settingIsShown = useSelector(state => state.quiz.settingIsShown) 

  const dispatch = useDispatch();
  
  const handleQuitTheQuiz = () => {
    dispatch(
      setQuestions([])
    );

    dispatch(
      setTriedToStart(false)
    );

    if(!settingIsShown) {
      dispatch(
        setSettingIsShown(true)
      )
    }
  }

  return (
    <button className="quit-button my-3 py-1" onClick={handleQuitTheQuiz}>Quit</button>
  )
}
