


def str_field_name_and_value(attribute, plus = 0):
    pieces = attribute.split(":")
    return f"{pieces[0]}: {float(pieces[1].strip()[:-2:]) + plus}px"


with open("start_pos.txt", "r") as src_file:
    src_html = src_file.readlines()

formatted_lines = [line.split("\"")[1] for line in src_html]
print(formatted_lines)

with open("vec_animation.css", "w") as output_file:
    for line_i in range(0, len(formatted_lines)):
        output_file.write(f"@keyframes red-vec-{line_i}-movement " + "{\n\tto {\n")
        attributes = formatted_lines[line_i].split(";")
        # output_file.write(f"\t\t{str_field_name_and_value(attributes[0].strip())};\n")  # width + 12
        # output_file.write(f"\t\t{str_field_name_and_value(attributes[1].strip())};\n")  # height + 3
        output_file.write(f"\t\t{str_field_name_and_value(attributes[2].strip())};\n")  # left
        output_file.write(f"\t\t{str_field_name_and_value(attributes[3].strip())};\n")  # top
        output_file.write(f"\t\ttransform: rotate(0deg);\n")  # rotation
        output_file.write("\t}\n}\n")