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


# -----------------------
# Money / Point system
# -----------------------
money = 100  # starting balance

while money > 0:
    print("\nYou have", money, "points.")

    # show starting grid
    starting_positions = start_race()
    print("\nStarting positions:")
    for driver, position in starting_positions:
        print(position, driver)

    user_bet = input("\nBet on the driver you think will win/podium: ")

    # ask what type of bet
    while True:
        bet_type = input("Do you want to bet on 'winner' or 'podium'? ").strip().lower()
        if bet_type in ["winner", "podium"]:
            break
        print("Invalid choice. Type 'winner' or 'podium'.")

    # ask for bet amount (with validation)
    while True:
        bet_amount = int(input("How many points do you want to bet? "))
        if bet_amount > money:
            print("Insufficient funds. You only have", money, "points.")
        elif bet_amount <= 0:
            print("Invalid bet amount. Must be greater than 0.")
        else:
            break  # valid bet, exit loop

    # run race
    results = end_race()
    sorted_results = sorted(results, key=lambda x: x[1])

    winner1 = sorted_results[0][0]  
    winner2 = sorted_results[1][0]  
    winner3 = sorted_results[2][0]  

    print("\n--- Race Results ---")
    print("1st:", winner1)
    print("2nd:", winner2)
    print("3rd:", winner3)

    # decide outcome
    if bet_type == "winner":
        if user_bet.strip().lower() == winner1.lower():
            winnings = bet_amount * 3
            money += winnings
            print("\nCongratulations! You guessed the winner correctly.")
            print("You won", winnings, "points.")
        else:
            money -= bet_amount
            print("\nSorry, you lost your bet.")
            print("You chose:", user_bet)
            print("The actual winner was:", winner1)

    elif bet_type == "podium":
        if user_bet.strip().lower() in [winner1.lower(), winner2.lower(), winner3.lower()]:
            winnings = bet_amount * 2
            money += winnings
            print("\nCongratulations! Your driver made the podium.")
            print("You won", winnings, "points.")
        else:
            money -= bet_amount
            print("\nSorry, your driver did not reach the podium.")
            print("You chose:", user_bet)
            print("The podium was:", winner1 + ", " + winner2 + ", " + winner3)

    print("Your new balance is:", money)

    # ask if player wants to continue
    if money > 0:
        choice = input("\nDo you want to play another race? (yes/no): ").strip().lower()
        if choice != "yes":
            break

print("\nGame over! Final balance:", money)
