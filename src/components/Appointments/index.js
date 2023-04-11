import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    appointmentList: initialAppointmentList,
    title: '',
    date: '',
    isActive: false,
  }

  getFilterList = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  onGetAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isActive: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachOne => {
        if (eachOne.id === id) {
          return {...eachOne, isActive: !eachOne.isActive}
        }
        return eachOne
      }),
    }))
  }

  filterAppointmentList = () => {
    const {appointmentList, isActive} = this.state
    if (isActive) {
      return appointmentList.filter(eachItem => eachItem.isActive === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isActive} = this.state
    const buttonClassName = isActive ? 'sorted' : 'not-sorted'
    const filterAppointmentList = this.filterAppointmentList()

    return (
      <div className="bg-container">
        <div className="container">
          <div className="top-container">
            <form className="input-container" onSubmit={this.onGetAppointment}>
              <h2 className="main-heading">Add Appointments</h2>
              <label className="label">
                TITLE
                <br />
                <input
                  type="text"
                  placeholder="Title"
                  className="input-element"
                  onChange={this.getTitle}
                  value={title}
                />
              </label>
              <label className="label">
                DATE
                <br />
                <input
                  type="date"
                  placeholder="Date"
                  className="input-element"
                  onChange={this.getDate}
                  value={date}
                />
              </label>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="divide-line" />
          <div className="items-container">
            <div className="head-container">
              <h1 className="appointments">Appointments</h1>
              <button
                className={buttonClassName}
                type="button"
                onClick={this.getFilterList}
              >
                Starred
              </button>
            </div>
            <div className="cards-container">
              <ul className="list-container">
                {filterAppointmentList.map(eachItem => (
                  <AppointmentItem
                    appointmentList={eachItem}
                    key={eachItem.id}
                    onChangeIcon={this.onChangeIcon}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
