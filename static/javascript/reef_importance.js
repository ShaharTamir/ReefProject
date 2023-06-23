var last_click = undefined;
var circle_count = 0;
var curr_angle = 0;
var NORMAL = 0;
var BIG = 1;
var OP_ANGLE = 72;

function nextCircleCount() {
    return (circle_count + 1) % 5;
}

function prevCircleCount() {
    return circle_count - 1 == -1 ? 4 : circle_count - 1;
}

function changeCircleColor(is_prev) {
             //  teal       purple     green      orange     pink
    colors = [["#2FF7E1", "#EB7EFF", "#8DFF1A", "#E1870A", "#DD5B6E"], // lower left - blurred 1
              ["#01E0A5", "#8B52BD", "#21ED94", "#EF8901", "#F1778C"], // up center - blurred 2
              ["#2FF7E1", "#EB7EFF", "#8DFF1A", "#E1870A", "#DD5B6E"]  // lower right - blurred 3
             ]

    positions = [
                 [
                    {'left': '-65px', 'top':'609px'},
                    {'left': '150px', 'top':'800px'},
                    {'left': '125px', 'top':'570px'},
                    {'left': '-65px', 'top':'300px'},
                    {'left': '-65px', 'top':'609px'}
                 ],
                 [
                    {'left': '750px', 'top':'-10px'},
                    {'left': '1250px', 'top': '-5px'},
                    {'left': '1500px', 'top': '0px'},
                    {'left': '1000px', 'top': '-5px'},
                    {'left': '750px', 'top':'-10px'}
                 ],
                 [
                    {'right': '275px', 'bottom':'175px'},
                    {'right': '175px', 'bottom':'250px'},
                    {'right': '325px', 'bottom':'125px'},
                    {'right': '500px', 'bottom':'100px'},
                    {'right': '275px', 'bottom':'175px'}
                 ]
                ]

    circles = [
                 document.getElementById("blurred-1"),
                 document.getElementById("blurred-2"),
                 document.getElementById("blurred-3")
              ];
    new_index = is_prev ? prevCircleCount() : nextCircleCount();

    console.log("I'm changing color: ", circle_count);

    for(let i in circles) {
        circles[i].animate([{
                     background: colors[i][new_index]
                }
            ],
            { duration: 1000, fill: "forwards"}
        );
        circles[i].animate([
                positions[i][new_index]
            ],
            { duration: 2000, easing: "ease-in-out", fill: "forwards"}
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

    var new_op_index = is_prev ? prevCircleCount() : nextCircleCount()

    options[new_op_index].animate([{
                'width': '75px',
                'height': '75px'
            }
        ],
        { duration: 1000, fill: "forwards"}
    );

    options[new_op_index].animate([
        options_locations_per_size[BIG][new_op_index]],
        { duration: 1000, fill: "forwards"}
    );

    options[new_op_index].animate([{
                'filter': 'grayscale(0)',
            }
        ],
        { duration: 1000, fill: "forwards"}
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
            { duration: 2000, easing: "ease-in-out", fill: "forwards"}
        );
}

function rotateOptions(is_prev=false) {
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
        changeCircleColor(is_prev);
        changeMainOption(is_prev);
        if (is_prev) {
            circle_count = prevCircleCount();
            curr_angle -= OP_ANGLE;
        }
        else {
            circle_count = nextCircleCount();
            curr_angle += OP_ANGLE;
        }
        rotateElem("circular-text");
        rotateElem("options-ring");
        last_click = new Date();
    }

}
