import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isStarFiltered: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  filterStarredAppointments = () => {
    this.setState(prevState => ({
      isStarFiltered: !prevState.isStarFiltered,
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  getFilteredAppointments = () => {
    const {appointmentsList, isStarFiltered} = this.state
    if (isStarFiltered) {
      return appointmentsList.filter(each => each.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {title, date, isStarFiltered} = this.state
    const starButtonClassName = isStarFiltered ? 'star filled' : 'star empty'
    const filteredList = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="add-appointment-container">
            <div className="add-appointment-text-container">
              <h1>Add Appointment</h1>
              <form className="form-container">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  className="input"
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  id="title"
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  className="input"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                  onChange={this.onChangeDate}
                  id="date"
                />
                <button
                  type="submit"
                  className="button"
                  onClick={this.onAddAppointment}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="add-appointment-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-image"
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="appointments">
            <div className="appointments-bar">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                onClick={this.filterStarredAppointments}
                className={starButtonClassName}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {filteredList.map(each => (
                <AppointmentItem
                  details={each}
                  key={each.id}
                  id={each.id}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
