import React from 'react';
import './App.css';
import Table from './components/Table';
import { faker } from '@faker-js/faker';
import logo from './logo.svg'

function App() {
  const people = new Array(100000).fill(true).map((val, id) => ({
    id: id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }));

  return (
    <div className="App">
      <div className='logo'>
        <img src ={logo} alt='Logo'/>
      </div>
      <Table rows={people} />
      <p>Records: {people.length}</p>
    </div>
  );
}

export default App;



