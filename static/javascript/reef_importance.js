var last_click = undefined;
var circle_count = 0;
var curr_angle = 0;
var NORMAL = 0;
var BIG = 1;

function nextCircleCount() {
    return (circle_count + 1) % 5;
}

function prevCircleCount() {
    return circle_count - 1 == -1 ? 4 : circle_count - 1;
}

function changeCircleColor() {
    colors = [["#01E0A5", "#8B52BD", "#21ED94", "#EF8901", "#F1778C"],
              ["#2FF7E1", "#EB7EFF", "#8DFF1A", "#E1870A", "#DD5B6E"],
              ["#2FF7E1", "#EB7EFF", "#8DFF1A", "#E1870A", "#DD5B6E"]]

    var circles = [
                     document.getElementById("blurred-1"),
                     document.getElementById("blurred-2"),
                     document.getElementById("blurred-3")
                  ];

    console.log("I'm changing color: ", circle_count);

    for(let i in circles) {
        circles[i].animate([{
                     background: colors[i][nextCircleCount()]
                }
            ],
            { duration: 1000, fill: "forwards"}
        );
    }
}

function changeMainOption(is_prev) {
    options_ids = ["teal-op", "purple-op", "green-op", "orange-op", "pink-op"]
    options_locations_per_size = [
        [
            {'right': '225px', 'top': '-29px'}, /* teal */
            {'left': '-17px', 'top': '150px'}, /* purple */
            {'left': '80px', 'bottom': '17px'}, /* green */
            {'right': '80px', 'bottom': '17px'}, /* orange */
            {'right': '-17px', 'top': '150px'} /* pink */
        ],
        [
            {'right': '215px', 'top': '-42px'}, /* teal */
            {'left': '-30px', 'top': '135px'}, /* purple */
            {'left': '65px', 'bottom': '5px'}, /* green */
            {'right': '65px', 'bottom': '5px'}, /* orange */
            {'right': '-30px', 'top': '135px'} /* pink */
        ]
    ];

    options = options_ids.map( (i) => { return document.getElementById(i); } );

    options[circle_count].animate([{
                'filter': 'grayscale(1)',
                'width': '50px',
                'height': '50px'
            }
        ],
        { duration: 1000, fill: "forwards"}
    );

    options[circle_count].animate([
        options_locations_per_size[NORMAL][circle_count]],
        { duration: 1000, fill: "forwards"}
    );

    //var new_op_index = is_prev ? prevCircleCount() : nextCircleCount()

    options[nextCircleCount()].animate([{
                'width': '75px',
                'height': '75px'
            }
        ],
        { duration: 1000, fill: "forwards"}
    );

    options[nextCircleCount()].animate([
        options_locations_per_size[BIG][nextCircleCount()]],
        { duration: 1000, fill: "forwards"}
    );

    options[nextCircleCount()].animate([{
                'filter': 'grayscale(0)',
            }
        ],
        { duration: 3000, fill: "forwards"}
    );
}

function rotateElem(elem_id) {
    var elem = document.getElementById(elem_id);
    elem.animate(
            [
                {
                    // to
                    transform: `rotate(${curr_angle}deg)`
                }
            ],
            { duration: 2000, fill: "forwards"}
        );
}

function rotateOptions() {
    var con = document.getElementById("circular-text-container");
    var con_style = window.getComputedStyle(con, null);
    if(con_style.getPropertyValue("opacity") == 0) {
        return;
    }
    var timestamp = new Date();
    console.log("here");
    console.log(timestamp.getSeconds());
    if(last_click != undefined) {
        console.log(last_click.getSeconds());
    }

    if (last_click == undefined || timestamp.getMinutes() != last_click.getMinutes() ||
        timestamp.getSeconds() > (last_click.getSeconds() + 2)) {
        changeCircleColor();
        changeMainOption();
        circle_count = nextCircleCount();
        curr_angle += 72;
        rotateElem("circular-text");
        rotateElem("options-ring");
        last_click = new Date();
    }

}
