import React from 'react';
import {Order} from '../api';
import {api} from '../App';
import OrderComponent from './Order';
import PaginationComponent from './Pagination';

export type State = {
	orders?: Order[],
	page: number,
	totalPages: number,
};

type Props = {
	search: string,
	fulfillmentFilter: string,
	paymentFilter: string,
	sortBy: string,
};

export class OrdersComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
			page: 1,
			totalPages: 1,
		};
	}	
	
	async componentDidMount() {
		this.getOrders();
	}
	
	componentDidUpdate(prevProps: Props) {
		if (this.props.search !== prevProps.search ||
			this.props.fulfillmentFilter !== prevProps.fulfillmentFilter ||
			this.props.paymentFilter !== prevProps.paymentFilter ||
			this.props.sortBy !== prevProps.sortBy)
		{
		  	this.getOrders();
		}
	}
    
    render(){
		const {orders} = this.state;
		console.log('rendering');
		return (
			<div>
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
    
    getOrders = async (page?: number) => {
		var pageNumber = page ?? 1;

		const [orders, totalPages] = await api.getOrders(pageNumber, this.props.search, this.props.fulfillmentFilter, this.props.paymentFilter, this.props.sortBy);
		this.setState({
			orders: orders,
			// page: pageNumber,
			totalPages: totalPages,
		});
	};

	setPage = (pageNumber: number) => {
		this.setState({page: pageNumber,})
		this.getOrders(pageNumber);
	};
}

export default OrdersComponent;