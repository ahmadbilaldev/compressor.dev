#include <iostream>
using namespace std;

class Node
{
public:
    int frequency;
    char letter;
    Node* left, * right;
    Node()
    {
        frequency = 0;
        left = right = NULL;
    }
    Node& operator = (const Node& obj)
    {
        this->left = obj.left;
        this->right = obj.right;
        this->letter = obj.letter;
        this->frequency = obj.frequency;
        return *this;
    }
    
};
struct inputLetters 
{
    Node** nodeArray;
    int* freqArray;
    char* letterArray;
    int totalChar;
};

struct twoArrayMinimums {
    int minimum;
    int secondMinimum;
};

Node**& nodeListCreator(int* letterFreq, char* letters,int totalChars)
{
    Node** ptr = new Node*[totalChars];
    for (int i = 0; i < totalChars; i++)
    {   
        ptr[i] = new Node();
        ptr[i]->frequency = letterFreq[i];
        ptr[i]->letter = letters[i];

    }
    return ptr;
}

void swapNode(Node*& ptr1, Node*& ptr2)
{
    Node* temp = new Node();
    temp = ptr1;
    ptr1 = ptr2;
    ptr2 = temp;
}

void nodeListSorter(Node**& arr, int arrLen)
{
    for (int i = 0; i < arrLen-1; i++)
    {
        int highestElement = i;
        for (int j = i + 1; j < arrLen; j++)
        {
            if (arr[j]->frequency > arr[highestElement]->frequency)
            {
                highestElement = j;
            }
            
        }
        swapNode(arr[highestElement], arr[i]);
    }
}

twoArrayMinimums extractMinFreq(Node** arr,int arrLen)
{
    int min = -1;
    int secondMin = -1;
    if (arrLen > 1)
    {
        for (int i = 0; i < arrLen; i++)
        {
            int  pivot = i;
            for (int j = 0; j < arrLen; j++)
            {
                if (arr[j]->frequency < arr[pivot]->frequency)
                {
                    if (min == -1)
                    {
                        min = j;
                        if (secondMin == -1)
                        {
                            secondMin = pivot;
                        }
                    }
                    else
                    {
                        if (arr[min]->frequency > arr[j]->frequency)
                        {
                            secondMin = min;
                            min = j;
                        }
                        else if (arr[min]->frequency != arr[j]->frequency)
                        {
                            if (secondMin == -1)
                            {
                                secondMin = j;
                            }
                            else if (arr[secondMin]->frequency > arr[j]->frequency)
                            {
                                secondMin = j;
                            }
                        }
                    }

                }
                else if (arr[j]->frequency > arr[pivot]->frequency)
                {
                    if (secondMin == -1)
                    {
                        secondMin = j;
                    }
                    else if (arr[secondMin]->frequency > arr[j]->frequency && arr[min]->frequency != arr[j]->frequency)
                    {
                        secondMin = j;
                    }
                }

            }

        }
    }
    else
    {
        min = 0;
        secondMin = 0;
    }
    twoArrayMinimums newMin;
    newMin.minimum = min;
    newMin.secondMinimum = secondMin;
    return newMin;
}

void insertNode(Node** ptr,Node* &newNode, int index)
{
    *ptr[index] = *newNode;
}

Node*& huffPuff(int totalChar,Node **&ptr)
{
    for (int i = 0; i <totalChar-1; i++)
    {
        Node *z = new Node();
        Node* x = new Node();
        Node* y = new Node();
        twoArrayMinimums newMins = extractMinFreq(ptr,totalChar-i);
        x = ptr[newMins.minimum];
        y = ptr[newMins.secondMinimum];
        z->left = x;
        z->right = y;
        z->frequency = x->frequency + y->frequency;

        insertNode(ptr, z, totalChar - i - 2);
        nodeListSorter(ptr, totalChar - i - 1);

        for (int j = 0; j < totalChar - i - 1; j++)
        {
            cout << ptr[j]->frequency << " -- " << ptr[j]->letter << endl;
        }
        cout << endl << endl;

       

    }
    twoArrayMinimums rootMin = extractMinFreq(ptr, totalChar-3);
    Node* rootPtr = new Node();
    *rootPtr = *ptr[0];
    return rootPtr;
}


int main()
{
    char letters[5] = { 'e','c','b','d','f' };
    int frequency[5] = { 4,8,9,2,10};
    inputLetters testInputs;
    testInputs.totalChar = (sizeof(letters) / sizeof(*letters));
   
    Node** testPtr;
    testPtr = nodeListCreator(frequency, letters, testInputs.totalChar);
    
    nodeListSorter(testPtr,testInputs.totalChar);

    Node* rootNode = new Node();
    rootNode = huffPuff(testInputs.totalChar, testPtr);
    cout << rootNode->frequency;

}

