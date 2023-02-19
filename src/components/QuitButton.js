import { setQuestions, setTriedToStart } from '../features/quiz/quizSlice';
import { useDispatch } from 'react-redux'


export default function QuitButton() {
  const dispatch = useDispatch();

  const handleQuitTheQuiz = () => {
    dispatch(
      setQuestions([])
    );
    dispatch(
      setTriedToStart(false)
    );
  }

  return (
    <button className="quit-button my-3 py-1" onClick={handleQuitTheQuiz}>Quit</button>
  )
}
