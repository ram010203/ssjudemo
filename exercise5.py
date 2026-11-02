#find the first number divisible by both inputs.
a=int(input("Enter the first number: "))
b=int(input("Enter the second number: "))
for number in range (1,10001):
    if number%a==0 and number%b==0:
        print("The first number divisible by both", a, "and", b, "is:", number)
        break