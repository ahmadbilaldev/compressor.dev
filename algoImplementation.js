class node
{
   contructor(freq = 0,letter = null)
   {
       this.freq = freq;
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
        if(head == null)
        {
            head = node1;
            node1.next = null;
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
newQueue = new priority_queue();
newQueue.push(n1);
newQueue.print();