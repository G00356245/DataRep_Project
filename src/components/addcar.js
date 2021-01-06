import React from 'react';
import '../App.css';
import axios from 'axios';//using axios, http requests to fetch or save data.

export class AddCar extends React.Component {

    //added constructor.
    constructor() {
        super();    //this line of code is needed to use the form.

        //binding the methods so that it can execute when called.
        this.onChangeCarBrand = this.onChangeCarBrand.bind(this);
        this.onChangeCarModels = this.onChangeCarModels.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //stating the type of data that the users will input.
        this.state = {
            Brand: '',
            Models: '',
        }
    }
    //method for calling the car brand 
    onChangeCarBrand(e) {
        this.setState({
            Brand: e.target.value
        });
    }
    //method for calling the car model
    onChangeCarModels(e) {
        this.setState({
            Models: e.target.value
        })
    }
    //method for onsubmit 
    onSubmit(e) {
        e.preventDefault(); //stop the button from being called multiple times
        alert("Car: " + this.state.Brand + " "
            + this.state.Models);   //this line will alert whenever the submit button is clicked.

        //making an object with the two values that is recieved.
        const newCar = {
            brand: this.state.Brand,
            models: this.state.Models
        }

        axios.post('http://localhost:4000/api/cars', newCar)    //post request, send data to the server.
            .then((res) => {
                console.log(res);
            })  //respond to console.
            .catch((err) => {
                console.log(err);
            }); //if .then does not work then error will be passed to console.
    }

    render() {
        //adding forms for car brand and model to the create page to be able to input data.
        //onSubmit allows for the submission of input data in the form.
        //added a submit button at the end so that the users is able to submit data by clicking the button.
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Car Brand: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Brand}
                            onChange={this.onChangeCarBrand}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Car Model: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Models}
                            onChange={this.onChangeCarModels}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Car" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
