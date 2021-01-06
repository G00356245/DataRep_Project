import React from 'react';
import '../App.css';
import axios from 'axios';  //using axios, http requests to fetch or save data.

//Edit class
export class Edit extends React.Component {
    //added constructor.
    constructor() {
        super();   //this line of code is needed to use the form.

        //binding the methods so that it can execute when called.
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModels = this.onChangeModels.bind(this);

        //stating the type of data that the users will input.
        this.state = {
            Brand: '',
            Models: ''
        }
    }
    //using life cycyle hook, this will be called once the component is active in the view.
    componentDidMount() {
        console.log(this.props.match.params.id);

        axios.get('http://localhost:4000/api/cars/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    _id: response.data._id,
                    Brand: response.data.brand,
                    Models: response.data.models
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //method for calling the onchangeModels.
    onChangeModels(e) {
        this.setState({
            Models: e.target.value
        });
    }

    //method for calling the onchangeBrand. 
    onChangeBrand(e) {
        this.setState({
            Brand: e.target.value
        });
    }

    //method for onsubmit
    onSubmit(e) {
        e.preventDefault(); //stop the button from  being called multiple times.
        alert("Car: " + this.state.Brand + " " + this.state.Models);  //this line will alert whenever the submit button is clicked.

        //making an object with the three values that is recieved.
        const newCar = {
            brand: this.state.Brand,
            models: this.state.Models,
            _id: this.state._id
        }

        //using axios put to call updated data for Cars.
        axios.put('http://localhost:4000/api/Cars/' + this.state._id, newCar)
            .then(res => {
                console.log(res.data)
            })  //respond to console.
            .catch();

        // axios.post('http://localhost:4000/api/Cars', newCar) //post request, send data to the server.
        //     .then((res) => {
        //         console.log(res);
        //     })  //respond to console.

        //     .catch((error) => {
        //         console.log(error);
        //     }); //if .then does not work then error will be passed to console.
    }

    render() {
        //adding forms for Car Brand. Models and poster to the edit page to be able to input data.
        //onSubmit allows for the submission of input data in the form.
        //added a submit button at the end so that the users is able to submit data by clicking the button.
        return (
            <div className='App'>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Add Cars Brand: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Brand}
                            onChange={this.onChangeBrand}></input>
                    </div>

                    <div className='form-group'>
                        <label>Add Car Models: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Models}
                            onChange={this.onChangeModels}></input>
                    </div>

                    <div className='form-group'>
                        <input type='submit'
                            value='Update Data'
                            className='btn btn-primary'></input>
                    </div>
                </form>
            </div>
        );
    }
} 