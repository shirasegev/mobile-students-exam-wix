import React from 'react';
import {api} from './App';

export type NotDeliverOrdersCounterState = {
    counter: number,
};

export class NotDeliverOrdersCounterComponent extends React.Component<{}, NotDeliverOrdersCounterState> {


    state : NotDeliverOrdersCounterState = {
        counter: 0,
    };

	async componentDidMount() {
		// Part D 
		setInterval(() => this.notDeliverOrders(), 3000);
	}

    render() {
        return (
            <div className={'counterRepo'}>
                <h4 className={'counterHeader'}>Undelivered orders: </h4>
                <h1>{this.state.counter}</h1>
            </div>
        );
    }
    
	notDeliverOrders = async () => {
		let counter : number = await api.getCounter();
		this.setState({
			counter: counter,
		});
	}
}

export default NotDeliverOrdersCounterComponent;