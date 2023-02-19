import { useSelector } from 'react-redux';

export default function HideSettingBtn({ onClick, text }) {

  const loading = useSelector(state => state.quiz.quiz.loading)

  if(!loading) {
    return (
      <button className="secondary-button mt-2 py-1" onClick={onClick}>{text} Settings</button>
    )
  }
}
