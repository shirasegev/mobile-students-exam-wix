import express from 'express';
import bodyParser = require('body-parser');

const app = express();
const allOrders: any[] = require('./orders.json');
const {products} = require('./products.json');

const PORT = 3232;
const PAGE_SIZE = 20;

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.get('/api/orders', (req, res) => {
	const page = <number>(req.query.page || 1);
	const orders: any[] = allOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
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
app.put('/api/order/:orderId', (req, res) => {
	const orderId : number = +<string>(req.params.orderId);
	const fulfillmentStatus = <string>(req.body);
	allOrders.forEach((order) => {
		if (order.id === orderId) {
			order.fulfillmentStatus = fulfillmentStatus;
			res.send(order);
		}
	})
});

app.listen(PORT);
console.log('Listening on port', PORT);
