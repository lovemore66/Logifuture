import React, { Component } from 'react';
import './App.css';
import Table from './components/Table';
import { faker } from '@faker-js/faker';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: new Array(100000).fill(true).map((val, id) => ({
        id: id,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      })),
    };
  }

  addNewPerson = () => {
    const { people } = this.state;
    const newPerson = {
      id: people.length + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
    this.setState({
      people: [...people, newPerson],
    });
  };

  render() {
    const { people } = this.state;

    return (
      <div className="App">
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>
        <Table rows={people} addNewPerson={this.addNewPerson} />
        <p className='users'>Users: {people.length}</p>
      </div>
    );
  }
}

export default App;
