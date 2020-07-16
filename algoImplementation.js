class node
{
   constructor(frequency,letter)
   {
       this.freq = frequency;
       this.letter = letter;
       this.next = null;
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
        else if(this.head.freq < node1.freq)
        {
            node1.next = this.head;
            this.head = node1;
        }
        else if(this.tail.freq >= node1.freq)
        {
            this.tail.next = node1;
            this.tail = node1;
            this.tail.next = null;
        }
        else
        {
            var bptr,rptr = null;
            rptr = bptr = this.head;
            while(rptr.freq >= node1.freq)
            {
                bptr = rptr;
                rptr = rptr.next;
            }
            node1.next = rptr;
            bptr.next =  node1;
        }
        
    }

    print()
    {
        var ptr = this.head;
        while(ptr != null)
        {
            console.log(ptr.freq,ptr.letter);
            ptr = ptr.next;
        }
    }
}


console.log("Working");
n1 = new node(12,'e');
n2 = new node(15,'a');
n3 = new node(3,'y');
n4 = new node(18,'v');
n5 = new node(6,'w');
newQueue = new priority_queue();
newQueue.push(n1);
newQueue.push(n2);
newQueue.push(n3);
newQueue.push(n4);
newQueue.push(n5);
newQueue.print();