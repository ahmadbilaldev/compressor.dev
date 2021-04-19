<h4 align="center">
        <img src="https://github.com/ahmadbilaldev/compressor.dev/blob/master/public/img/compressor.jpg" alt="compressor.dev" />
    <br>
    <br> 
 Fast and Efficient Compression and Decompression based on LZW + Huffman algorithm. 
<br>
</br>


## How To Use 

1. Use the deployed version: [**compressor.dev**](https://compressor-dev.herokuapp.com/) (Note: Processing may be slower due to the free plan.)

2. Use the local server. To use this project, make sure you have node and npm installed. If not, then follow the relevant guides for your operating system. Once they are installed, open your terminal and follow these steps to install this project:

- First, open your terminal and clone this repository. 
```sh
git clone https://github.com/ahmadbilaldev/compressor.dev
```

- Navigate to the cloned repository: 
```sh
cd compressor.dev/
```

- Now, run the following command and wait until it is completed: 
```sh
npm install
```

- Finally run the following command in the terminal: 
```sh
node server.js
```

- The server will be started. Go to your browser and open http://localhost:3000/

- You can use the sample file given in the sample folder [here](https://github.com/ahmadbilaldev/compressor.dev/tree/master/sample)

<h4 align="center"><img width="837" alt="Screenshot 2021-04-19 at 1 39 22 PM" src="https://user-images.githubusercontent.com/19692245/115207052-aaafd500-a114-11eb-86b8-fc6839a80026.png">

## Details

This project is mainly based on Huffman Compression Algorithm that is a greedy lossless compression algorithm. But to take it one step further we used a subroutine algorithm LZW (Lempel-Ziv-Welch) Compression algorithm. This algorithm is also a lossless compression algorithm that uses a greedy approach. Although Huffman algorithm would have been enough but to increase its efficiency and compression rate, we have used LZW as a secondary subroutine algorithm, So, when a user provides an input file, LZW is implemented on it firstly and then Huffman is used on it for compression.

LZW basically reduces the duplication of data in input which means that by the time data reaches Huffman it has already been reduced to a certain size. Then Huffman runs on the compressed input given by LZW and gives each letter/segment of input a certain code that is not a prefix of any other code. And at the end, the output we receive is greatly smaller than input and the duo of these two algorithms is better than both of the algorithms if used separately.


## Pseudo Code

The pseudo code can be viewed [here](/algo/pseudo.md).

## Time Complexity and Correctness Analysis

The time complexity analysis can be viewed [here](/algo/timeComplexity.md).

