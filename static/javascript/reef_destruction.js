var seconds = 0;
var dead_reefs_per_sec = 250;
var interval = 2000;

function incrementSeconds() {
    interval = 1000;
    var el = document.getElementById('dead-coral-count');
    seconds += 1;
    el.innerText = dead_reefs_per_sec * seconds;
}

setInterval(incrementSeconds, 2000);