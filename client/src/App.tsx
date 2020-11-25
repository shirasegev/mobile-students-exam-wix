import React from 'react';
import './App.scss';
import {createApiClient, Order} from './api';
import OrderComponent from './Order';

export type AppState = {
	orders?: Order[],
	search: string,
	
	page: number,
	totalPages: number,
}

export const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: '',

		page: 1,
		totalPages: 1,
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

	getOrders = async (page?: number, search?: string,) => {
		var pageNumber = page ?? 1;
		var searchTerm =  search ?? this.state.search;
		
		const [orders, totalPages] = await api.getOrders(pageNumber, searchTerm);
		this.setState({
			orders: orders,
			page: pageNumber,
			totalPages: totalPages,
			search: searchTerm,
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
}

export default App;
