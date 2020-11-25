import React from 'react';
import './App.scss';
import {createApiClient, Order} from './api';
import OrderComponent from './Order';

export type AppState = {
	orders?: Order[],
	search: string;
}

export const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		search: ''
	};

	searchDebounce: any = null;

	async componentDidMount() {
		this.setState({
			orders: await api.getOrders()
		});
	}

	onSearch = async (value: string, newPage?: number) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: value
			});
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
}

export default App;
