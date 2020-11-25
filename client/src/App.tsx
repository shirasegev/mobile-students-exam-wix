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
	counter: number,
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
		counter: 0,
	};

	searchDebounce: any = null;

	async componentDidMount() {
		this.getOrders();
		
		// Part D 
		setInterval(() => this.notDeliverOrders(), 3000);
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
				<div className={'headers'}>
					<h1>Orders</h1>
					<div className={'counterRepo'}>
						<h4 className={'counterHeader'}>Undelivered orders: </h4>
						<h1>{this.state.counter}</h1>
					</div>
				</div>
				<header>
					<input type="search" placeholder="Search" onChange={(e) => this.onSearch(e.target.value)}/>
				</header>
				<div className={'filterAndSort'}>
					{this.renderSortButtons()}
					{this.renderFilterButtons()}
				</div>
				{orders ? <div className='results'>Showing {orders.length} results</div> : null}
				{orders ? this.renderOrders(orders) : <h2>Loading...</h2>}
				{this.renderPagination(orders)}

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

	// Part C & B1
	renderPagination = (orders: Order[] | undefined) => {
		var page = this.state.page;
		var lastPage = this.state.totalPages;
		return (
		<div>
			<div className={'pagination'}>
				<div className={'paginationCard'}>
					{orders ? <>
						{lastPage > 7 ? <>
							<button type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(1)}> 1 </button>

							{page > 3 ? <>
								<button type='button' className='prevNext' onClick={() => this.jumptoPage(page -1)}> {'<<'} </button> 
								{page + 2 < lastPage ? <button type='button' className='page' onClick={() => this.jumptoPage(page -1)}> {page - 1} </button> : null}
							</> : <>
								<button type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(2)}> 2 </button>
								<button type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(3)}> 3 </button>
								<button type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(4)}> 4 </button>
								<button type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumptoPage(5)}> 5 </button>
							</>
							}

							{page > 3 && (page + 2 < lastPage) ? 
								<button type='button' className='curr'> {page} </button> : null
							}
							
							{page + 2 < lastPage ? <>
								{page > 3 ? <button type='button' className='page' onClick={() => this.jumptoPage(page + 1)}> {page + 1} </button> : null}
								<button type='button' className='prevNext' onClick={() => this.jumptoPage(page + 1)}> {'>>'} </button>
							</> : <>
								<button type='button' className={page === lastPage - 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 4)}> {lastPage - 4} </button>
								<button type='button' className={page === lastPage - 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 3)}> {lastPage - 3} </button>
								<button type='button' className={page === lastPage - 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 2)}> {lastPage - 2} </button>
								<button type='button' className={page === lastPage - 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage - 1)}> {lastPage - 1} </button>
							</>
							}
							
							<button type='button' className={page === lastPage ? 'curr' : 'page'} onClick={() => this.jumptoPage(lastPage)}> {lastPage} </button>
						</> : <>
							{lastPage > 1 ? <button type='button' className={page === 1 ? 'curr' : 'page'} onClick={() => this.jumptoPage(1)}> 1 </button> : null}
							{lastPage > 2 ? <button type='button' className={page === 2 ? 'curr' : 'page'} onClick={() => this.jumptoPage(2)}> 2 </button> : null}
							{lastPage > 3 ? <button type='button' className={page === 3 ? 'curr' : 'page'} onClick={() => this.jumptoPage(3)}> 3 </button> : null}
							{lastPage > 4 ? <button type='button' className={page === 4 ? 'curr' : 'page'} onClick={() => this.jumptoPage(4)}> 4 </button> : null}
							{lastPage > 5 ? <button type='button' className={page === 5 ? 'curr' : 'page'} onClick={() => this.jumptoPage(5)}> 5 </button> : null}
							{lastPage > 6 ? <button type='button' className={page === 6 ? 'curr' : 'page'} onClick={() => this.jumptoPage(6)}> 6 </button> : null}
							{lastPage > 7 ? <button type='button' className={page === 7 ? 'curr' : 'page'} onClick={() => this.jumptoPage(7)}> 7 </button> : null}
						</>}
					</> : null}
				</div>
			</div>
		</div>
		);
	};

	jumptoPage = async (val: number) => {
		this.getOrders(val);
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

	// Part D
	notDeliverOrders = async () => {
		let counter : number = await api.getCounter();
		this.setState({
			counter: counter,
		});
	}
}

export default App;
