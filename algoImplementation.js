class node
{
   constructor(frequency,letter)
   {
       this.nodeFreq = frequency;
       this.nodeChar = letter;
       this.code = -1;
       this.next = null;
       this.left = null;
       this.right = null;
   } 
}
class priority_queue
{
    contructor()
    {
        this.head = null;
        this.tail = null;
    }
    push(node1)
    {
        if(this.head == null)
        {
            this.head = node1;
            node1.next = null;
            this.tail = node1;
            this.head.next = null;
        }
        else if(this.head.nodeFreq < node1.nodeFreq)
        {
            node1.next = this.head;
            this.head = node1;
        }
        else if(this.tail.nodeFreq >= node1.nodeFreq)
        {
            this.tail.next = node1;
            this.tail = node1;
            this.tail.next = null;
        }
        else
        {
            var bptr,rptr = null;
            rptr = bptr = this.head;
            while(rptr.nodeFreq >= node1.nodeFreq)
            {
                bptr = rptr;
                rptr = rptr.next;
            }
            node1.next = rptr;
            bptr.next =  node1;
        }
        
    }
    pop()
    {
        var ptr = this.head;
        var retNode = null;
        if(ptr.next != null)
        {
            while(ptr.next.next != null)
            {
               ptr = ptr.next;
            }
        this.tail = ptr;
        retNode = ptr.next;
        this.tail.next = null;
        }
        else if(ptr.next == null)
        {
            retNode = ptr;
            this.head = null;
            this.tail = null;
        }
        else if(ptr == null)
        {
            return retNode;
        }
        return retNode;
    }

    print()
    {
        
        var ptr = this.head;
        while(ptr != null)
        {
            console.log(ptr.nodeFreq,ptr.nodeChar);
            ptr = ptr.next;
        }
    }
}

class mainInform
{
    constructor()
    {
        this.totalChar = [];
        this.totalFreq = [];
}   }


function huffmann(informSet)
{
    console.log("In the Huffman");
    size = informSet.totalFreq.length;
    Q1 = new priority_queue();
    let n = [];
    for (let i = 0; i < size; i++)
    {
        n[i] = new node(informSet.totalFreq[i],informSet.totalChar[i]);
        Q1.push(n[i]);
    }

    for(let i = 0; i<size-1;i++)
    {
        z = new node();
        var x = null;
        var y = null;
        z.left = x = Q1.pop();
        z.right = y = Q1.pop();
        z.nodeFreq = x.nodeFreq + y.nodeFreq;
        x.next = null;
        y.next = null;
        Q1.push(z);
    }
    treePtr = Q1.head;
    return treePtr;
}
function treeTraversal(rootPtr)
{
    if(rootPtr != null)
    {
        treeTraversal(rootPtr.left);
        if(!rootPtr.left && !rootPtr.right)
        {
            console.log(rootPtr.nodeFreq,rootPtr.nodeChar,rootPtr.code);
        }
        treeTraversal(rootPtr.right);
    }
}
function codeAssigner(rootNode, s = '')
{
    if(rootNode)
    {
        if(rootNode.left !== null)
        {
           codeAssigner(rootNode.left, s +'0');
        }    
        else
        {
            codeAssigner(rootNode.left, s);
        }
        
        if(!rootNode.left && !rootNode.right)
        {
            rootNode.code = s;
        }
        
        if(rootNode.right !== null)
        {
            codeAssigner(rootNode.right, s +'1');
        }
        else
        {
            codeAssigner(rootNode.right, s);
        }
    }
}
console.log("Working");
newInformSet = new mainInform();
newInformSet.totalChar = ['a','b','e','f','z'];
newInformSet.totalFreq = [11,23,1,1,8];
mainPtr = huffmann(newInformSet);
codeAssigner(mainPtr);
treeTraversal(mainPtr);