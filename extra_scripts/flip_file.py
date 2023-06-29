
def flip_file(filename):
    with open(filename, "r") as file:
        lines = file.readlines()

    lines = lines[::-1]
    with open(filename, "w") as file:
        file.writelines(lines)

if __name__ == "__main__":
    flip_file("end_pos.txt")
