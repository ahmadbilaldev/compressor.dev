const express = require('express');
const bodyParser = require('body-parser');

const huff = require('./utils/huffman');

// Initiate a instance of express.
const app = express();
const PORT = process.env.port || 3000;

// Make ./public the web root.
app.use(express.static('public'));

// Provide libraries through node modules.
// app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}....`));

// Get index.html
app.get('/', function (req, res) {
	res.sendFile('index.html');
});

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

	let decoded = huff.huffmanDecode(encodedBits, codingSchemeObject);
	res.send(decoded);
});

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
	console.log(inputString);

	let encodedObject = huff.huffmanEncode(inputString);
	console.log(encodedObject);
	res.json(encodedObject);
	// let finalEncodedArray = huff.huffmanEncode(inputString);
	// console.log(finalEncodedArray);
	// const outFile = `encodedTest.txt`;
	// const outData = finalEncodedArray;
	// fs.writeFile(outFile, outData, function (err) {
	// 	if (err) {
	// 		console.log(error);
	// 	}
	// });
	// console.log(`${__dirname}/encodedTest.txt`);
	// res.download(`${__dirname}/encodedTest.txt`);
});
