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
        return (
            <div className={'orderCard'}>
                <div className={'generalData'}>
                    <h6>{this.state.order.id}</h6>
                    <h4>{this.state.order.customer.name}</h4>
                    {this.state.showOrderDetails 
                        ? <h5>Order Placed: {new Date(this.state.order.createdDate).toUTCString()}</h5> // Part A2
                        : <h5>Order Placed: {new Date(this.state.order.createdDate).toLocaleDateString()}</h5>
                    }
                </div>
                <div className={'fulfillmentData'}>
                    <h4>{this.state.order.itemQuantity} Items</h4>
                    <img src={OrderComponent.getAssetByStatus(this.state.order.fulfillmentStatus)}
                        alt={this.state.order.fulfillmentStatus}/>
                    {this.renderChangeStatusButton()}
                </div>
                <div className={'paymentData'}>
                    <h4>{this.state.order.price.formattedTotalPrice}</h4>
                    <img src={OrderComponent.getAssetByStatus(this.state.order.billingInfo.status)}
                        alt={this.state.order.billingInfo.status}/>
                </div>
                {this.renderOrderDetails()}
            </div>
        );
    }

    // Part A1
	renderChangeStatusButton = () => {
		return (
            this.state.order.fulfillmentStatus !== 'canceled' &&
			<a onClick = {() => {this.changeStatus()}}>
                Mark as {this.state.order.fulfillmentStatus === 'fulfilled' ? 'Not Delivered' : 'Delivered'}
            </a>
        );
	}

	changeStatus = async () => {
        this.state.order.fulfillmentStatus = this.state.order.fulfillmentStatus === 'fulfilled' ? 'not-fulfilled' : 'fulfilled'
        await api.putOrder(this.state.order);
        this.setState({
             order: this.state.order
        });
    };
    
    // Part A2
	renderOrderDetails = () => {
        return (
            <div> 
                <a onClick = {() => {this.orderDetails()}}>
                    {this.state.showOrderDetails ? 'Close' : 'Order details'}
                </a>
                {this.state.showOrderDetails && this.state.order.items ? this.showOrderDetails(this.state.order.items) : null}
            </div>
        );
    };

    orderDetails = () => {
        this.setState({
            showOrderDetails: !this.state.showOrderDetails
        });
    };
    
    showOrderDetails = (items: Item[]) => {
		return (
			<div className='items'>
                <h4>The total amount of items in this order is {this.state.order.itemQuantity}</h4>
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