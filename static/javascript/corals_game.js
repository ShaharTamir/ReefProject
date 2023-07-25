ANIMATION_MOVE = {duration: 1200, easing: "ease-in-out", fill: "forwards"};
BASE = 0;
TOP = 1;
ID = 0;
ANIM = 1;
BLUE = 0;
GREEN = 1;
PINK = 2;
FINISH = 3;

stage = BASE;
base_clicked = 0;

blue_base = {"top": "80px", "left": "520px"};
green_base = {"top": "115px", "left": "890px", "transform": "rotate(90deg)"};
pink_base = {"top": "120px", "right": "-1085px", "transform": "rotate(-50deg)"};
blue_on_pink = {"top": "-80px", "left": "454px", "opacity": 0};
green_on_pink = {"top": "19px", "left": "832px"};
blue_on_green = {"top": "-90px", "left": "450px", "opacity": 0};
pink_on_green = {"right": "-1085px"};
green_on_blue = {"top": "-34px", "left": "860px", "transform": "rotate(27deg)"};
pink_on_blue = {"top": "15px", "right": "-1090px"};


function BaseClicked(base_color) {
    data = [["s4-blue-part-base", [blue_base]], ["s4-green-part-base", [green_base]], ["s4-pink-part-base", [pink_base]]];
    screen_visible = window.getComputedStyle(document.getElementById("s4")).getPropertyValue("opacity");
    if(screen_visible == 1 && stage == BASE) {
        stage = TOP;
        element = document.getElementById(data[base_color][ID]);
        element.animate(data[base_color][ANIM], ANIMATION_MOVE);
        base_clicked = base_color;
        SetGlow(base_color);
    }
}

function TopClicked(top_color) {
    if(stage == TOP && top_color != base_clicked) {
        stage = BASE;
        switch (base_clicked) {
            case BLUE:
                if (top_color == GREEN) {
                    document.getElementById("s4-green-part-top").animate([green_on_blue], ANIMATION_MOVE);
                    document.getElementById(gtg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(gtf).animate([{"opacity": 0}], ANIMATION_MOVE);
                } else {
                    document.getElementById("s4-pink-part-top").animate([pink_on_blue], ANIMATION_MOVE);
                    document.getElementById(ptg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(ptf).animate([{"opacity": 0}], ANIMATION_MOVE);
                }
                break;
            case GREEN:
                if (top_color == BLUE) {
                    document.getElementById("s4-blue-part-top").animate([blue_on_green], ANIMATION_MOVE);
                    blue_on_green["opacity"] = 1;
                    document.getElementById("s4-blue-part-top-hidden").animate([blue_on_green], ANIMATION_MOVE);
                    blue_on_green["opacity"] = 0;
                    document.getElementById(btg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(btf).animate([{"opacity": 0}], ANIMATION_MOVE);
                } else {
                    document.getElementById("s4-pink-part-top").animate([pink_on_green], ANIMATION_MOVE);
                    document.getElementById(ptg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(ptf).animate([{"opacity": 0}], ANIMATION_MOVE);
                }
                break;
            case PINK:
                if (top_color == BLUE) {
                    document.getElementById("s4-blue-part-top").animate([blue_on_pink], ANIMATION_MOVE);
                    blue_on_pink["opacity"] = 1;
                    document.getElementById("s4-blue-part-top-hidden").animate([blue_on_pink], ANIMATION_MOVE);
                    blue_on_pink["opacity"] = 0;
                    document.getElementById(btg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(btf).animate([{"opacity": 0}], ANIMATION_MOVE);
                }
                else {
                    document.getElementById("s4-green-part-top").animate([green_on_pink], ANIMATION_MOVE);
                    document.getElementById(gtg).animate([{"opacity": 0}], ANIMATION_MOVE);
                    document.getElementById(gtf).animate([{"opacity": 0}], ANIMATION_MOVE);
                }
                break;
        }

        setTimeout(function(){ Restart() }, 5000);
        document.getElementById("s4-blur-0").animate(
            [{"transform": "scale(1.5)", "opacity": 0.4}],
            {duration: 2500, delay: 1000, iterations: 2, direction:"alternate"})
    }
}

function Restart() {
    ids = [
        "s4-blue-part-base", "s4-green-part-base", "s4-green-part-top",
        "s4-pink-part-base", "s4-pink-part-top"
    ];
    start_pos = [
        {"top": "-68px", "left": "118px"}, {"top": "30px", "left": "-16px", "transform": "rotate(0deg)"},
        {"top": "-50px", "left": "-42px", "transform": "rotate(0deg)"}, {"top": "102px", "right": "73px", "transform": "rotate(0deg)"},
        {"top": "39px", "right": "40px"}
    ];

    document.getElementById("s4-blue-part-top-hidden").animate([{"top": "0px", "left": "50px", "opacity": 0}], ANIMATION_MOVE);
    document.getElementById("s4-blue-part-top").animate([{"top": "-3px", "left": "50px", "opacity": 1}], ANIMATION_MOVE);

    elements =  ids.map(id => document.getElementById(id));
    for (e in elements) {
        elements[e].animate([start_pos[e]], ANIMATION_MOVE);
    }

    SetGlow(FINISH);
}

bbg = "blue-base-glow";
bbf = "blue-base-frame";
btg = "blue-top-glow";
btf = "blue-top-frame";
gbg = "green-base-glow";
gbf = "green-base-frame";
gtg = "green-top-glow";
gtf = "green-top-frame";
pbg = "pink-base-glow";
pbf = "pink-base-frame";
ptg = "pink-top-glow";
ptf = "pink-top-frame";


function SetGlow(base_color) {
    options = [[gtg, gtf, ptg, ptf], [btg, btf, ptg, ptf], [btg, btf, gtg, gtf]]

    if(base_color == FINISH) {
        off = [btg, btf, gtg, gtf, ptg, ptf];
        on = [bbg, bbf, gbg, gbf, pbg, pbf];

        for (i in off) {
            document.getElementById(off[i]).animate([{"opacity": 0}], ANIMATION_MOVE);
            document.getElementById(on[i]).animate([{"opacity": 1}], ANIMATION_MOVE);
        }
    } else {
        off = [bbg, bbf, gbg, gbf, pbg, pbf];
        for (i in off) {
            document.getElementById(off[i]).animate([{"opacity": 0}], ANIMATION_MOVE);
        }

        for (i in options[base_color]) {
           document.getElementById(options[base_color][i]).animate([{"opacity": 1}], ANIMATION_MOVE);
        }
    }
}
