# Pseudo Code

Our Algorithm uses a modified form of Huffman Coding. We basically employ another algortihm, Lempel–Ziv–Welch. 
First we apply LZW encoding the the input, and then we encode it further using Huffman encoding. As a result the
compression is improved signifacantly as compared to a simple Huffman Algorithm. This makes for our modified Huffman
algorithm whose pseudo code is as follows:

## Huffman Encode
``` js
/* Input: C is a set of n characters, coming after encoding by lzw and that
*  each character of C is an object with an attribute c:freq giving its frequency
*/

Function huffmanEncode(C)  

1   n = C.size
2   Q = priority_queue()

3   for i = 1 to n
4     n = node(C[i])
5     Q.push(n)
6   end for

7   while Q.size() is not equal to 1
8      Z = new node()
9      Z.left = x = Q.pop
10     Z.right = y = Q.pop
11     Z.frequency = x.frequency + y.frequency
12     Q.push(Z)
13  end while
14 Return Q
```

## Huffman Decode
``` js
/*
*  Input: Root is the root of huffman tree
*  Input: S is the bitstream to be decompressed
*/

Function huffmanDecode(root, S)  

1   n = S.size
2   for i := 1 to n
3     current = root
4     while current.left != NULL and current.right != NULL
5       if S[i] is equal to '0'
6           current := current.left
7       else
8           current := current.right
9       endif
10      i := i+1
11    endwhile
12   result += current.symbol
13  endfor
14  return result
```
## LZW Encode
``` js
/*
*  Input: C is the input array to be encoded.
*/

Function lzwEncode(C)  

1   Initialize dictionary/table and enter all characters in it
2   string s = C[1]  // first input character
3   encoded = ""
4   while any input left
5     ch = next input character
6     if s+c is in the dictionary
7       s = s + ch
8     else
9       output dictionary code (index) of s to result array 
10      add s+ch to dictionary
11      s = ch
12    end if
13  end while
14  output dictionary code (index) of s to result array
15  return encoded
```

## LZW Decode
``` js
*/
*  Input: S is the lzw encoded array
*  dict(code) is the dictionary string corresponding to the given index/code.
*  + means string/char concatenation.
*/

Function lzwDecode(S)  

1  Initialize table/dictionary with all characters
2  decoded = ""    
3  read a character k
4  decodedString = k // Output k
5  w = k

6  while  read a character k     // k could be a character or a code, will run till end of input stream
7    if k exists in the dictionary
8        entry = dict(k) // dictionary entry for k 
9        decodedString += entry // Output entry
10       add w + entry[0] to dictionary
11       w = entry
12   else
13       entry = w + firstCharacterOf(w)
14       decodedString(entry) // Output entry
15       add entry to dictionary
16       w = entry;
17   end if
18 end while
19 return decodedString
```

##  LZW based Huffman Encode
``` js
/* 
*  Input: C is the array to be encoded
*/

Function finalEncode(C)  

1   C = lzwEncode(C)     // First we lzw encode the input string
2   Initialize an object objC of C
3   objC[].freq          // Calculate frequency attribute for each character of lzw encoded array C
4   encodedString = huffmanEncode(objC)   // Then we encode the lzw encoded string with huffman
5   output encodedString to file
6   output huffman coding scheme to file
```


##  LZW based Huffman Decode
``` js
/* 
*  Input: Root is the root of huffman tree
*  Input: S is the bitstream to be decompressed
*/

Function finalEncode(root, S)  

1   decodedString = huffmanDecode(root,S)         // First we decode the huffman compressed string
2   decodedString = lzwDecode(decodedString)      // Then we decoded the resulting string by lzw to get the final string
3   output decodedString to file
```
