function lzwEncoder(inputString)
{
    var myDict = {};
    var convertedData = (inputString + "").split(""); //converting string into array/each corrector separated
    var encodedData = [];
    var currentChar;
    var previousChar = convertedData[0];
    var charCode = 256; 
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
           
            myDict[previousChar + currentChar] = charCode;
            charCode++;
            previousChar = currentChar;
        }
    }
    //adding last element in encoded string
    if(previousChar.length > 1) encodedData.push(myDict[previousChar]);
    else encodedData.push(previousChar.charCodeAt(0));
   
    /*
    converting ascii charCode into symbols
    */
    for (var i=0; i<encodedData.length; i++) {
        encodedData[i] = String.fromCharCode(encodedData[i]);
    }
    return encodedData.join("");
}

function lzw_decode(encodedString) {
    var newDict = {};
    var convData = (encodedString + "").split("");
    var currChar = convData[0];
    var prevSelectedChar = currChar;
    var decodedString = [currChar]; //selecting the first element as output because 1st element is always less than 256
    var charCode = 256;
    var selectedChar;
    for (var i=1; i<convData.length; i++) 
    {
        var currCode = convData[i].charCodeAt(0);
        if (currCode < 256) 
        {
         selectedChar = convData[i];
        }
        else 
        {
            //if it is present
            if(newDict[currCode] != null)
            {
                selectedChar = newDict[currCode];
            }
            else
            {
                selectedChar = (prevSelectedChar + currChar); //if its not present then its always going to be last+current character
            }
        }

        decodedString.push(selectedChar);
        currChar = selectedChar.charAt(0);
        newDict[charCode] = prevSelectedChar + currChar;
        charCode++;
        prevSelectedChar = selectedChar;
    }
    return decodedString.join("");

}


let string = "abcaababcbbcab";
console.log("the main string is",string);
let encoded = [1,2,3,1];
let newObj = getFrequencies(string);
encodedStr = lzwEncoder(string);
console.log("The encode string is",encodedStr);
decodedStr = lzw_decode(encodedStr);
console.log("The decoded string is",decodedStr);
if(string == decodedStr)
{
    console.log("its working")
}
