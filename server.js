const express = require('express');
const bodyParser = require('body-parser');

const huff = require('./utils/huffman');
const lzw = require('./utils/lzw');

// Initiate a instance of express.
const app = express();
const PORT = process.env.port || 3000;

// Make ./public the web root.
app.use(express.static('public'));

// Start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}....`));

// Get index.html as the base site
app.get('/', function (req, res) {
	res.sendFile('index.html');
});

// Configuring the bodyParser middleware
app.use(
	bodyParser.urlencoded({
		limit: '20mb',
		extended: true,
		parameterLimit: 50000,
	})
);

// DECODE
app.post('/decode', function (req, res) {
	let encodedBits = req.body.bits;
	let codingSchemeObject = req.body.obj;

	let huffDecoded = huff.huffmanDecode(encodedBits, codingSchemeObject);
	console.log('\nH Encoding: \n ');
	console.log(huffDecoded);
	let lzwDecoded = lzw.lzwDecode(huffDecoded);
	res.send(lzwDecoded);
});

// Configuring the bodyParser middleware
app.use(
	bodyParser.urlencoded({
		limit: '20mb',
		extended: true,
		parameterLimit: 50000,
	})
);

// ENCODE
app.post('/encode', function (req, res) {
	let inputString = req.body.string;
	let lzwEncoded = lzw.lzwEncode(inputString);
	console.log('Encoding: \n ');
	console.log(lzwEncoded);
	console.log('encoding end');
	let encodedObject = huff.huffmanEncode(lzwEncoded);
	res.json(encodedObject);
});
