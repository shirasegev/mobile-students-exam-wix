import React from 'react';
import {Order} from '../api';
import {api} from '../App';
import OrderComponent from './Order';
import PaginationComponent from './Pagination';
import SearchBarComponent from './SearchBar';
import FilterComponent from './Filter';
import SortComponent from './Sort';

export type OrdersState = {
	orders?: Order[],
	page: number,
	totalPages: number,
	search: string,
	fulfillmentFilter: string,
	paymentFilter: string,
	sortBy: string,
};

export class OrdersComponent extends React.Component<{}, OrdersState> {

    state: OrdersState = {
		page: 1,
		totalPages: 1,
		search: '',
		fulfillmentFilter: '',
		paymentFilter: '',
		sortBy: '',
	};
	
	async componentDidMount() {
		this.getOrders();
	}
    
    render(){
		const {orders} = this.state;
		return (
			<div>
				<SearchBarComponent onSearchChange={this.onSearchChange}/>
				<div className={'filterAndSort'}>
					<SortComponent onSortChange={this.onSortChange}/>
            		<div className={'filters'}>
						<div className={'filter'}>
							<h4>Fulfillment filter: </h4>
							<FilterComponent values={this.fulfillmentValues} onFilterChange={this.onFulfillmentFilterChange}/>
						</div>
						<div className={'filter'}>
							<h4>Payment filter: </h4>
							<FilterComponent values={this.paymentValues} onFilterChange={this.onPaymentFilterChange}/>
						</div>
					</div>
            	</div>	
				{orders? 
				<>
					<div className='results'>Showing {orders.length} results</div>
					<div className='orders'>
						{orders.map((order) => {
							return <OrderComponent order={order} key={order.id}/>
						})}
					</div>
					<PaginationComponent page={this.state.page} totalPages={this.state.totalPages} onChange={this.setPage}/>
				</>
				:
				<h2>Loading...</h2>
				}
			</div>
		)
    };

	getOrders = async (page?: number, search?: string, fulfillmentFilter?: string, paymentFilter?: string, sortBy?: string) => {
		var pageNumber = page ?? 1;
		var searchTerm =  search ?? this.state.search;
		var selectedFulfillmentFilter = fulfillmentFilter ?? this.state.fulfillmentFilter;
		var selectedPaymentFilter = paymentFilter ?? this.state.paymentFilter;
		var sortByParam = sortBy ?? this.state.sortBy;
		
		const [orders, totalPages] = await api.getOrders(pageNumber, searchTerm, selectedFulfillmentFilter, selectedPaymentFilter, sortByParam);
		this.setState({
			orders: orders,
			page: pageNumber,
			totalPages: totalPages,
			search: searchTerm,
			fulfillmentFilter: selectedFulfillmentFilter,
			paymentFilter: selectedPaymentFilter,
			sortBy: sortByParam,
		});
	};

	setPage = (pageNumber: number) => {
		this.getOrders(pageNumber);
	};
	
	onSearchChange = (search: string) => {
		this.getOrders(undefined, search);
	};

	onFulfillmentFilterChange = (fulfillmentFilter: string) => {
		this.getOrders(undefined, undefined, fulfillmentFilter);
    };
	
	onPaymentFilterChange = (paymentFilter: string) => {
		this.getOrders(undefined, undefined, undefined, paymentFilter);
    };
	
	onSortChange = (sortBy: string) => {
		this.getOrders(undefined, undefined, undefined, undefined, sortBy);
    };

	fulfillmentValues: string[][] = ([
		['', 'All orders'],
		['fulfilled', 'Delivered orders'],
		['not-fulfilled', 'Not delivered orders'],
		['canceled', 'Canceled orders'],
	]);
	
	paymentValues: string[][] = ([
		['', 'All orders'],
		['paid', 'Paid orders'],
		['not-paid', 'Not paid orders'],
		['refunded', 'Refunded orders'],
	]);
}

export default OrdersComponent;