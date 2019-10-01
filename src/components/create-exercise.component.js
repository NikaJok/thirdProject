import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercises extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  };

  componentDidMount() {
    axios.get('http://localhost:5000/users/').then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
  }
  onChange = ({ target }) => {
    console.log([target.name]);
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
    console.log(this.state);
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  };
  render() {
    const { username, description, duration, date, users } = this.state;
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <select
              name='username'
              ref='userInput'
              required
              className='form-control'
              value={username}
              onChange={this.onChange}
            >
              {users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Description</label>
            <input
              name='description'
              type='text'
              required
              className='form-control'
              value={description}
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Duration (in minutes): </label>
            <input
              name='duration'
              type='text'
              className='form-control'
              value={duration}
              onChange={this.onChange}
            />
          </div>
          <div className='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                name='date'
                selected={date}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
