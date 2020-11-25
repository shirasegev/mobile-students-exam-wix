import React from 'react';
import './App.scss';
import {createApiClient, Order} from './api';
import OrderComponent from './Order';

export type AppState = {
	orders?: Order[],
	search: string,
	
	page: number,
	totalPages: number,
	selectedFulfillmentOption: string,
	selectedPaymentOption: string,
	sortBy: string,
}

export const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',

		page: 1,
		totalPages: 1,
		selectedFulfillmentOption: '',
		selectedPaymentOption: '',
		sortBy: '',
	};

	searchDebounce: any = null;

	async componentDidMount() {
		this.getOrders();
	}

	onSearch = async (value: string, newPage?: number) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.getOrders(undefined, value);
		}, 300);
	};

	render() {
		const {orders} = this.state;
		return (
			<main>
				<h1>Orders</h1>
				<header>
					<input type="search" placeholder="Search" onChange={(e) => this.onSearch(e.target.value)}/>
				</header>
				<div className={'filterAndSort'}>
					{this.renderSortButtons()}
					{this.renderFilterButtons()}
				</div>
				{orders ? <div className='results'>Showing {orders.length} results</div> : null}
				{orders ? this.renderOrders(orders) : <h2>Loading...</h2>}
				{this.renderNextPrevButtons(orders)}

			</main>
		)
	}

	renderOrders = (orders: Order[]) => {
		return (
			<div className='orders'>
				{orders.map((order) => {
					return <OrderComponent order={order} key={order.id}/>
				})}
			</div>
		)
	};

	getOrders = async (page?: number, search?: string, selectedFulfillmentOption?: string, selectedPaymentOption?: string, sortBy?: string) => {
		var pageNumber = page ?? 1;
		var searchTerm =  search ?? this.state.search;
		var fulfillmentFilter = selectedFulfillmentOption ?? this.state.selectedFulfillmentOption;
		var paymentFilter = selectedPaymentOption ?? this.state.selectedPaymentOption;
		var sortByParam = sortBy ?? this.state.sortBy;
		
		const [orders, totalPages] = await api.getOrders(pageNumber, searchTerm, fulfillmentFilter, paymentFilter, sortByParam);
		this.setState({
			orders: orders,
			page: pageNumber,
			totalPages: totalPages,
			search: searchTerm,
			selectedFulfillmentOption: fulfillmentFilter,
			selectedPaymentOption: paymentFilter,
			sortBy: sortByParam,
		});
	};

	// Part B 1
	renderNextPrevButtons = (orders: Order[] | undefined) => {
		return (
		<div className={'nextPrevButtons'}>
			<button type='button' style={{visibility:(this.state.page > 1 ? 'visible' : 'hidden')}} className='prevPageButton' onClick={() => this.prevPage(1)}>
				Previous Page
			</button>
			{orders && this.state.page < this.state.totalPages ?
			<button type='button' className='nextPageButton' onClick={() => this.nextPage(1)}>
				Next Page
			</button> : null
			}
		</div>
		);
	};
	
	nextPage = async (val: number) => {
		this.getOrders(this.state.page + val);
    };

    prevPage = async (val: number) => {
		this.getOrders(this.state.page - val);
	};

	// Part C
	renderSortButtons = () => {
		return (
			<div className={'sort'}>
				<h4>Sort by: </h4>
				<div className={'sortingButtons'}>
					<button className='sortButton' onClick={() => this.sort('')} disabled={this.state.sortBy === '' ? true : false}>
						None
					</button>
					<button className='sortButton' onClick={() => this.sort('name')} disabled={this.state.sortBy === 'name' ? true : false}>
						Name
					</button>
					<button className='sortButton' onClick={() => this.sort('date')} disabled={this.state.sortBy === 'date' ? true : false}>
						Date
					</button>
				</div>
			</div>
		);
	}
	
	sort = async (sortBy: string) => {
		this.getOrders(undefined, undefined, undefined, undefined, sortBy);
	};

	// Part B 3
	renderFilterButtons = () => {
		return (
			<div className={'filters'}>
				<div className={'filter'}>
					<h4>Fulfillment filter: </h4>
					<div className={'filterPicker'}>{this.showFulfillmentFilterOptions()}</div>
				</div>
				<div className={'filter'}>
					<h4>Payment filter: </h4>
					<div className={'filterPicker'}>{this.showPaymentFilterOptions()}</div>
				</div>
			</div>	
		);
	}

	showFulfillmentFilterOptions = () => {
		return (
			<div className={'selectOption'}>
				<select className={'selectpicker'} onChange={(e) => this.handleFulfillmentOptionChange(e.target.value)}>
					<option value=''>				All orders				</option>
					<option value='fulfilled'>		Delivered orders		</option>
					<option value='not-fulfilled'>	Not delivered orders	</option>
					<option value='canceled'>		Canceled orders			</option>
				</select>
			</div>
		)
	};

	handleFulfillmentOptionChange = (value: string) => {
		this.getOrders(undefined, undefined, value);
	}

	showPaymentFilterOptions = () => {
		return (
			<div className={'selectOption'}>
				<select className={'selectpicker'} onChange={(e) => this.handlePaymentOptionChange(e.target.value)}>
					<option value=''>			All orders			</option>
					<option value='paid'>		Paid orders			</option>
					<option value='not-paid'>	Not paid orders		</option>
					<option value='refunded'>	Refunded orders		</option>
				</select>
			</div>
		)
	};

	handlePaymentOptionChange = (value: string) => {
		this.getOrders(undefined, undefined, undefined, value);
	}
}

export default App;
