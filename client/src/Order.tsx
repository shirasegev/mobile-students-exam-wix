import React from 'react';
import {Order} from './api';
import {api} from './App';

export type OrderState = {
	order: Order,
};

type Props = {
    order: Order;
};

export class OrderComponent extends React.Component<Props, OrderState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            order: props.order,
        };
    }
  
    render() {
        return (
            <div className={'orderCard'}>
                <div className={'generalData'}>
                    <h6>{this.state.order.id}</h6>
                    <h4>{this.state.order.customer.name}</h4>
                    <h5>Order Placed: {new Date(this.state.order.createdDate).toLocaleDateString()}</h5>
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
    
	static getAssetByStatus(status: string) {
		switch (status) {
			case 'fulfilled':
				return require('./assets/package.png');
			case 'not-fulfilled':
				return require('./assets/pending.png');
			case 'canceled':
				return require('./assets/cancel.png');
			case 'paid':
				return require('./assets/paid.png');
			case 'not-paid':
				return require('./assets/not-paid.png');
			case 'refunded':
				return require('./assets/refunded.png');
		}
	}
}

export default OrderComponent;