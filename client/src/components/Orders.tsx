import React from 'react';
import {Order} from '../api';
import {api} from '../App';
import OrderComponent from './Order';
import PaginationComponent from './Pagination';

export type OrdersState = {
	orders?: Order[],
	search: string,
	
	page: number,
	totalPages: number,
	fulfillmentFilter: string,
	paymentFilter: string,
	sortBy: string,
};

type Props = {
	search: string,
	fulfillmentFilter: string,
	paymentFilter: string,
	sortBy: string,
};

export class OrdersComponent extends React.Component<Props, OrdersState> {

    constructor(props: Props) {
        super(props);
        this.state = {
			search: props.search,
			page: 1,
			totalPages: 1,
			fulfillmentFilter: props.fulfillmentFilter,
			paymentFilter: props.paymentFilter,
			sortBy: props.sortBy,
		};
	}	
	
	async componentDidMount() {
		this.getOrders();
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props.search !== prevProps.search) {
		  this.getOrders(undefined, this.props.search);
		}
		if (this.props.fulfillmentFilter !== prevProps.fulfillmentFilter) {
		  this.getOrders(undefined, undefined, this.props.fulfillmentFilter);
		}
		if (this.props.paymentFilter !== prevProps.paymentFilter) {
		  this.getOrders(undefined, undefined, undefined, this.props.paymentFilter);
		}
		if (this.props.sortBy !== prevProps.sortBy) {
		  this.getOrders(undefined, undefined, undefined, undefined, this.props.sortBy);
		}
	  }
    
    render(){
		const {orders} = this.state;
		return (
			<div>
				{orders? 
				<>
					<div className='results'>Showing {orders.length} results</div>
					<div className='orders'>
						{orders ? orders.map((order) => {
							return <OrderComponent order={order} key={order.id}/>
						}): null}
					</div>
					<PaginationComponent page={this.state.page} totalPages={this.state.totalPages} onChange={this.setPage}/>
				</>
				:
				<h2>Loading...</h2>
				}
			</div>
		)
    };
    
    getOrders = async (page?: number, search?: string, selectedFulfillmentOption?: string, selectedPaymentOption?: string, sortBy?: string) => {
		var pageNumber = page ?? 1;
		var searchTerm =  search ?? this.state.search;
		var fulfillmentFilter = selectedFulfillmentOption ?? this.state.fulfillmentFilter;
		var paymentFilter = selectedPaymentOption ?? this.state.paymentFilter;
		var sortByParam = sortBy ?? this.state.sortBy;
		
		const [orders, totalPages] = await api.getOrders(pageNumber, searchTerm, fulfillmentFilter, paymentFilter, sortByParam);
		this.setState({
			orders: orders,
			page: pageNumber,
			totalPages: totalPages,
			search: searchTerm,
			fulfillmentFilter: fulfillmentFilter,
			paymentFilter: paymentFilter,
			sortBy: sortByParam,
		});
	};

	setPage = (value: number) => {
		this.getOrders(value);
	};
}

export default OrdersComponent;