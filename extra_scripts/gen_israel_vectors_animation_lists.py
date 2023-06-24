"""
generate israel vectors positions at start and at end for animation - list of dict with left and top parameters.
used for JS animate function to move vectors back and forth.

to repeat process - mark all vectors in Figma at starting position and copy the generated code into start_pos.txt,
mark all vectors in Figma at ending position and copy the generated code into end_pos.txt.
It is recommended to group each vector, then flatten them before usage for more accurate positioning.
"""

LEFT = 2
TOP = 3
LINE_BREAK = 5

def str_field_name_and_value(attribute):
    pieces = attribute.split(":")
    return f"'{pieces[0]}': '{pieces[1].strip()}'"


def gen_positions_arr(formatted_html_line):
    for line in range(0, len(formatted_html_line)):
        attributes = formatted_html_line[line].split(";")
        s = "\n{ " if line % LINE_BREAK == 0 else "{ " # line_break defined in global scope
        output_file.write(s + f"{str_field_name_and_value(attributes[LEFT].strip())}, \
{str_field_name_and_value(attributes[TOP].strip())}" + " }, ")

    output_file.write("\n]\n\n[")

def extract_basic_format_html(filename):
    with open(filename, "r") as file:
        txt = file.readlines()
    return [line.split("\"")[1] for line in txt]

formatted_start_lines = extract_basic_format_html("start_pos.txt")
formatted_end_lines = extract_basic_format_html("end_pos.txt")

with open("formatted_positions.txt", "w") as output_file:
    output_file.write("[")


    gen_positions_arr(formatted_start_lines)
    gen_positions_arr(formatted_end_lines)

    # gen list of vectors ids
    for line in range(0, len(formatted_start_lines)):
        s = "\n" if line % (LINE_BREAK * 2) == 0 else ""
        output_file.write(s + f"'vector-{line}',")
    output_file.write("\n]\n\n")