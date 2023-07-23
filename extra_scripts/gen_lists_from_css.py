

with open("start_pos.txt", "r") as src_file:
    src = src_file.readlines()

locations = [line.strip() for line in src if "top:" in line or "left:" in line]
ids = [line.strip()[1:-1:] for line in src if "vec" in line]
print(ids)

start_loc = []
for i in range(0, len(locations), 2):
    top = locations[i].split(":")
    left = locations[i+1].split(":")
    start_loc.append({ top[0].strip(): top[1].strip(), left[0].strip(): left[1].strip() })

print(start_loc)

