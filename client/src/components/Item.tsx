import React from 'react';
import {Item} from '../api';
import {api} from '../App';

export type ItemState = {
	item?: Item,
};

type Props = {
    itemId: string;
    quantity: number;
};

export class ItemComponent extends React.Component<Props, ItemState> {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
		this.setState({
			item: await api.getItem(this.props.itemId)
		});
    }

    render() {
        const {item} = this.state;
        return (
            item ?
            <div className={'itemCard'}>
                <div className={'itemImage'}>
                    <img src={item.image} alt={item.image}/>  
                </div>
                <div className={'itemName'}>
                    <h4>{item.name}</h4>
                </div>
                <div className={'itemQuantity'}>
                    {this.props.quantity === 1 ? <h4>{this.props.quantity} Item</h4> : <h4>{this.props.quantity} Items</h4>}
                </div>
                <div className={'itemPrice'}>
                    <h4>{item.price}$</h4>
                </div>
            </div>
            : null
        );
    }
}

export default ItemComponent;