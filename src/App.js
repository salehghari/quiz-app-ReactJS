import HideSettingBtn from './components/HideSettingBtn';
import Questions from './components/Questions';
import Settings from './components/Settings';
import StartButton from './components/StartButton';
import QuitButton from './components/QuitButton';

import { setSettingIsShown } from './features/quiz/quizSlice';

import { useDispatch, useSelector } from 'react-redux'

import './style.css';

export default function App() {
  const dispatch = useDispatch();

  const settingIsShown = useSelector((state) => state.quiz.settingIsShown);
  const encodedQuestions = useSelector((state) => state.quiz.questions);
  const questionIndex = useSelector((state) => state.quiz.index);
  const question = encodedQuestions[questionIndex];

  const showHideSettings = () => {
    dispatch(
      setSettingIsShown(!settingIsShown)
    )
  }
  return (
    <div className="App">
      <h1 style={{margin: "8px 0 4px 0"}}>Quiz App</h1>
      <a href="https://www.instagram.com/salehghari" className="link subtitle-effect my-2">
        <div className="first">
          Any Bug?! <span style={{color: "#565eff"}}>DM me please!</span> {`<3`}
        </div>
        <div className="second">
          Any Bug?! <span style={{color: "#565eff"}}>DM me please!</span> {`<3`}
        </div>
      </a>
      {question && <HideSettingBtn text={ settingIsShown ? "Hide" : "Show" } onClick={ showHideSettings } />}
      <Settings isShown={ settingIsShown } />
      <Questions />
      <div className="action-buttons">
        <StartButton />
        <QuitButton />
      </div>
    </div>
  );
}
