const priorityQueue = require('js-priority-queue');

class HuffmanNode {
	constructor(char, frequency = 0, left = null, right = null) {
		this.left = left;
		this.right = right;
		this.char = char;
		this.frequency = frequency;
	}
}
