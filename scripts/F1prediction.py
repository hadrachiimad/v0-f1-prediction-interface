import random


#first list made of 20 f1 drivers
f1_drivers= [
    "Oscar Piastri",
    "Lando Norris",
    "Charles Leclerc",
    "Lewis Hamilton",
    "George Russell",
    "Kimi Antonelli",
    "Max Verstappen",
    "Yuki Tsunoda",
    "Alexander Albon",
    "Carlos Sainz",
    "Lance Stroll",
    "Fernando Alonso",
    "Liam Lawson",
    "Isack Hadjar",
    "Nico Hülkenberg",
    "Gabriel Bortoleto",
    "Esteban Ocon",
    "Oliver Bearman",
    "Pierre Gasly",
    "Franco Colapinto",
]
starting_place = list(range(1, 21))

def start_race():
    begining_race=[]
    drivers=f1_drivers
    position=starting_place

    random.shuffle(position)
    begining_race=list(zip(drivers,position))

    return begining_race

def end_race():
    final_race=[]
    drivers=f1_drivers
    position_end=starting_place

    random.shuffle(position_end)
    final_race=list(zip(drivers,position_end))
    return final_race


starting_positions = start_race()
print("Starting positions:")
for driver, position in starting_positions:
    print(position, driver)


user_bet = input("Bet on the driver you think will win: ")


results = end_race()


sorted_results = sorted(results, key=lambda x: x[1])


winner1 = sorted_results[0][0]  
winner2 = sorted_results[1][0]  
winner3 = sorted_results[2][0]  

print("1st:", winner1)
print("2nd:", winner2)
print("3rd:", winner3)
print("\nThe race is finished!")
print("Winner:", winner1)


if user_bet.strip().lower() == winner1.lower():
    print("Congratulations! You guessed correctly.")
else:
    print("Sorry, you lost your bet.")
    print("You chose:", user_bet)
    print("The actual winner was:", winner1)
    



#print("Starting position are: "+start_race())
#print("Final positions are: "+end_race())
#print("The winner is: "+end_race[0]+", Seconde place is: "+end_race[1]+"Third place is: "+end_race[2])
