

with open("start_pos.txt", "r") as src_file:
    src = src_file.readlines()

elements = []
for line in range(len(src)):
    if "{" in src[line]:
        attributes = {}
        line += 1
        while "}" not in src[line]:
            attr = src[line].split(":")
            attributes.update({attr[0].strip(): attr[1].strip()[:-1:]})
            line += 1
        elements.append(attributes)
print(elements)

with open("formatted_positions.txt", "w") as output:
    for elem in range(len(elements)):
        s = "\n" if elem % 3 == 0 else ""
        output.write(s + f"{str(elements[elem])}" + ", " )

