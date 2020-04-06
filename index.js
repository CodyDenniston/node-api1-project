const express = require('express');
const shortid = require('shortid');

const server = express();

//middleware
server.use(express.json()); //teaches the server to parse the JSON from the body

let users = [
	{
		id: shortid.generate(),
		name: 'john Doe',
		bio: 'Construction Worker',
	},
];

server.get('/', (req, res) => {
	res.json({ api: 'running.....' });
});

server.get('/api/users', (req, res) => {
	res.json(users);
});

server.get('/api/users/:id', (req, res) => {
	const id = req.params.id;

	const user = users.find((user) => user.id == id);

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({ message: 'user not found' });
	}
});

server.post('/api/users', (req, res) => {
	const userInfo = req.body;

	userInfo.id = shortid.generate();

	users.push(userInfo);

	res.status(201).json(users);
});

const port = 5002; // the server is running on http:localhost5000/
server.listen(port, () => console.log(`\n== api on port ${port} ==\n`));

//to run the server call node index.js
