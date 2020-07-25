// Global variables
var timeout_to_show;

// Padding function
String.prototype.paddingLeft = function (paddingValue) {
	return String(paddingValue + this).slice(-paddingValue.length);
};

// Enable tool tips
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

// // text input
// $(document).ready(function () {
// 	$('#huffman_input').keyup(function () {
// 		// Get text
// 		var input = $('#huffman_input').val();

// 		// Call the interpret function
// 		if (input != '') var result = interpret_text(input);

// 		// Update GUI
// 		update_gui_elements(result);
// 	});
// });

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
	return finalEncodedArray;
}

// UPLOAD FILE TO ENCODE
$(document).ready(function () {
	$('#huffman_encode_input').change(function (e) {
		var input = document.getElementById('huffman_encode_input');
		var file = input.files[0];
		loadFileToEncode(file, function (inputString) {
			$.ajax({
				url: '/encode',
				type: 'POST',
				data: {
					string: inputString,
				},
				success: function (data) {
					console.log('succes' + data);
					let str = outputEncodedString(data.codeObj, data.byteArr, data.zeroPad);
					console.log(str);
					update_huffman_download(str, 'encodedString');
				},
			});
		});
	});
});

// UPLOAD FILE TO DECODE
$(document).ready(function () {
	$('#huffman_upload_input').change(function (e) {
		var input = document.getElementById('huffman_upload_input');
		var file = input.files[0];
		loadEncodedFile(file, function (encodedBits, codingSchemeObject) {
			console.log(encodedBits);
			console.log(codingSchemeObject);
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

function loadFileToEncode(file, callBack) {
	let reader = new FileReader();
	reader.onload = function (e) {
		let str = e.target.result;
		callBack(str);
	};
	reader.readAsBinaryString(file);
}

// Handle reading the file's contents
function loadEncodedFile(file, callBack) {
	var reader = new FileReader();

	reader.onload = function (e) {
		// Get all the bytes from the file
		let byteString = new Uint8Array(e.target.result.length);
		for (i = 0; i < e.target.result.length; i++) {
			byteString[i] = e.target.result.charCodeAt(i);
		}
		// *******************
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

		// Swap the key and value of the object. Values become keys, keys become values.
		function flipObject(obj) {
			let flippedObj = {};
			for (let key in obj) {
				flippedObj[obj[key]] = key;
			}
			return flippedObj;
		}

		codingSchemeObject = flipObject(codingSchemeObject);

		// TESTING
		let result = interpret_byte_array(byteString);

		callBack(encodedBits, codingSchemeObject);
		// Verify
		if (result === false) {
			$('.show_error').html(
				"<div class='alert alert-dismissible alert-danger'><button type='button' class='close' data-dismiss='alert'>×</button><strong>Oh snap!</strong> It looks like the file you uploaded is either too large or incorrectly formatted.</div>"
			);
			return;
		}
	};
	reader.readAsBinaryString(file);
}

// Update the download button
function update_huffman_download(file_output, type) {
	if (type === '') {
		type = 'test';
	}
	console.log('DEBUG DOWNLOAD' + file_output);
	var blob = new Blob([file_output], { type: 'application/octet-stream' });
	var url = window.URL.createObjectURL(blob);
	$('#huffman_download').attr('href', url);
	$('#huffman_download').attr('download', type);
}

// Update compression percentage meter
function update_huffman_compression(percentage) {
	// Handle undefined
	if (percentage === undefined) {
		$('#huffman_compression_bar').css('width', '0%');
		$('#huffman_compression').attr('data-original-title', '0%');
		return;
	}

	// Format bar
	$('#huffman_compression_bar').css('width', Math.abs(percentage) + '%');

	if (percentage < 0) {
		$('#huffman_compression_bar').removeClass('progress-bar-danger');
		$('#huffman_compression_bar').addClass('progress-bar-danger');
	} else {
		$('#huffman_compression_bar').removeClass('progress-bar-danger');
	}

	$('#huffman_compression').attr('data-original-title', Math.round(percentage, 1) + '%');
}
