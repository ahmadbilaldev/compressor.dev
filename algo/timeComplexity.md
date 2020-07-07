# Time Complexity Analysis
## Huffman Encoding
    Function huffmanEncode(C)   

							                        Cost                 Times
    1   n = C.size    		           		         C1			            1
    2   Q = priority_queue()            		     C2			            N  

    3   for i = 1 to n		          		         C3			           N+1
    4     n = node(C[i]) 	                         C4                      N
    5     Q.push(n)				        	         C5			          N(logN)       
    6   end for

    7   while Q.size() is not equal to 1             C6			            N+1
    8      Z = new node()			      	 	     C7			             N
    9      Z.left = x = Q.pop			       	     C8			             N
    10     Z.right = y = Q.pop			             C9			             N
    11     Z.frequency = x.frequency + y.frequency   C10		             N
    12     Q.push(Z)        				         C11				  N(logN)
    13  end while
    14 Return Q                                      C12                      1

#### Analysis
The Ruuning time for this algorithm is sum of all the  individual steps invloved in this algorithm which compute and tells 
time T(n).

     T(n) = C1 + C2(N) + C3(N+1) + C4(N)+ C5[NlogN] + C6(N+1) + C7(N) + C8(N) + C9(N) + C10(N) + C1[NlogN] +   C12  

In the above expression we can see that on line 3 & 7 the loop executes for N+1 times because each loop executers N times plus 1 more time to check for the false condition or terminating condition. In the rest of the code the lines that are in body of loop gets executed for N times and outside the body executes for the Constant time except line 2 where time complexity is N because queue is initialized and a min-heap queue takes O(n) time for initializing and also all the lines in which push function of priority queue is called. In these lines we have considered the peiority queue to be implemented in min-heap because in this way we can perform each queue operation in O(logN) time so therfore each push statement will take NlogN time as it is implemented in a loop. But in some cases if the queue is implemented with the linked list it would take O(n) to insert a new node in queue.
#### Best Case
For optimal condtion we would consider that at line 5 & 12 the node will be inserted at its first iteration of loop or at the start of queue thus n = 1 and as we know log1 = 0 so the whole statement will be implemented in constant or O(0) time.

	  T(n) = (C2 + C3 + C4  + C6 + C7 + C8 + C9 + C10 )N + (C1 + C3 + C6 + C12)
	  
Making this a linear function **an + b** and running time of **O(n)**.
#### Worst Case
In worst case whole operation of insertion will run for total of n making the time be LogN and since it is runing in loop it will be executed for NlogN.
So

        T(n) = C1 + C2(N) + C3(N+1) + C4(N) + C5(NlogN) + C6(N+1) + C7(N) + C8(N) +C9(N) + C10(N) + C11(NlogN) +C12
		     = (C5 +C11)NlogN + (C2 + C3 + C4 + C6 + C7 + C8 + C9 + C10 )N + (C1 + C2 + C3 + 1/2(C5 +C11) + C6 + C12)

Making this a logarithmic equation **A(NlogN) + BN + C** which has time complexity of **O(NlogN)**.
