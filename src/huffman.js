const fs = require('fs');
const priorityQueue = require('js-priority-queue');

class HuffmanNode {
	constructor(char, frequency = 0, left = null, right = null) {
		this.left = left;
		this.right = right;
		this.char = char;
		this.frequency = frequency;
	}
}

/**
 * (#1) Initiliaze frequency object, keys are characters and their value is thier frequencies
 * Input: simple string
 * Output: Object like {a:2, b:3, v:5} which has characters and their respecctive frequencies
 */
function getFrequencies(inputString) {
	const freqObj = {};

	for (let char of inputString) {
		if (freqObj[char]) {
			freqObj[char]++; // If character exixts, increment its frequency.
		} else {
			freqObj[char] = 1; // if character doesnt exist, add it with frequency 1.
		}
	}
	return freqObj;
}

function buildHuffmanTree(freqObj) {
	// Initialize a Min Queue, it is Min Queue because it is sorted wrt to frequencies
	let minQueue = new priorityQueue({
		// a and b are huffmanNodes, comparator orderss nodes according to frequencies.
		comparator: function (a, b) {
			return a.frequency - b.frequency;
		},
	});

	/**
	 * Extracts characters and frequencies from object as key and value
	 * Makes their nodes and inserts all
	 * of them in the min queue.
	 */
	for (const [key, value] of Object.entries(freqObj)) {
		let newNode = new HuffmanNode(key, value);
		minQueue.queue(newNode);
	}
	while (minQueue.length > 1) {
		const leftNode = minQueue.dequeue();
		const rightNode = minQueue.dequeue();
		const sumFrequency = leftNode.frequency + rightNode.frequency;
		const sumNode = new HuffmanNode(null, sumFrequency, leftNode, rightNode);
		minQueue.queue(sumNode);
	}
	return minQueue.dequeue();
}

// Recursively calcuate codes of each character.
function huffmanCodes(currentNode, codes, currentCode) {
	// if leaf node reached.
	if (!(currentNode.left && currentNode.right)) {
		codes[currentNode.char] = currentCode;
		return;
	}

	huffmanCodes(currentNode.left, codes, currentCode + '0');
	huffmanCodes(currentNode.right, codes, currentCode + '1');
}

function codesToByteArray(inputString, codes, zeroPadding) {
	let encodedString = '';

	// Read input text and encode it using the codes. Store it in the encodedString.
	for (i = 0; i < inputString.length; i++) {
		encodedString += codes[inputString.charAt(i)];
	}

	// Initialize an array of bytes.
	let byteArray = new Uint8Array(encodedString.length / 8 + (encodedString.length % 8 != 0 ? 1 : 0));

	// Take one byte of the encodedString at each instance, and put it into byte array as bits.
	for (i = 0; i < encodedString.length; i += 8) {
		let oneByte = encodedString.substring(i, i + 8);

		if (oneByte.length < 8) {
			for (j = oneByte.length; j < 8; j++) {
				oneByte += '0';
				zeroPadding.count++;
			}
		}
		let byte = parseInt(oneByte, 2);
		byteArray[i / 8] = byte;
	}
	return byteArray;
}

function intToByteArray(int, byteArray) {
	for (let index = 0; index < byteArray.length; index++) {
		let byte = int & 0xff;
		byteArray[index] = byte;
		int = (int - byte) / 256;
	}
}

function byteArrayToInt(byteArray) {
	let intResult = 0;

	for (let i = byteArray.length - 1; i >= 0; i--) {
		intResult = intResult * 256 + byteArray[i];
	}
}

/**
 * Swaps the keys and values of a given object.
 * @param {*} object
 */
function flipObject(obj) {
	let flippedObj = {};
	for (let key in obj) {
		flippedObj[obj[key]] = key;
	}
	return flippedObj;
}

function outputEncodedString(codes, byteArray, zeroPadding) {
	let json = JSON.stringify(codes);
	json = json.replace(/"/g, '');
	json = json.substring(1, json.length - 1);

	// Populate final encoded bytes array
	let finalEncodedArray = new Uint8Array(5 + json.length + byteArray.length);
	intToByteArray(json.length, finalEncodedArray);
	finalEncodedArray[4] = zeroPadding;

	for (i = 0; i < json.length; i++) {
		finalEncodedArray[i + 5] = json.charCodeAt(i); // coding scheme
	}

	for (i = 0; i < byteArray.length; i++) {
		finalEncodedArray[i + 5 + json.length] = byteArray[i];
	}

	const outFile = `encoded.txt`;
	const outData = finalEncodedArray;
	fs.writeFileSync(outFile, outData);
}

/**
 * Complete encoding function.
 * @param {*} inputString - the string to be encoded.
 */
function huffmanEncode(inputString) {
	let freqObj = getFrequencies(inputString);
	let rootNode = buildHuffmanTree(freqObj);
	let codes = {}; // object with key-value pairs.
	huffmanCodes(rootNode, codes, '');
	let zeroPadding = { count: 0 };
	let byteArray = codesToByteArray(inputString, codes, zeroPadding);
	outputEncodedString(codes, byteArray, zeroPadding);
}
