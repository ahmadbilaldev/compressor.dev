function lzwEncode(inputString) {
	let myDict = {};
	let convertedData = (inputString + '').split(''); //converting string into array/each corrector separated
	let encodedArray = []; // Array containing the encoded codes
	let currentChar;
	let previousChar = convertedData[0];
	let charCode = 256;

	// Populating the encoded array
	for (let i = 1; i < convertedData.length; i++) {
		currentChar = convertedData[i];
		if (myDict[previousChar + currentChar] != null) {
			// If that chararcter is found then next char is concatenated
			previousChar += currentChar;
		} else {
			if (previousChar.length > 1) encodedArray.push(myDict[previousChar]);
			else encodedArray.push(previousChar.charCodeAt(0));
			myDict[previousChar + currentChar] = charCode;
			charCode++;
			previousChar = currentChar;
		}
	}
	// Adding last element in encoded array
	if (previousChar.length > 1) encodedArray.push(myDict[previousChar]);
	else encodedArray.push(previousChar.charCodeAt(0)); // Array completely populated

	let encodedString = encodedArray.toString(); // Converting array to string for Huffman to work
	return encodedString;
}

function lzwDecode(encodedString) {
	let newDict = {};
	let encodedArray = encodedString.split(',').map(Number); // Converting string to array for lzw to work
	let currChar = String.fromCharCode(encodedArray[0]);
	let prevSelectedChar = currChar;
	let decodedString = [currChar]; // Selecting the first element as output because 1st element is always less than 256
	let charCode = 256;
	let selectedChar;

	for (let i = 1; i < encodedArray.length; i++) {
		let currCode = encodedArray[i];
		if (currCode < 256) {
			selectedChar = String.fromCharCode(encodedArray[i]);
		} else {
			// if it is present
			if (newDict[currCode] != null) {
				selectedChar = newDict[currCode];
			} else {
				selectedChar = prevSelectedChar + currChar; // if its not present then its always going to be last+current character
			}
		}

		decodedString += selectedChar;
		currChar = selectedChar[0];
		newDict[charCode] = prevSelectedChar + currChar;
		charCode++;
		prevSelectedChar = selectedChar;
	}
	console.log(decodedString);
	return decodedString;
}

module.exports = {
	lzwEncode,
	lzwDecode,
};

// *********** DEBUGGING ***********

// let string =
// 	"Data compression is of interest in business data processing, both because of the cost savings it offers and because of the large volume of data manipulated in many business applications. A method and system for transmitting a digital image (i.e., an array of pixels) from a digital data source to a digital data receiver. More the size of the data be smaller, it provides better transmission speed and saves time. In this communication we always want to transmit data efficiently and noise free. Both the LZW and Huffman data compression methods are lossless in manner. These methods or some versions of them are very common in use of compressing different types of data. Even though on average Huffman gives better compression results, it determines the case in which the LZW performs best and when the compression efficiency gap between the LZW algorithm and its Huffman counterpart is the largest. In the case of Hybrid compression it gives better compression ratio than in single compression. So, at first I wanted to compress original data by Huffman Encoding Technique then by the LZW Encoding Technique .But it did not give better compression ratio than in single LZW compression. At that time I have found that if we compress the data by Huffman first and then by LZW all the cases it gives better compression ratio. Then it named as 'Data compression using Huffman based LZW Encoding'. Its compression ratio most of the cases above 2.55 and in some cases it becomes above 3.25 or more. It will provide cheap, reliable and efficient system for data compression in digital communication system.";
// console.log('Input String:\n', string);
// encodedStr = lzwEncode(string);
// console.log('Encoded string:\n', encodedStr);
// decodedStr = lzwDecode(encodedStr);
// console.log('Decoded string:\n', decodedStr);
// if (string == decodedStr) {
// 	console.log('its working');
// }
