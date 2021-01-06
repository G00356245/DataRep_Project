import React from 'react';
import Card from 'react-bootstrap/Card';    //imported card from bootstrap
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';    //using the react bootstrap button 
import axios from 'axios';  //importing axios to use our http client

export class CarsItem extends React.Component {

    //this constructor will bind to the delete button that will call the this.delete function.
    constructor() {
        super();

        this.DeleteCar = this.DeleteCar.bind(this);
    }

    //delete method to log the car to the console saying delete
    //using axios to call the delete method through localhost:400 link
    //prevent default will prevent the data being delete everytime the page is reloaded

    DeleteCar(e) {
        e.preventDefault();
        console.log("Delete: " + this.props.car._id);

        axios.delete("http://localhost:4000/api/cars/" + this.props.car._id)
            .then(() => {
                this.props.ReloadData();
            })
            .catch();
    }

    render() {
        return (
            //added card from bootstrap, to have a card layout look on the website.
            //ract bootstrap button is added to perform a delete function.
            //Edit link is created using react-router-dom.
            <div>
                <Card>
                    <Card.Header><h3>{this.props.car.brand}</h3></Card.Header>
                    <Card.Body>
                        <footer>
                            <h6>{this.props.car.models}</h6>
                        </footer>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.car._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteCar}>Delete</Button>
                </Card>
            </div>
        );
    }
}
