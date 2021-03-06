// Stats of compression
let stats = {
	inputSize: 0,
	compressedSize: 0,
	timeTaken: 0,
};

// UPLOAD FILE TO ENCODE
$(document).ready(function () {
	$('#huffman_encode_input').change(function (e) {
		let startTime = performance.now();
		var input = document.getElementById('huffman_encode_input');
		var file = input.files[0];
		loadFileToEncode(file, function (inputString) {
			stats.inputSize = inputString.length;
			console.log(stats.inputSize);
			if (stats.inputSize === 0) {
				alert('ERROR: The file is empty.');
				return;
			}
			document.getElementById('loading-box').style.display = 'block';
			// Sending POST request in the callback of loadFileToEncode
			$.ajax({
				url: '/encode',
				type: 'POST',
				dataType: 'json',
				data: {
					string: inputString,
				},
				success: function (data) {
					console.log('succes encode');
					let byteArray = codesToByteArray(data.inpString, data.codeObj, data.zeroPad);
					outputEncodedString(data.codeObj, byteArray, data.zeroPad);
					document.getElementById('loading-box').style.display = 'none';
					let endTime = performance.now();
					stats.timeTaken = endTime - startTime;
					console.log('TIME: ', stats.timeTaken);
					update_compression_stats();
				},
			});
		});
	});
});

function loadFileToEncode(file, callBack) {
	let reader = new FileReader();
	reader.onload = function (e) {
		let str = e.target.result; // Input all the data into str
		callBack(str);
	};
	reader.readAsBinaryString(file);
}

// Function for converting string(coding scheme) to bits
function codesToByteArray(inputString, codes, zeroPadding) {
	let encodedString = '';

	// Read input text and encode it using the codes. Store it in the encodedString.
	for (let i = 0; i < inputString.length; i++) {
		encodedString += codes[inputString.charAt(i)];
	}

	// Initialize an array of bytes.
	let byteArray = new Uint8Array(encodedString.length / 8 + (encodedString.length % 8 != 0 ? 1 : 0));

	// Take one byte of the encodedString at each instance, and put it into byte array as bits.
	for (let i = 0; i < encodedString.length; i += 8) {
		let oneByte = encodedString.substring(i, i + 8);

		if (oneByte.length < 8) {
			for (let j = oneByte.length; j < 8; j++) {
				oneByte += '0';
				zeroPadding.count++;
			}
		}
		// Store each code as a bit in the array
		let bit = parseInt(oneByte, 2);
		byteArray[i / 8] = bit;
	}
	return byteArray;
}

