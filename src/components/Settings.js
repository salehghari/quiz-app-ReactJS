import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { changeLoading, changeCategory, changeDifficulty, changeType, changeAmount } from '../features/quiz/quizSlice';

export default function Settings({ isShown }) {

	const [categories, setCategories] = useState(null);

  const loading = useSelector(state => state.quiz.quiz.loading)
  const questionCategory = useSelector(state => state.quiz.quiz.questionCategory)
  const questionDifficulty = useSelector(state => state.quiz.quiz.questionDifficulty)
  const questionType = useSelector(state => state.quiz.quiz.questionType)
  const questionAmount = useSelector(state => state.quiz.quiz.amountOfQuestions)

  const dispatch = useDispatch()

	useEffect(() => {
	  const apiUrl = `https://opentdb.com/api_category.php`;

    const handleLoadingChange = value => {
      dispatch(changeLoading(value));
    }

    handleLoadingChange(true);
	
	  fetch(apiUrl)
	    .then((res) => res.json())
	    .then((response) => {
        handleLoadingChange(false);
	      setCategories(response.trivia_categories);
	    });
	}, [setCategories, dispatch]);

  const handleCategoryChange = event => {
    dispatch(changeCategory(event.target.value));
  }
  const handleDifficultyChange = event => {
    dispatch(changeDifficulty(event.target.value));
  }
  const handleTypeChange = event => {
    dispatch(changeType(event.target.value));
  }
  const handleAmountChange = event => {
    dispatch(changeAmount(event.target.value));
  }

  useEffect(() => {
    if (questionAmount < 1) {
      dispatch(changeAmount(""));
    }
    if(questionAmount > 50) {
      dispatch(changeAmount(""));
    }
  }, [questionAmount, dispatch]);
    
  if (!loading) {
    return (
      <div className={isShown ? "opacity-1 transition4" : "hiddenSettings transition2"}>
        <div>
          <h4 className="settings-texts">Select Category:</h4>
          <div className="d-flex justify-content-center">
            <select className="select" value={questionCategory} onChange={handleCategoryChange}>
              <option value="" key="All" >All</option>
              {categories &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div>
          <h4 className="settings-texts">Select Difficulty:</h4>
          <div className="d-flex justify-content-center">
            <select className="select" value={questionDifficulty} onChange={handleDifficultyChange}>
              <option value="" key="difficulty-0">All</option>
              <option value="easy" key="difficulty-1">Easy</option>
              <option value="medium" key="difficulty-2">Medium</option>
              <option value="hard" key="difficulty-3">Hard</option>
            </select>
          </div>
        </div>
        <div>
          <h4 className="settings-texts">Select Question Type:</h4>
          <div className="d-flex justify-content-center">
            <select className="select" value={questionType} onChange={handleTypeChange}>
              <option value="" key="type-0">All</option>
              <option value="multiple" key="type-1">Multiple Choice</option>
              <option value="boolean" key="type-2">True/False</option>
            </select>
          </div>
        </div>
        <div>
          <h4 className="settings-texts">Amount of Questions:</h4>
          <div className="d-flex justify-content-center">
            <input type="number" className="input" value={questionAmount} onChange={handleAmountChange} />
          </div>
        </div>
      </div>
    );
  }
  if(loading) {
    return (
      <p>
        LOADING...
      </p>
    );
  }
}