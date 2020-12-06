import React from 'react';
import './App.scss';
import {createApiClient} from './api';
import OrdersComponent from './components/Orders';
import NotDeliverOrdersCounterComponent from './components/NotDeliverOrdersCounter';

export type AppState = {}

export const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {
	// state: AppState = {};

	render() {
		return (
			<main>
				<div className={'headers'}>
					<h1>Orders</h1>
					<NotDeliverOrdersCounterComponent/>
				</div>
				<OrdersComponent/>
			</main>
		)
	}

}

export default App;