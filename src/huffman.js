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
