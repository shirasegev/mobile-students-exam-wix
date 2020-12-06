import React from 'react';
import './App.scss';
import {createApiClient} from './api';
import OrdersComponent from './components/Orders';
import SearchBarComponent from './components/SearchBar';
import FilterComponent from './components/Filter';
import SortComponent from './components/Sort';
import NotDeliverOrdersCounterComponent from './components/NotDeliverOrdersCounter';

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
				<SearchBarComponent onSearchChange={this.onSearchChange}/>
				<div className={'filterAndSort'}>
					<SortComponent onSort={this.onSortChange}/>
					<FilterComponent onFulfillmentFilter={this.onFulfillmentFilterChange} onPaymentFilter={this.onPaymentFilterChange}/>
				</div>
				<OrdersComponent search={this.state.search} fulfillmentFilter={this.state.fulfillmentFilter} paymentFilter={this.state.paymentFilter} sortBy={this.state.sortBy}/>
			</main>
		)
	}

	onSearchChange = (search: string) => {
        this.setState({
            search: search,
        });
	};
	
	onSortChange = (sortBy: string) => {
        this.setState({
            sortBy: sortBy,
        });
    };
	
	onFulfillmentFilterChange = (fulfillmentFilter: string) => {
        this.setState({
            fulfillmentFilter: fulfillmentFilter,
        });
    };
	
	onPaymentFilterChange = (paymentFilter: string) => {
        this.setState({
            paymentFilter: paymentFilter,
        });
    };

}

export default App;