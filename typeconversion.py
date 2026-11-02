#type conversion changes a value from one data type to another data type. In python, we can convert data types by using the following functions:
#int() - converts a value to an integer data type.  
#float() - converts a value to a float data type.
#str() - converts a value to a string data type.
#bool() - converts a value to a boolean data type.
age =input("enter your age:")
print("Your age is:", age)
print(type(age))
#input () returns a sting , so this produces an error
#print(age+1)
#convert it into an integer before performing a calculation
age1=int(input("enter your age:"))
age2=float(input("enter your age:"))
age3=str(input("enter your age:"))
age4=bool(input("i am above 18:"))
print("Your age is:", age1)
print(type(age1 ))
print("Your age is:", age2)
print(type(age2 ))
print("Your age is:", age3)
print(type(age3 ))
print("Your age is:", age4)
print(type(age4 ))