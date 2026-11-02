a=int(input("enter a :"))
b=int(input("enter b :"))
op=input("enter operator :")
if op=="+":
    print(a+b)
elif op=="-":
    print(a-b)
elif op=="*":
    print(a*b)
elif op=="/":
    print(a/b)
elif op=="%":
    print(a%b)
elif op=="**":
    print(a**b)
else:
    print("invalid operator")   