const express = require('express');
const bodyParser = require('body-parser');
const huff = require('./src/huffman');

// Initiate a instance of express.
const app = express();
const PORT = process.env.port || 3000;

// Make public the root.
app.use(express.static('public'));

// Provide libraries through node modules.
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Start
app.listen(PORT, () => console.log(`Server running on ${PORT}....`));

// Get index.html
app.get('/', function (req, res) {
	res.sendFile('index.html');
});

app.use(
	bodyParser.urlencoded({
		limit: '100mb',
		extended: true,
		parameterLimit: 50000,
	})
);

// DECODE

app.post('/decode', function (req, res) {
	let encodedBits = req.body.bits;
	let codingSchemeObject = req.body.obj;

	let decoded = huff.huffmanDecode(encodedBits, codingSchemeObject);

	res.send(decoded);
});
