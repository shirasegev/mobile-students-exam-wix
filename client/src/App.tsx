import React from 'react';
import './App.scss';
import {createApiClient} from './api';
import OrdersComponent from './Orders';
import SearchBarComponent from './SearchBar';
import FilterComponent from './Filter';
import SortComponent from './Sort';
import NotDeliverOrdersCounterComponent from './NotDeliverOrdersCounter';

export type AppState = {
	search: string,
	
	fulfillmentFilter: string,
	paymentFilter: string,
	sortBy: string,
}

export const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {
	state: AppState = {
		search: '',

		fulfillmentFilter: '',
		paymentFilter: '',
		sortBy: '',
	};

	render() {
		return (
			<main>
				<div className={'headers'}>
					<h1>Orders</h1>
					<NotDeliverOrdersCounterComponent/>
				</div>
				<SearchBarComponent onSearchChange={this.onSearch}/>
				<div className={'filterAndSort'}>
					<SortComponent onSort={this.onSort}/>
					<FilterComponent onFulfillmentFilter={this.onFulfillmentFilter} onPaymentFilter={this.onPaymentFilter}/>
				</div>
				<OrdersComponent search={this.state.search} fulfillmentFilter={this.state.fulfillmentFilter} paymentFilter={this.state.paymentFilter} sortBy={this.state.sortBy}/>
			</main>
		)
	}

	onSearch = (value: string) => {
		console.log(value);
        this.setState({
            search: value,
        });
	};
	
	onSort = (value: string) => {
		console.log(value);
        this.setState({
            sortBy: value,
        });
    };
	
	onFulfillmentFilter = (value: string) => {
		console.log(value);
        this.setState({
            fulfillmentFilter: value,
        });
    };
	
	onPaymentFilter = (value: string) => {
		console.log(value);
        this.setState({
            paymentFilter: value,
        });
    };


}

export default App;