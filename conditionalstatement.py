#conditional statements run code based on whether a condition is true or false.
#if condition
age =50
if age >=18:
    print("you are an  adult")
    print("you can vote")
#a colon : is required after the conditon, code inside then block must be indented.
#if else condition
age2 = 17
if age2 >=18:
     
 print("you can drive ")
else:
   print("you are not eligible to drive")
#if elif else condition
#use elif when you have multiple conditions to check.
age =int(input("enter your age:"))
if age > 90:
   print("your over aged")
elif age >=18:
   print("your are allowed to vote")
else:
   print("your are not eligible to vote")