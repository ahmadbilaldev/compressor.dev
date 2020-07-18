/*
the function to make an object that has key value pairs
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

function lzwEncoder(inputString)
{
    var myDict = {};
    var convertedData = (inputString + "").split(""); //converting string into array/each corrector separated
    var encodedData = [];
    var currentChar;
    var previousChar = convertedData[0];
    var comparisonCode = 256; 
    for (var i = 1; i < convertedData.length; i++) 
    {
        currentChar=convertedData[i];
        if (myDict[previousChar + currentChar] != null)  //if that chararcter is found then next char is concatenated
        {
            previousChar += currentChar;
        }
        else 
        {
            if(previousChar.length > 1) encodedData.push(myDict[previousChar]);
            else encodedData.push(previousChar.charCodeAt(0));
           
            myDict[previousChar + currentChar] = comparisonCode;
            comparisonCode++;
            previousChar = currentChar;
        }
    }
    //adding last element in encoded string
    if(previousChar.length > 1) encodedData.push(myDict[previousChar]);
    else encodedData.push(previousChar.charCodeAt(0));
   
    /*
    converting ascii code into symbols
    */
    for (var i=0; i<encodedData.length; i++) {
        encodedData[i] = String.fromCharCode(encodedData[i]);
    }
    return encodedData.join("");
}

function lzwDecoder(newObj,encodedString)
{
    let decodedString = '';
    let k = 0;
    let i = 0;
    while(i < encodedString.length)
    {
        newCode = encodedString[i];
        if(encodedString[i] <= Object.keys(newObj).length)
        {
            let j = 1;
            let z = encodedString[i];
            for(const [key,value] of Object.entries(newObj))
            {   
                if(j == z)
                {
                    decodedString += key;
                }
                j++;
            }
            i++;
        }
        else
        {
            let dictIndex = Object.keys(newObj).length;
            let m = 0;
            let currentChar,nextChar,previousChar = '';
            currentChar = decodedString[0];
            while(dictIndex <= encodedString[i])
            {
                while(m < decodedString.length)
                {
                    if(newObj.hasOwnProperty(decodedString[m]))
                    {
                        previousChar = currentChar;
                        currentChar = decodedString[m+1];
                        nextChar = decodedString[m+1];
                        m++;
                    }
                    else
                    {


                    }
                }
            }   
        }
      
        
        
    }

  console.log(decodedString);
}


let string = "abcaababcbbcab";
let encoded = [1,2,3,1];
let newObj = getFrequencies(string);
console.log(lzwEncoder(string));