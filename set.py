#a set stores unique values and is written using curly brackets{}.
numbers={0,1,2,3,4,5,6,7,8,9,9,7,5,3,1,0}
print(numbers)
print(len(numbers))
#repeted values are automatically removed from a set, so the length of the set is 10, not 16.
#sets are unordered, meaning the items have no index and do not change their order.
#you can loop through a set using a for loop:
for value in numbers:
    print(value)
#elements can be added to a set using the add() method:
numbers.add(10)
print(numbers)