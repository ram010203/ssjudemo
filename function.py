#range () generates a sequence of nnumber, commonly used with loops.
#numbers=range(10)
#print(numbers) #prints the range object
#the general syntex is:
#range(start,stop,step)
#start: is included
#stop: is excluded
#step: is the difference between each number in the sequence
#the default value of start is 0 and step is 1
range(0,10) #generates numbers from 0 to 9
range(1,10) #generates numbers from 1 to 9
range(1,10,2) #generates numbers from 1 to 9 with a step of 2
print(list(range(10))) #prints the list of numbers from 0 to 9