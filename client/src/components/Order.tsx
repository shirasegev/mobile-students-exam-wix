import React from 'react';
import {Order, Item} from '../api';
import {api} from '../App';
import ItemComponent from './Item';

export type OrderState = {
	order: Order,
    showOrderDetails: boolean,
};

type Props = {
    order: Order;
};

export class OrderComponent extends React.Component<Props, OrderState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            order: props.order,
            showOrderDetails: false,
        };
    }
  
    render() {
        const {order} = this.state;
        return (
            <div className={'orderCard'}>
                <div className={'generalData'}>
                    <h6>{order.id}</h6>
                    <h4>{order.customer.name}</h4>
                    {this.state.showOrderDetails 
                        ? <h5>Order Placed: {new Date(order.createdDate).toUTCString()}</h5> // Part A2
                        : <h5>Order Placed: {new Date(order.createdDate).toLocaleDateString()}</h5>
                    }
                </div>
                <div className={'fulfillmentData'}>
                    <h4>{order.itemQuantity} Items</h4>
                    <img src={OrderComponent.getAssetByStatus(order.fulfillmentStatus)}
                        alt={order.fulfillmentStatus}/>
                    {this.renderChangeStatusButton()}
                </div>
                <div className={'paymentData'}>
                    <h4>{order.price.formattedTotalPrice}</h4>
                    <img src={OrderComponent.getAssetByStatus(order.billingInfo.status)}
                        alt={order.billingInfo.status}/>
                </div>
                {this.renderOrderDetails()}
            </div>
        );
    }

    // Part A1
	renderChangeStatusButton = () => {
        const {order} = this.state;
		return (
            order.fulfillmentStatus !== 'canceled' &&
			<a onClick = {() => {this.changeStatus()}}>
                Mark as {order.fulfillmentStatus === 'fulfilled' ? 'Not Delivered' : 'Delivered'}
            </a>
        );
	}

	changeStatus = async () => {
        const {order} = this.state;
        order.fulfillmentStatus = order.fulfillmentStatus === 'fulfilled' ? 'not-fulfilled' : 'fulfilled'
        await api.patchOrder(order);
        this.setState({
             order: order
        });
    };
    
    // Part A2
	renderOrderDetails = () => {
        const {order} = this.state;
        return (
            <div> 
                <a onClick = {() => {this.orderDetails()}}>
                    {this.state.showOrderDetails ? 'Close' : 'Order details'}
                </a>
                {this.state.showOrderDetails && order.items ? this.showOrderDetails(order.items) : null}
            </div>
        );
    };

    orderDetails = () => {
        this.setState({
            showOrderDetails: !this.state.showOrderDetails
        });
    };
    
    showOrderDetails = (items: Item[]) => {
        const {order} = this.state;
		return (
			<div className='items'>
                <h4>The total amount of items in this order is {order.itemQuantity}</h4>
				{items.map((item) => {
                    return <ItemComponent itemId={item.id} quantity={item.quantity} key={item.id}/>
				})}
			</div>
		)
    }
    
	static getAssetByStatus(status: string) {
		switch (status) {
			case 'fulfilled':
				return require('../assets/package.png');
			case 'not-fulfilled':
				return require('../assets/pending.png');
			case 'canceled':
				return require('../assets/cancel.png');
			case 'paid':
				return require('../assets/paid.png');
			case 'not-paid':
				return require('../assets/not-paid.png');
			case 'refunded':
				return require('../assets/refunded.png');
		}
	}
}

export default OrderComponent;