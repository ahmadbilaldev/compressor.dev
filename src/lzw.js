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

function lzwEncoder(freqObj,inputString)
{
    let encodedString = '';
    pChar = inputString[0];
    for(let i=0;i<inputString.length;i++)
    {
        nextChar = inputString[i+1];
        if(console.log(newObj.hasOwnProperty(pChar)))
        {
            pChar += nextChar;
        }
        else
        {
            freqObj[pChar]++;
            var index = freqObj.products.map((o) => o.attr1).indexOf(inputString[i]);
            encodedString += index.toString;
            pChar = nextChar; 

        }
    }
    console.log(encodedString);
}




let string = "abbacbbabaacbbac";
let newObj = getFrequencies(string);
lzwEncoder(newObj,string);