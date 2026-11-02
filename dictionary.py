marks={
    "maths": 90,
    "science": 80,  
    "english": 85,
    "physics": 95,
    "chemistry": 88
}
print(marks)
#accessing values
#use its key inside square brackets:[]
print(marks["maths"])
#adding new pairs to a dictionary
marks["history"]=75
print(marks)
#updating values in a dictionary
marks["maths"]=95
print(marks)