// Final function for creating an output string of encoded bits
function outputEncodedString(codes, byteArray, zeroPadding) {
	let json = JSON.stringify(codes);
	// byteArray = JSON.stringify(byteArray);
	json = json.replace(/"/g, '');
	json = json.substring(1, json.length - 1);
	// Populate final encoded bytes array
	let finalEncodedArray = new Uint8Array(5 + json.length + byteArray.length);
	intToByteArray(json.length, finalEncodedArray);
	finalEncodedArray[4] = zeroPadding.count;

	for (let i = 0; i < json.length; i++) {
		finalEncodedArray[i + 5] = json.charCodeAt(i); // coding scheme
	}

	for (let i = 0; i < byteArray.length; i++) {
		finalEncodedArray[i + 5 + json.length] = byteArray[i];
	}
	stats.compressedSize = finalEncodedArray.length;
	console.log(stats.compressedSize);

	// Provide the encoded file for user to download
	var blob = new Blob([finalEncodedArray], { type: 'application/octet-stream' });
	var url = window.URL.createObjectURL(blob);
	// Trigger the download of encoded file automatically
	let a = document.createElement('a');
	a.download = 'encoded.txt';
	a.href = url;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
}

// UPLOAD FILE TO DECODE
$(document).ready(function () {
	$('#huffman_decode_input').change(function (e) {
		let input = document.getElementById('huffman_decode_input');
		let file = input.files[0];
		// Load input file, process the bits and send to server
		loadFileToDecode(file, function (encodedBits, codingSchemeObject) {
			// Callback function
			if (codingSchemeObject === undefined) {
				alert('ERROR: File is empty.');
				return;
			}
			document.getElementById('loading-box').style.display = 'block';
			$.ajax({
				url: '/decode',
				type: 'POST',
				data: {
					bits: encodedBits,
					obj: codingSchemeObject,
				},
				success: function (data) {
					update_huffman_download(data, 'decoded');
				},
			});
		});
	});
});

// Handle reading the file's contents
function loadFileToDecode(file, callBack) {
	var reader = new FileReader();

	reader.onload = function (e) {
		// if file is not empty
		if (e.target.result.length > 0) {
			// Get all the bytes from the file
			let byteString = new Uint8Array(e.target.result.length);
			for (let i = 0; i < e.target.result.length; i++) {
				byteString[i] = e.target.result.charCodeAt(i);
			}
			// Call the interpret function
			let codingSchemeLength = byteArrayToInt(byteString.subarray(0, 4));
			let zeroPadding = byteString[4]; // A count of zero padding applied.
			// Array of char codes of coding scheme
			let codingScheme = byteString.subarray(5, 5 + codingSchemeLength);
			// extract coding scheme as a string
			let codingSchemeString = '';
			for (i = 0; i < codingSchemeLength; i++) {
				codingSchemeString += String.fromCharCode(codingScheme[i]);
			}
			// Convert coding scheme string to json to help converting into object.
			codingSchemeString = '{"' + codingSchemeString + '"}';
			codingSchemeString = codingSchemeString.replace(/,/g, '","');
			codingSchemeString = codingSchemeString.replace(/:/g, '":"');
			codingSchemeString = codingSchemeString.replace('"",""', '","');
			codingSchemeString = codingSchemeString.replace('"\\"', '"\\""');

			console.log(codingSchemeString);
			// Now, convert json into object.
			let codingSchemeObject = JSON.parse(codingSchemeString);

			// store the actual encoded message after the coding scheme.
			let encodedString = byteString.subarray(5 + codingSchemeLength);

			// Convert to bits for decoding, padding left is required in JavaScript
			let encodedBits = '';
			for (i = 0; i < encodedString.length; i++) {
				encodedBits += encodedString[i].toString(2).paddingLeft('00000000');
			}
			// Deletes the zero padding (we applied it while encoding to help convert into bits)
			encodedBits = encodedBits.substring(0, encodedBits.length - zeroPadding);
			codingSchemeObject = flipObject(codingSchemeObject);
			// Call callback function
			callBack(encodedBits, codingSchemeObject);
		} else {
			// If file is empty send undefined to callback
			callBack(undefined, undefined);
		}
	};
	reader.readAsBinaryString(file);
}

// Update the download button
function update_huffman_download(file_output, type) {
	var blob = new Blob([file_output], { type: 'application/octet-stream' });
	var url = window.URL.createObjectURL(blob);
	// Trigger the download of encoded file automatically
	let a = document.createElement('a');
	a.download = 'decoded.txt';
	a.href = url;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	window.URL.revokeObjectURL(url);
	document.getElementById('loading-box').style.display = 'none';
}

// Update Compression stats
function update_compression_stats() {
	// Sizes
	let sizeUnit = 'B';
	// If in KBs
	if (stats.inputSize > 1000) {
		stats.inputSize = stats.inputSize / 1000;
		stats.compressedSize = stats.compressedSize / 1000;
		stats.inputSize = Number.parseFloat(stats.inputSize).toFixed(3);
		stats.compressedSize = Number.parseFloat(stats.compressedSize).toFixed(3);
		sizeUnit = 'KB';
	}
	// If in MBs
	if (stats.inputSize > 1000) {
		stats.inputSize = stats.inputSize / 1000;
		stats.compressedSize = stats.compressedSize / 1000;
		stats.inputSize = Number.parseFloat(stats.inputSize).toFixed(3);
		stats.compressedSize = Number.parseFloat(stats.compressedSize).toFixed(3);
		sizeUnit = 'MB';
	}
	$('#size-box').html(
		'Input File Size: <strong>' +
			stats.inputSize +
			sizeUnit +
			'</strong></br>Compressed Size: <strong>' +
			stats.compressedSize +
			sizeUnit +
			'</strong>'
	);
	// Percentage
	let percentage = (1 - stats.compressedSize / stats.inputSize) * 100;
	percentage = Number.parseFloat(percentage).toFixed(1); // set precision to one decimal
	$('#percentage-box').html('Compression Percentage: <strong>' + percentage + '%</strong>');

	// Time taken
	stats.timeTaken = Math.round(stats.timeTaken);
	$('#time-box').html('Time Taken: <strong>' + stats.timeTaken + 'ms</strong>');
}

// Padding function
String.prototype.paddingLeft = function (paddingValue) {
	return String(paddingValue + this).slice(-paddingValue.length);
};

// Swap the key and value of the object. Values become keys, keys become values.
function flipObject(obj) {
	let flippedObj = {};
	for (let key in obj) {
		flippedObj[obj[key]] = key;
	}
	return flippedObj;
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
	return intResult;
}
