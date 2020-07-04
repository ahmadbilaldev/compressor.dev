# Pseudo Code

## Huffman Encode
``` js
// Input: C is a set of n characters and that each character of C is an object with an attribute c:freq giving its frequency

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
// Input: Root is the root of huffman tree
// Input: S is the bitstream to be decompressed

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

