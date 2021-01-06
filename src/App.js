import './App.css';
import React from 'react';
import { Content } from './components/content';// importing Component from the Component.js file in componenet 
import { CarCollection } from './components/carcollection';//importing car collection from component
import { AddCar } from './components/addcar';//importing add car from component
import 'bootstrap/dist/css/bootstrap.min.css';// importing Bootstrap
import { Navbar, Nav } from 'react-bootstrap'// importing bootstrap navbar
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';//importing a routing
import { Edit } from './components/edit';//importing edit from component


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* Navbar Added Here, display a navabr at the top of the page, allows users to go to different components through headings. */}
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>StudentProject</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/carcollection">CarCollection</Nav.Link>
              <Nav.Link href="/addcar">AddCar</Nav.Link>
            </Nav>
          </Navbar>

          <br />
          {/* Added a Switch, this allows the user to go from each component of the website without having to go to a different page. */}

          <Switch>
            <Route path='/' component={Content} exact></Route>
            <Route path='/carcollection' component={CarCollection}></Route>
            <Route path='/addcar' component={AddCar} ></Route>
            <Route path='/edit/:id' component={Edit} ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
