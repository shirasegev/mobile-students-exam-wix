import React from 'react';
import {Item} from '../api';
import {api} from '../App';

export type ItemState = {
    itemId: string,
    quantity: number,
	item?: Item,
};

type Props = {
    itemId: string;
    quantity: number;
};

export class ItemComponent extends React.Component<Props, ItemState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            itemId: props.itemId,
            quantity: props.quantity,
        };
    }

    async componentDidMount() {
		this.setState({
			item: await api.getItem(this.state.itemId)
		});
	}

    render() {
        return (
            this.state.item?
            <div className={'itemCard'}>
                <div className={'itemImage'}>
                    <img src={this.state.item.image} alt={this.state.item.image}/>  
                </div>
                <div className={'itemName'}>
                    <h4>{this.state.item.name}</h4>
                </div>
                <div className={'itemQuantity'}>
                    {this.state.quantity === 1 ? <h4>{this.state.quantity} Item</h4> : <h4>{this.state.quantity} Items</h4>}
                </div>
                <div className={'itemPrice'}>
                    <h4>{this.state.item.price}$</h4>
                </div>
            </div>
            : null
        );
    }
}

export default ItemComponent;