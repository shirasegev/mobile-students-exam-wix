import express from 'express';
import bodyParser = require('body-parser');

const app = express();
const allOrders: any[] = require('./orders.json');
const {products} = require('./products.json');

const PORT = 3232;
const PAGE_SIZE = 20;

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Expose-Headers', 'Number-Of-Pages');
	next();
});

app.get('/api/orders', (req, res) => {
	const page = <number>(req.query.page || 1);
	const search = <string>(req.query.search || '');
	const fulfillmentFilter = <string>(req.query.fulfillmentFilter || '');
	const paymentFilter = <string>(req.query.paymentFilter || '');
	const sortBy = <string>(req.query.sortBy || '');

	var myOrders = <any>applySearch(allOrders, search, fulfillmentFilter, paymentFilter);
	if (sortBy !== ''){
		myOrders.sort((function alphabeticallySort(a: any, b: any) {
			var A, B;
			if (sortBy === 'name'){
				A = a.customer.name.toLowerCase();
				B = b.customer.name.toLowerCase();
			}
			else if (sortBy === 'date'){
				A = a.createdDate;
				B = b.createdDate;
			}
			if (A > B)
				return 1;
			if (A < B)
				return -1;
			return 0;
		}))
	}
	
	const orders: any[] = myOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	res.header('Number-Of-Pages', Math.ceil(myOrders.length / PAGE_SIZE).toFixed());
	res.send(orders);
});

app.get('/api/items/:itemId', (req, res) => {
	const itemId = <string>(req.params.itemId);
	const size = <string>(req.query.size || 'large');
	const product = products[itemId];
	res.send({
		id: itemId,
		name: product.name,
		price: product.price,
		image: product.images[size]
	});
});

// Part A1 - Updating order status at server
app.patch('/api/order/:orderId', (req, res) => {
	const orderId : number = +<string>(req.params.orderId);
	const fulfillmentStatus = <string>(req.body);
	allOrders.forEach((order) => {
		if (order.id === orderId) {
			order.fulfillmentStatus = fulfillmentStatus;
			res.send(order);
		}
	})
});

// Part D
app.get('/api/ordersCounter', (req, res) => {
	const counter: number = allOrders.filter((order) => (order.fulfillmentStatus === 'not-fulfilled')).length;
	res.send(counter.toFixed());
});

// Part B2
const applySearch = (orders: any[], search: string, fulfillmentFilter: string, paymentFilter: string) => {
	return (
		orders.filter(
			(order) => 
				(fulfillmentFilter !== '' ? order.fulfillmentStatus === fulfillmentFilter : true) &&
				(paymentFilter !== '' ? order.billingInfo.status === paymentFilter : true) &&
				(search !== '' ? buildStr(order).includes(search) : true)
		)
	);
}

function buildStr (order: any): string {
	var str = order.customer.name.toLowerCase() + '#' + order.id + '#';
	order.items.forEach((item: any) => {
		str += products[item.id].name.toLowerCase() + '#';
	});
	return str;
}

app.listen(PORT);
console.log('Listening on port', PORT);