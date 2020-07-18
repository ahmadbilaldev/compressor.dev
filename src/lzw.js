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

function lzwEncoder(newObj,inputString)
{
    let freqObj = newObj;
    let encodedString = '';
    let previousChar = '';
    let nextChar = '';
    let lasChar = false;
    currentChar = inputString[0];
    let i = 0;
    while(i <= inputString.length)
    {
        if( (i == inputString.length))  lasChar = true;

        if(freqObj.hasOwnProperty(currentChar))
        {
            previousChar = currentChar;
            if(lasChar)
            {
                currentChar = '';
                nextChar = '';
            }
            else
            {
                currentChar += inputString[i+1];
                nextChar = inputString[i+1];
                i++;
            }
           
        }
        else
        {
            let index = -1;
            let j = 1;
            for(const [key,value] of Object.entries(freqObj))
            {   
                if(key == previousChar)
                {
                    index = j;
                }
                j++;
            }
            encodedString += index;
            if(!lasChar)
            {
                freqObj[currentChar]++;
                previousChar ='';
                nextChar = '';
                currentChar = inputString[i]; 
            }
            else
            {
                i++;
            }

           
            
        }
    }
    console.log(encodedString);
    return encodedString;
}




let string = "a";
let newObj = getFrequencies(string);
let j =0;
console.log(newObj);
lzwEncoder(newObj,string);