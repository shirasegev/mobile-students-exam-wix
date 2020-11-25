import axios from 'axios';

export type Customer = {
	name: string;
}

export type BillingInfo = {
	status: string;
}

export type Price = {
	formattedTotalPrice: string;
}

export type Order = {
	id: number;
	createdDate: string;
	fulfillmentStatus: string;
	billingInfo: BillingInfo;
	customer: Customer;
	itemQuantity: number;
	price: Price;
	
	items: Item[];
}

export type Item = {
	id: string;
	name: string;
	price: number;
	image: string;

	quantity: number;
}

export type ApiClient = {
	getOrders: (page: number) => Promise<[Order[], number]>;
	getItem: (itemId: string) => Promise<Item>;
	putOrder: (order: Order) => Promise<Order>;
}

export const createApiClient = (): ApiClient => {
	return {
		getOrders: async (page: number) => {
			const res = await axios.get(`http://localhost:3232/api/orders?
										page=${page}`
									);
			return [res.data, res.headers['number-of-pages']];
		},
		getItem: (itemId: string) => {
			return axios.get(`http://localhost:3232/api/items/${itemId}?size=small`).then((res) => res.data);
		},
		// Part A1 - Updating order status at server
		putOrder: (order: Order) => {
			return axios.put(`http://localhost:3232/api/order/${order.id}`, order.fulfillmentStatus, {headers: {"Content-Type": "text/plain"}}).then((res) => res.data);
		},
	}
};



