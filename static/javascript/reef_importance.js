var last_click = undefined;

function getCurrentRotation( img_id ) {
    var img = document.getElementById(img_id);
    var img_style = window.getComputedStyle(img, null);
    var curr_prop = img_style.getPropertyValue("transform");

    if( curr_prop !== "none") {
    console.log('Matrix: ' + curr_prop);

    var values = curr_prop.split('(')[1];
      values = values.split(')')[0];
      values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a*a + b*b);

    var radians = Math.atan2(b, a);
    if ( radians < 0 ) {
      radians += (2 * Math.PI);
    }
    var angle = Math.round( radians * (180/Math.PI));

  } else {
    var angle = 0;
  }

  return angle;
}

function rotateImg() {
    var timestamp = new Date();
    console.log("here");
    console.log(timestamp.getSeconds());
    if(last_click != undefined) {
        console.log(last_click.getSeconds());
    }

    if (last_click == undefined || timestamp.getMinutes() != last_click.getMinutes() ||
        timestamp.getSeconds() > (last_click.getSeconds() + 2)) {
        var curr_angle = getCurrentRotation("circular-text");
        var img = document.getElementById("circular-text");
        console.log(curr_angle);
        img.animate(
            [
                {
                    // from
                    transform: `rotate(${curr_angle}deg)`
                },
                {
                    // to
                    transform: `rotate(${curr_angle + 72}deg)`
                }
            ],
            { duration: 2000, fill: "forwards"}
        );
        last_click = new Date();
    }

}
