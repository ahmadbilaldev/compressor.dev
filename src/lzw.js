function lzwEncoder(inputString) {
	let myDict = {};
	let convertedData = (inputString + '').split(''); //converting string into array/each corrector separated
	let encodedData = [];
	let currentChar;
	let previousChar = convertedData[0];
	let charCode = 256;
	let k =0;

	for (let i = 1; i < convertedData.length; i++) 
	{
		currentChar = convertedData[i];
		if (myDict[previousChar + currentChar] != null) 
		{
			//if that chararcter is found then next char is concatenated
			previousChar += currentChar;
		} else 
		{
			if (previousChar.length > 1) encodedData[k] = (myDict[previousChar]);
			else encodedData[k] = (previousChar.charCodeAt(0));
			k++;
			myDict[previousChar + currentChar] = charCode;
			charCode++;
			previousChar = currentChar;
		}
	}
	// Adding last element in encoded string
	if (previousChar.length > 1) encodedData[k] = (myDict[previousChar]);
	else encodedData[k] = (previousChar.charCodeAt(0));
	return encodedData;
}

function lzw_decode(encodedString) {
	let newDict = {};
	convData = encodedString;
	let currChar = convData[0];
	let prevSelectedChar = currChar;
	let decodedString = [String.fromCharCode(currChar)]; //selecting the first element as output because 1st element is always less than 256
	let charCode = 256;
	let selectedChar;

	for (let i = 1; i < convData.length; i++) 
	{
		let currCode = convData[i];
		if (currCode < 256) 
		{
			selectedChar = String.fromCharCode(convData[i]);
		} 
		else 
		{
			//if it is present
			if (newDict[currCode] != null) 
			{
				selectedChar = (newDict[currCode]);
			} 
			else 
			{
				selectedChar = String.fromCharCode(prevSelectedChar) + String.fromCharCode(currChar); //if its not present then its always going to be last+current character
			}
		}

		decodedString.push(selectedChar);
		currChar = selectedChar.charCodeAt(0);
		newDict[charCode] = String.fromCharCode(prevSelectedChar) + String.fromCharCode(currChar);
		charCode++;
		prevSelectedChar = selectedChar.charCodeAt(0);
	}
	return decodedString.join('');
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

// *********** DEBUGGING ***********

let string = 'abcaababcbbcab';
console.log('the main string is', string);
let encoded = [1, 2, 3, 1];
let newObj = getFrequencies(string);
encodedStr = lzwEncoder(string);
console.log('The encode string is', encodedStr);
decodedStr = lzw_decode(encodedStr);
console.log('The decoded string is', decodedStr);
if (string == decodedStr) {
	console.log('its working');
}
