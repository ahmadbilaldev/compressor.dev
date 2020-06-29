# Huffman-Coding-App

For our project, that is File Compression Tool, we have decided to use a modified form of Huffman Coding Algorithm based on the greedy method. We researched to find the most suitable algorithm for our cause. Being one of the fastest algorithms for lossless compression, Huffman turned out to be our first choice. 

It is to be noted that we tried other algorithms, specially Arithmetic Coding since we did not want to be confined to our book. But we found that while Arithmetic Coding produces a better compression percentage however it is slower than Huffman Coding. Hence we selected Huffman Coding Algorithm. The time complexity of which is O(nlogn) for unsorted and O(n) for sorted data.

To cater for the needs of our project, and in order to consider the Bonus aspect of our project, we will have to modify the existing Huffman algorithm. So that it may merge the coding scheme file with the compressed file while still keeping in view the file size and time constraints. The current algorithm i.e., the one given in the book will need modifications to cater for this aspect. 

## Interfaces

Keeping in view the project needs, it needs a landing page where the user can simply upload files to encode/decode and download them. Hence the first interface is related to encoding and decoding.
