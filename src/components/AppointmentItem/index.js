import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {id, title, date, isStarred} = details
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickToggleStar = () => {
    toggleStar(id)
  }
  return (
    <li className="list-item">
      <div className="top">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickToggleStar}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
