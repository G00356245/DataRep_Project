import React from 'react';
import { Cars } from './cars';
import axios from 'axios';  //imported axios 

export class CarCollection extends React.Component {

    //this constructor will bind to the reloaddata method.
    constructor() {
        super();

        this.ReloadData = this.ReloadData.bind(this);
    }

    //method to call list of cars.
    state = {
        cars: []
    };

    //using a life cyclehook, this method will get called everytime the component is mounted.
    componentDidMount() {
        axios.get('http://localhost:4000/api/cars') //calling the list of cars from server localhost:4000.
            .then(response => {
                this.setState({ cars: response.data }); //this will use the fufill state.
            })
            .catch(function (error) {
                console.log(error);
            })   //if the .then function doesn't work then this line will run.
    }

    ReloadData() {
        axios.get('http://localhost:4000/api/cars')
            .then(response => {
                this.setState({ cars: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <h1>This is my Car collection</h1>
                {/* Cars will display under the h1 tag.
                Passing down the reloaddata method component */}
                <Cars cars={this.state.cars} ReloadData={this.ReloadData}></Cars>
            </div>
        );
    }
}
