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
	return decodedString;
}

module.exports = {
	lzwEncode,
	lzwDecode,
};

// *********** DEBUGGING ***********

// let string =
// 	"It will provide cheap, reliable and efficient system for data compression in digital communication system.";
// console.log('Input String:\n', string);
// encodedStr = lzwEncode(string);
// console.log('Encoded string:\n', encodedStr);
// decodedStr = lzwDecode(encodedStr);
// console.log('Decoded string:\n', decodedStr);
// if (string == decodedStr) {
// 	console.log('its working');
// }
