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
