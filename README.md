# Huffman Coding App

A web app for encoding and decoding using a modified Huffman Algorithm.

## Decision of Algorithm

For our project, that is File Compression Tool, we have decided to use a modified form of Huffman Coding Algorithm based on the greedy method. We researched to find the most suitable algorithm for our cause. Being one of the fastest algorithms for lossless compression, Huffman turned out to be our first choice. 

It is to be noted that we tried other algorithms, specially Arithmetic Coding since we did not want to be confined to our book. But we found that while Arithmetic Coding produces a better compression percentage however it is slower than Huffman Coding. Hence we selected Huffman Coding Algorithm. The time complexity of which is O(nlogn) for unsorted and O(n) for sorted data.

To cater for the needs of our project, and in order to consider the Bonus aspect of our project, we will have to modify the existing Huffman algorithm. We will use a combination of **Lempel–Ziv–Welch (LZW)** and **Huffman Coding**. This will make the compression much better as compared to using the Huffman Coding algortihm(given in the book) alone. 

## Interface

Keeping in view the project needs, it needs a landing page where the user can simply upload files to encode/decode and download them.

## Pseudo Code

You can view the pseudo code [here](/algo/pseudo.md).
