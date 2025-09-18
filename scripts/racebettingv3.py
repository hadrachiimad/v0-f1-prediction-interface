import random

# Drivers with their teams
f1_drivers = [
    ("Oscar Piastri", "McLaren"),
    ("Lando Norris", "McLaren"),
    ("Charles Leclerc", "Ferrari"),
    ("Carlos Sainz", "Ferrari"),
    ("Lewis Hamilton", "Mercedes"),
    ("George Russell", "Mercedes"),
    ("Kimi Antonelli", "Mercedes"),  # placeholder rookie
    ("Max Verstappen", "Red Bull"),
    ("Yuki Tsunoda", "RB"),
    ("Alexander Albon", "Williams"),
    ("Lance Stroll", "Aston Martin"),
    ("Fernando Alonso", "Aston Martin"),
    ("Liam Lawson", "RB"),
    ("Isack Hadjar", "RB"),
    ("Nico Hülkenberg", "Sauber"),
    ("Gabriel Bortoleto", "Sauber"),
    ("Esteban Ocon", "Alpine"),
    ("Pierre Gasly", "Alpine"),
    ("Oliver Bearman", "Ferrari"),
    ("Franco Colapinto", "Williams"),
]

starting_place = list(range(1, 21))

def start_race():
    positions = starting_place[:]
    random.shuffle(positions)
    return list(zip(f1_drivers, positions))

def end_race():
    positions = starting_place[:]
    random.shuffle(positions)
    return list(zip(f1_drivers, positions))

money = 100

while money > 0:
    print("\nYou have", money, "points.")

    starting_positions = start_race()
    print("\nStarting positions:")
    for (driver, team), position in starting_positions:
        print(position, "-", driver, "(", team, ")")

    bet_target = input("\nDo you want to bet on a driver or a team? (type 'driver' or 'team'): ").strip().lower()

    if bet_target == "driver":
        user_bet = input("Bet on the driver you think will win/podium: ").strip()
    elif bet_target == "team":
        user_bet = input("Bet on the team you think will win: ").strip()
    else:
        print("Invalid choice. Skipping this round.")
        continue

    while True:
        bet_type = input("Do you want to bet on 'winner' or 'podium'? ").strip().lower()
        if bet_type in ["winner", "podium"]:
            break
        print("Invalid choice. Type 'winner' or 'podium'.")

    while True:
        bet_amount = int(input("How many points do you want to bet? "))
        if bet_amount > money:
            print("Insufficient funds. You only have", money, "points.")
        elif bet_amount <= 0:
            print("Invalid bet amount. Must be greater than 0.")
        else:
            break

    results = end_race()
    sorted_results = sorted(results, key=lambda x: x[1])

    winner1 = sorted_results[0][0]
    winner2 = sorted_results[1][0]
    winner3 = sorted_results[2][0]

    print("\n--- Race Results ---")
    print("1st:", winner1[0], "(", winner1[1], ")")
    print("2nd:", winner2[0], "(", winner2[1], ")")
    print("3rd:", winner3[0], "(", winner3[1], ")")

    if bet_target == "driver":
        if bet_type == "winner":
            if user_bet.lower() == winner1[0].lower():
                winnings = bet_amount * 10
                money += winnings
                print("\nCongratulations! You guessed the winner correctly.")
                print("You won", winnings, "points.")
            else:
                money -= bet_amount
                print("\nSorry, you lost your bet.")
                print("You chose:", user_bet)
                print("The actual winner was:", winner1[0])
        elif bet_type == "podium":
            if user_bet.lower() in [winner1[0].lower(), winner2[0].lower(), winner3[0].lower()]:
                winnings = bet_amount * 7
                money += winnings
                print("\nCongratulations! Your driver made the podium.")
                print("You won", winnings, "points.")
            else:
                money -= bet_amount
                print("\nSorry, your driver did not reach the podium.")
                print("You chose:", user_bet)
                print("The podium was:", winner1[0], ",", winner2[0], ",", winner3[0])

    elif bet_target == "team":
        if bet_type == "winner":
            if user_bet.lower() == winner1[1].lower():
                winnings = bet_amount * 10
                money += winnings
                print("\nCongratulations! A driver from your team won.")
                print("You won", winnings, "points.")
            else:
                money -= bet_amount
                print("\nSorry, you lost your bet.")
                print("You chose team:", user_bet)
                print("The winning team was:", winner1[1])
        elif bet_type == "podium":
            if user_bet.lower() in [winner1[1].lower(), winner2[1].lower(), winner3[1].lower()]:
                winnings = bet_amount * 7
                money += winnings
                print("\nCongratulations! A driver from your team made the podium.")
                print("You won", winnings, "points.")
            else:
                money -= bet_amount
                print("\nSorry, no driver from your team reached the podium.")
                print("You chose team:", user_bet)
                print("The podium teams were:", winner1[1], ",", winner2[1], ",", winner3[1])

    print("Your new balance is:", money)

    if money > 0:
        choice = input("\nDo you want to play another race? (yes/no): ").strip().lower()
        if choice != "yes":
            break

print("\nGame over! Final balance:", money)
