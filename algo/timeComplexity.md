# Time Complexity Analysis
## Huffman Encoding
    Function huffmanEncode(C)   

							        Cost           Times
    1   n = C.size						 C1		 1
    2   Q = priority_queue()				 C2		 N  

    3   for i = 1 to n					 C3		 N+1
    4     n = node(C[i])					 C4		 N
    5     Q.push(n)						 C5		 N(logN)       
    6   end for

    7   while Q.size() is not equal to 1			 C6		 N+1
    8      Z = new node()			      	 	 C7		 N
    9      Z.left = x = Q.pop				 C8		 N
    10     Z.right = y = Q.pop				 C9		 N
    11     Z.frequency = x.frequency + y.frequency		 C10		 N
    12     Q.push(Z)					 C11		 N(logN)
    13  end while
    14 Return Q						 C12		 1

### Analysis
---
The Ruuning time for this algorithm is sum of all the  individual steps invloved in this algorithm which compute and tells 
time T(n).

     T(n) = C1 + C2(N) + C3(N+1) + C4(N)+ C5[NlogN] + C6(N+1) + C7(N) + C8(N) + C9(N) + C10(N) + C1[NlogN] +   C12  

In the above expression we can see that on line 3 & 7 the loop executes for N+1 times because each loop executers N times plus 1 more time to check for the false condition or terminating condition. In the rest of the code the lines that are in body of loop gets executed for N times and outside the body executes for the Constant time except line 2 where time complexity is N because queue is initialized and a min-heap queue takes O(n) time for initializing and also all the lines in which push function of priority queue is called. In these lines we have considered the peiority queue to be implemented in min-heap because in this way we can perform each queue operation in O(logN) time so therfore each push statement will take NlogN time as it is implemented in a loop. But in some cases if the queue is implemented with the linked list it would take O(n) to insert a new node in queue.

---
#### Best Case
---
For optimal condtion we would consider that at line 5 & 12 the node will be inserted at its first iteration of loop or at the start of queue thus n = 1 and as we know log1 = 0 so the whole statement will be implemented in constant or O(0) time.

	  T(n) = (C2 + C3 + C4  + C6 + C7 + C8 + C9 + C10 )N + (C1 + C3 + C6 + C12)
	  
Making this a linear function **an + b** and running time of **O(n)**.

---

#### Worst Case
---
In worst case whole operation of insertion will run for total of n making the time be LogN and since it is runing in loop it will be executed for NlogN.
So

        T(n) = C1 + C2(N) + C3(N+1) + C4(N) + C5(NlogN) + C6(N+1) + C7(N) + C8(N) +C9(N) + C10(N) + C11(NlogN) +C12
		     = (C5 +C11)NlogN + (C2 + C3 + C4 + C6 + C7 + C8 + C9 + C10 )N + (C1 + C2 + C3 + 1/2(C5 +C11) + C6 + C12)

Making this a logarithmic equation **A(NlogN) + BN + C** which has time complexity of **O(NlogN)**.

---


## Huffman Decoding

```
Function huffmanDecode(root, S)  
                                                               Cost         Time
1   n = S.size                                                  C1            1  
2   current = root                                              C2            1
3   for i=1 to n                                                C3           N+1
4      if(s[i] == '0')                                          C4            N 
5         current = current.left                                C5            N
6      else                                                      
7         current = current.right                               C6            N  
8      if(current.left == NULL and current.right == NULL        C7            N 
9         decodedString += current.data                         C8            N 
10        current = root                                        C9            N 
11  return decodedString                                        C10           1

```
### Analysis

---
The Ruuning time for this algorithm is sum of all the  individual steps invloved in this algorithm which compute and tells 
time T(n).

     T(n) = C1 + C2 + C3(N+1) + C4(N)+ max(C5,C6)N + C7(N) + C8(N) + C9(N) + C10 

In the above expression we can see that this is just a basic loop iterating for n. In this code we can see line 1 & 2 will run at constant time
and every other statement will run for N times except the loop statement which will run for N+1 times to check for the terminating condition as well. At line 5 & 7 only one of them will run so we will take the maximum of those statement.

---

#### Best Case

---
For optimal condtion we would consider that the string is small and the line 9 & 10 never run or run for fewer time in this loop. In this way the time complexity we get is as follow

	  T(n) = (C3 + C4 + C7 + max(C5,C6) + C8 + C9)N + (C1 + C2 + C3 + C10)
	  
Making this a linear function **AN + B** and running time of **O(N)**.

---

#### Worst Case

