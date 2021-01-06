import React from 'react';
import { CarsItem } from './carsitem'; //imported the carsitems from component

export class Cars extends React.Component {

    render() {
        //Returning movieitem and reload data.
        return this.props.cars.map((car) => {
            return <CarsItem car={car} ReloadData={this.props.ReloadData}></CarsItem>
        })
    }
}
