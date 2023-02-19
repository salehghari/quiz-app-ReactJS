import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnswerSelected, setScore, setIndex, setTriedToStart } from '../features/quiz/quizSlice'


const decodeHTML = function (html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [animation, setAnimation] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const score = useSelector(state => state.quiz.score);
  const questionAmount = useSelector(state => state.quiz.quiz.amountOfQuestions);
  const encodedQuestions = useSelector(state => state.quiz.questions);
  const answerSelected = useSelector(state => state.quiz.answerSelected);
  const triedToStart = useSelector(state => state.quiz.triedToStart);
  const loading = useSelector(state => state.quiz.quiz.loading);

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
      }
    })
    setQuestions(decodedQuestions)
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
  }, [question])

  const handleListItemClick = (event) => {
    if(answerSelected) {
      return;
    }
    if (questionIndex + 1 === questionAmount) {
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
  
  return (
    <div className={`questions-section my-3 ${animation}`}>
      <p>Question <span className="number-of-questions">{questionIndex + 1}</span> Of <span className="number-of-questions">{questions.length}</span></p>
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
      <div className="d-flex justify-content-between">
        <div>
          Score: {score} / {questions.length}
        </div>
        <div>
          {questionIndex !== 0 ? `Average Score: ${(Math.round((score / questionIndex) * 10000) / 100).toFixed(2)}%` : "0.00%"}
        </div>
      </div>
      <div className="progress-bar">
        <div style={{width: `${(questionIndex + 1) * 100 / questions.length }%`}} className="active-progress-bar transition2"></div>
      </div>
    </div>
  )
}