---
In worst case the whole loop will run and possibly in revery iteration loop will go through line 9 & 10.
So the time complexity is

        T(n) = (C3 + C4 + C7 + max(C5,C6))N + (C1 + C2 + C3 + C10)

This time complexity also shows that this code at its worst condition will still show behaviour of linear equation **AN + B** therefore
the running time will be **O(n)**. Its best case running time and worst Case running time has same time has same big-O notation of O(n).

---

## LZW Encoding

```
Function lzwEncode(C)  
									
1   Initialize dictionary
2   string s = C[1]  
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

| Line | Cost | Times |
|:----:|:----:|:-----:|
| 1    | C1   | Nx1=N |
| 2    | C2   | 1     |
| 3    | C3   | 1     |
| 4    | C4   | N+1   |
| 5    | C5   | N     |
| 6    | C6   | N     |
| 7    | C7   | N     |
| 9    | C8   | N     |
| 10   | C9   | N     |
| 11   | C10  | N     |
| 14   | C11  | 1     |
| 15   | C12  | 1     |

### Analysis

#### Choice of Data Structure for Optimizing Algortihm

---

The point of interest in this function is that we have to store a dictionary in some sort of a data structure. For choosing the
best data structure, we first analyse it and see the requirements. As seen in lines `1,6,9,10,14` we are using **insert** and **search**
functions. If we use a data structure that offers **linear** insertion and search, we will have an optimized time complexity.

Consider the following example, if we simply use an array for this purpose, which has O(N) for insertion and deletion, then the worst case 
complexity for the line 6 will be NxN. Taking the overall complexity to O(N^2). Thats why, we employ either a **hash table** or a **trie** 
which have O(1) complexity for insertion and deletion. Our choice reduces the overall complexity to **O(N)** which is a major improvement over 
O(N^2). That is why, in these following lines 1,6,9,10,14 we have dealt it as linear time.

Coming back to analysis we can see that the line 1 has running time N because a new data structure of dictionary is being applied here therefore it will take N time. As for the rest of the code we see that line 2,3,14,15 are out of loop so they are executed constant time and any other line in loop will be executed for N times except for the line 7 & 9,10 which will have runtime of max(C7,(C9+C10+C11)) because its in if condition so there is only one case will run at each iteraion so the time is T(N).

``` T(n) = (C1 + C4 + C5 + C6 + max(C7,(C9+C10+C11)))N + (C2 + C3 +C4 + C11 + C12)```

---

#### Best Case
---
In best case the next character will almost already exist in dictionary so in that case it wont have to add a new character in dictionary rather than increment it. So

``` T(n) = (C1 + C4 + C5 + C6 + C7)N + (C2 + C3 + C4 + C11 + C12)```

In this way we can see that the it is behaving like a linear function **An + B** having running time **O(n)**.

---
### Worst Case
---
In the worst case we will see that every new character will be added into the dictionary as a new character and it will not exist more than once. So in this case running time is 

``` T(n) = (C1 + C4 + C5 + C6 + C9 + C10 + C11)N + (C2 + C3 + C4 + C11 + C12) ```

So in the worst case we can see that it is also behaving as a linear function **An + B** having running time **O(n)**.

---

## LZW Decoding

```
Function lzwDecode(S)  

1  Initialize table/dictionary with all characters
2  decoded = ""    
3  read a character k
4  decodedString = k 
5  w = k
6  while  read a character k     
7    if k exists in the dictionary
8        entry = dict(k) 
9        decodedString += entry 
10       add w + entry[0] to dictionary
11       w = entry
12   else
13       entry = w + firstCharacterOf(w)
14       decodedString += entry 
15       add entry to dictionary
16       w = entry;
17   end if
18 end while
19 return decodedString
```

| Line | Cost | Times |
|:----:|:----:|:-----:|
| 1    | C1   | Nx1=N |
| 2    | C2   | 1     |
| 3    | C3   | 1     |
| 4    | C4   | 1     |
| 5    | C5   | 1     |
| 6    | C6   | N+1   |
| 7    | C7   | N     |
| 8    | C8   | N     |
| 9    | C9   | N     |
| 10   | C10  | N     |
| 11   | C11  | N     |
| 13   | C12  | N     |
| 14   | C13  | N     |
| 15   | C14  | N     |
| 16   | C15  | N     |
| 19   | C16  | 1     |

#### Analysis

---
The Ruuning time for this algorithm is sum of all the  individual steps invloved in this algorithm which compute and tells 
time T(n). We will use a linear search and insert data structure such as a trie or hash table, making search and insert functions
costing linear time only.  

---

#### Best Case

---


---

#### Worst Case

---

