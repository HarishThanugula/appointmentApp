import './index.css'

const AppointmentItem = props => {
  const {appointmentList, onChangeIcon} = props
  const {title, date, id, isActive} = appointmentList

  const getStarIconChange = () => {
    onChangeIcon(id)
  }

  return (
    <li className="item-container">
      <div className="star-container">
        <p className="name">{title}</p>
        <button
          className="starIcon-btn"
          data-testId="star"
          type="button"
          onClick={getStarIconChange}
        >
          {isActive ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png "
              alt="star"
              className="star-image"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png                 "
              alt="star"
              className="star-image"
            />
          )}
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
