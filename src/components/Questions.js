import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnswerSelected, setScore, setIndex, setTriedToStart } from '../features/quiz/quizSlice'


const decodeHTML = function (html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default function Question() {

  const goodSentencesList = ["Nice!", "Nailed It!", "Wow!", "Good Job!", "Great!", "Well Done!"];
  const badSentencesList = ["Nope!", "0 IQ!", "Why? That Was Easy!", "You Stupid!", "Kidding Me?", "WTF?!", "Read Some Book For Sure!"];
  const [goodSentence, setGoodSentence] = useState("");
  const [badSentence, setBadSentence] = useState("");

  const [difficultyTextColor, setDifficultyTextColor] = useState("");

  const [questions, setQuestions] = useState([]);
  const [animation, setAnimation] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);

  const score = useSelector(state => state.quiz.score);
  const encodedQuestions = useSelector(state => state.quiz.questions);
  const answerSelected = useSelector(state => state.quiz.answerSelected);
  const triedToStart = useSelector(state => state.quiz.triedToStart);
  const loading = useSelector(state => state.quiz.quiz.loading);

  const [timeLeft, setTimeLeft] = useState(encodedQuestions.length * 10);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const progress = (((encodedQuestions.length * 10) - timeLeft) / (encodedQuestions.length * 10)) * 100;

  const progressOffset = circumference - (progress / 100) * circumference;

  const progressBarStyle = {
    strokeDasharray: circumference,
    strokeDashoffset: progressOffset !== Infinity ? progressOffset : 0,
    strokeWidth: 3,
    stroke: "#565eff",
    fill: "transparent"
  };

  useEffect(() => {
    if (!timeLeft) return;

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
      }
    })
    setQuestions(decodedQuestions);
    setTimeLeft(encodedQuestions.length * 10); // if "encodedQuestions" changed new "timeLeft" would be generated
  }, [encodedQuestions])
  
  const questionIndex = useSelector(state => state.quiz.index);
  const dispatch = useDispatch();
  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)
    setOptions(answers)

    if(question.difficulty === "hard") {
      setDifficultyTextColor("#dc6060");
    }
    if(question.difficulty === "medium") {
      setDifficultyTextColor("#565eff");
    }
    if(question.difficulty === "easy") {
      setDifficultyTextColor("#309b2c");
    }
  }, [question])
  
  const difficultyTextStyle = {
    color: difficultyTextColor
  }

  const handleListItemClick = (event) => {
    if(answerSelected) {
      return;
    }
    if (questionIndex >= 0) {
      dispatch(
        setTriedToStart(false)
      );
    }
    dispatch(
      setAnswerSelected(true)
    )
    setSelectedAnswer(event.target.textContent)

    if (event.target.textContent === answer) {
      dispatch(setScore(score + 1))
      setGoodSentence(goodSentencesList[getRandomInt(goodSentencesList.length)])
    }
    if (event.target.textContent !== answer) {
      setBadSentence(badSentencesList[getRandomInt(badSentencesList.length)])
    }
    if (questionIndex + 1 <= questions.length ) {
      setTimeout(() => {
        dispatch(
          setAnswerSelected(false)
        );
        setSelectedAnswer(null);
        dispatch(setIndex(questionIndex + 1));
        if (event.target.textContent !== answer) {
          setAnimation("shakeX-animation");
        }
        if (event.target.textContent === answer) {
          setAnimation("shakeY-animation");
        }
        setGoodSentence("");
        setBadSentence("");
      }, 2500)
      setAnimation("");
    }
  }
  const getClass = option => {
    if (!answerSelected) {
      return ``;
    }
    if (option === answer) {
      return `correct`;
    }
    if (option === selectedAnswer) {
      return `selected`;
    }
  }

  if (!question && triedToStart && !loading) {
    return (
      <div className="error-message alert alert-danger d-flex align-items-center mt-3 mb-1" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="#842029" className="icon me-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        There are not enough questions with this specification!
      </div>
    );
  }
  if (!question) {
    return;
  }
  if (!timeLeft) {
    return (
      <div className="mt-2">
        Time's up! Your quiz has ended.
      </div>
    )
  }

  return (
    <div className={`questions-section my-3 ${animation}`}>

      <div className="d-flex justify-content-between align-items-center">
        <p className="m-0">Question <span className="main-color">{questionIndex + 1}</span> Of <span className="main-color">{questions.length}</span></p>

        <div style={{position: "relative", width: "50px", height: "50px"}} className="mb-2 d-flex justify-content-center align-items-center">
          <svg viewBox="-5 -5 50 50" style={{transform: "rotate(-90deg)"}}>
            <circle
              r={radius}
              cx="20"
              cy="20"
              style={{ stroke: "#d7dfff", strokeWidth: 3, fill: "transparent" }}
            />
            <circle
              r={radius}
              cx="20"
              cy="20"
              style={progressBarStyle}
            />
          </svg>

          <div style={{position: "absolute"}}>{timeLeft}</div>
        </div>
      </div>
      <h4 className="fs-4 mb-3">{question.question}</h4>
      <ul className="answers p-0">
        {
          options.map((option, i) => (
            <li key={i} onClick={handleListItemClick} className={`${getClass(option)} answer py-1 px-3 d-flex justify-content-center align-items-center`}>
              {option}
            </li>
          ))
        }
      </ul>
      <div>Category: <span className="fw-500 main-color">{question.category}</span></div>
      <div>
        Difficulty: <span style={difficultyTextStyle}>{question.difficulty}</span>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          Score: {score} <span className="main-color">/</span> {questions.length}
        </div>
        <div>
          {questionIndex !== 0 ? `Average Score: ${(Math.round((score / (questionIndex + 1)) * 10000) / 100).toFixed(2)}%` : "0.00%"}
        </div>
      </div>
      <div className={`message py-2 main-color d-flex justify-content-center my-2 ${ goodSentence || badSentence ? "" : "d-none"}`}>
        { goodSentence ? goodSentence : badSentence}
      </div>
      <div className="progress-bar">
        <div style={{width: `${(questionIndex + 1) * 100 / questions.length }%`}} className="active-progress-bar transition2"></div>
      </div>
    </div>
  )
}
