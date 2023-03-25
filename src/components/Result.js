import { useSelector } from 'react-redux'

export default function Result() {

  const encodedQuestions = useSelector(state => state.quiz.questions);
  const score = useSelector(state => state.quiz.score);
  const questionIndex = useSelector(state => state.quiz.index);
  const timeLeft = useSelector(state => state.quiz.timeLeft);

  const addDecimal = (number) => {
    var str = number.toString();
    var length = str.length;

    if(length <= 2) {
      return "0." + str;
    } else {
      var decimalIndex = length - 2;
      var newStr = str.slice(0, decimalIndex) + "." + str.slice(decimalIndex)
      
      return newStr;
    }
  };

  return (
    <div className="questions-section mt-3">
      <div className="d-flex justify-content-center">
        <h2>Result</h2>
      </div>
      <div className="fs-5">
        Score<span className="main-color">:</span> {score} <span className="main-color">/</span> {encodedQuestions.length}
      </div>
      <div className="fs-5">
        Average Score<span className="main-color">:</span> {(Math.round((score / (questionIndex)) * 10000) / 100).toFixed(2)}<span className="main-color">%</span>
      </div>
      <div className="fs-5">
        time left<span className="main-color">:</span> {addDecimal(timeLeft + 1)}<span className="main-color">s</span>
      </div>
    </div>
  )
}
