
current_screen=0;
reg_anime_settings = {duration: 1000, fill: "forwards"};
C2=0;
C3=1;
START=0;
MID=1;
END=2;
ON=1;

function navNext() {
    navigateTo(current_screen + 1);
}

function navigateTo(screen) {
    transitions = [
        [Nothing, OneTwo, OneThree, Four, OtherFive, OtherFiveMid, OtherFiveEnd],
        [TwoOne, Nothing, TwoThree, Four, OtherFive, OtherFiveMid, OtherFiveEnd],
        [ThreeOne, ThreeTwo, Nothing, Four, OtherFive, OtherFiveMid, OtherFiveEnd],
        [OtherOne, OtherTwo, OtherThree, Nothing, FourFive, OtherFiveMid, OtherFiveEnd],
        [OtherOne, OtherTwo, OtherThree, FiveFour, Nothing, FiveMid, FiveEnd],
        [OtherOne, OtherTwo, OtherThree, FiveFour, Five, Nothing, FiveEnd],
        [OtherOne, OtherTwo, OtherThree, FiveFour, Five, FiveMid, Nothing, OtherOne]
    ];
    console.log(`in __filename, curr: ${current_screen} to: ${screen}`);
    transitions[current_screen][screen]();
    // TODO: change colors in nav bar
    current_screen = screen % 7;
}

function Nothing() {
    console.log("nothing!");
}

function OneTwo() {
    s1 = document.getElementById('s1');
    s2 = document.getElementById('s2');
    s3 = document.getElementById('s3');

    s3.style.transform = "scale(0.3)";
    s3.style.top = "200px";
    s3.style.left = "700px";

    s1.animate([{"transform": "scale(1.5)", "opacity": 0}], reg_anime_settings);
    s2.animate([{"transform": "scale(1)", "left": 0, "top": 0,"opacity": 1}], reg_anime_settings);
    s3.animate([{"transform": "scale(0.5)", "left": "400px", "opacity": 0.4}], {duration: 1200, fill: "forwards"});

    TurnOffOnContent(C2, ON)
}

function TwoThree() {
    s2 = document.getElementById('s2');
    s3 = document.getElementById('s3');

    s2.animate([{"transform": "scale(1.5)", "left": "-400px", "top": "-200px", "opacity": 0}], reg_anime_settings);
    s3.animate([{"transform": "scale(1)", "top": "0px", "left": "0px", "opacity": 1}], reg_anime_settings);
    TurnOffOnContent(C3, ON);
}

function OneThree() {
    OneTwo();
    TwoThree();
}

function TwoOne() {
    s1 = document.getElementById('s1');
    s2 = document.getElementById('s2');
    s3 = document.getElementById('s3');

    s1.style.transform = "scale(1.5)";
    s2.animate([{"transform": "scale(0.5)", "left": "-300px", "top": 0, "opacity": 0.4}], reg_anime_settings);
    s3.animate([{"transform": "scale(0.3)", "left": "700px", "opacity": 0}], reg_anime_settings);
    s1.animate([{"transform": "scale(1)", "opacity": 1}], reg_anime_settings);
    TurnOffOnContent(C2);
}

function ThreeTwo() {
    s2 = document.getElementById('s2');
    s3 = document.getElementById('s3');

    c2 = document.getElementById("c2-container");
    c2.style.opacity = 1;

    s3.animate([{"transform": "scale(0.5)", "left": "400px", "top": "200px", "opacity": 0.4}], reg_anime_settings);
    s2.animate([{"transform": "scale(1.5)", "left": "-400px", "top": "-200px","opacity": 0},
                {"transform": "scale(1)", "left": 0, "top": 0,"opacity": 1}], reg_anime_settings);

    TurnOffOnContent(C3);
}

function ThreeOne() {
    ThreeTwo();
    TwoOne();
}

function Four() {
    TurnFivesOff()
    FadeNav(current_screen, 3);
}

function FourFive() {
    TurnOffOnContent(2, 1);
    s4 = document.getElementById("s4");
    s5 = document.getElementById("s5");
    s4.animate([{"opacity": 0}], reg_anime_settings);
    s5.animate([{"opacity": 1}], reg_anime_settings);
    FitS5Corals(true);
}

function FiveFour() {
    TurnFivesOff()
    s4 = document.getElementById("s4");
    s5 = document.getElementById("s5");
    s4.animate([{"opacity": 1}], reg_anime_settings);
    s5.animate([{"opacity": 0.4}], reg_anime_settings);
    FitS5Corals();
}

function Five() {
    ChangingFives(START);
}

function FiveMid() {
    ChangingFives(MID);
}

function FiveEnd() {
    ChangingFives(END);
}

function OtherOne() {
    current_screen = current_screen > 4 ? 4 : current_screen;
    TurnOffOnContent(C2);
    TurnOffOnContent(C3);
    FadeNav(current_screen, 0);
}

function OtherTwo() {
    current_screen = current_screen > 4 ? 4 : current_screen;
    TurnOffOnContent(C2, ON);
    TurnOffOnContent(C3);
    FadeNav(current_screen, 1);
}

function OtherThree() {
    current_screen = current_screen > 4 ? 4 : current_screen;
    TurnOffOnContent(1, 1);
    FadeNav(current_screen, 2);
}

function OtherFive() {
    FadeNav(current_screen, 4);
    c5 = [document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")];
    c5[0].animate([{"opacity": 1}], reg_anime_settings);
    c5[1].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    c5[2].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    FitS5Corals(true);
}

function OtherFiveMid() {
    FadeNav(current_screen, 4);
    c5 = [document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")];
    c5[0].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    c5[1].animate([{"opacity": 1}], reg_anime_settings);
    c5[2].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    FitS5Corals(true);
}

function OtherFiveEnd() {
    FadeNav(current_screen, 4);
    c5 = [document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")];
    c5[0].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    c5[1].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    c5[2].animate([{"opacity": 1}], reg_anime_settings);
    FitS5Corals(true);
}

function ChangingFives(dest) {
    src = current_screen - 4;

    c5 = [document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")];
    c5[src].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    c5[dest].animate([{"opacity": 1}], reg_anime_settings);
}

function TurnFivesOff() {
    c5 = [document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")];
    for(c in c5) {
        c5[c].animate([{"opacity": 0}], {duration: 500, fill: "forwards"});
    }
}

function TurnOffOnContent(c, off_on=0) {
    contents = [
        document.getElementById("c2-container"), document.getElementById("c3-container"),
        document.getElementById("c5-0"), document.getElementById("c5-1"), document.getElementById("c5-2")
    ];

    contents[c].animate([{"opacity": off_on}], reg_anime_settings);
}

function FadeNav(src, dest) {
    ++src;
    ++dest;
    src_elem = document.getElementById(`s${src}`);
    dest_elem = document.getElementById(`s${dest}`);

    screen_backgrounds = [
        [{"opacity": 0, "transform": "scale(0.5)", "top": "0px", "left": "-300px"}, {"opacity": 0.4, "transform": "scale(0.5)", "top": "0px", "left": "-300px"}], // s2 bg for s1
        [{"opacity": 0, "transform": "scale(0.5)", "top": "200px", "left": "400px"}, {"opacity": 0.4, "transform": "scale(0.5)", "top": "200px", "left": "400px"}], //s3 bg for s2
        [{}],
        [{"opacity": 0.4}] //s5 bg for s4
    ];

    console.log(`src: ${src}, dest: ${dest}`)

    src_elem.animate(
        [{"opacity": 0}],
        { duration: 1000, fill: "forwards"}
    );
    if(src < 5) {
        src_bg_elem = document.getElementById(`s${src+1}`);
        src_bg_elem.animate(
            [{"opacity": 0}],
            { duration: 1000, fill: "forwards"}
        );
    }
    dest_elem.animate([
        {
            "background": "black",
            "transform": "scale(1)",
            "left": 0,
            "top": 0,
            "opacity": 0
        },
        {
            "opacity": 1,
            "transform": "scale(1)",
            "left": 0,
            "top": 0,
        }
    ], { duration: 1000, fill: "forwards"}
    );

    if(dest < 5) {
        dest_bg_elem = document.getElementById(`s${dest+1}`);
        dest_bg_elem.animate( screen_backgrounds[dest - 1], { duration: 1000, fill: "forwards"});
    }
}

function FitS5Corals(in_out=false) {
    right_in = "1920px";
    bottom_in = "1080px";
    right_out = "1150px";
    bottom_out = "620px";
    sides = [document.getElementById("s5-top-right"), document.getElementById("s5-bottom-right"),
             document.getElementById("s5-top-left"), document.getElementById("s5-bottom-left")];

    in_anim = [
        [{"transform": "scale(1)", "right": right_in}], [{"transform": "scale(1)", "right": right_in, "bottom": bottom_in}],
        [{"transform": "scale(1)"}], [{"transform": "scale(1)", "bottom": bottom_in}]
    ];

    out_anim = [
        [{"transform": "scale(0.6)", "right": right_out}], [{"transform": "scale(0.6)", "right": right_out, "bottom": bottom_out}],
        [{"transform": "scale(0.6)"}], [{"transform": "scale(0.6)", "bottom": bottom_out}]
    ]

    if(in_out) {
        for(side in sides) {
            sides[side].animate(in_anim[side], reg_anime_settings);
        }
    } else {
        for(side in sides) {
            sides[side].animate(out_anim[side], reg_anime_settings);
        }
    }
}

function ColorS5Corals() {
    base_elems = document.getElementsByClass("s5-base");
    vec_elems = document.getElementsByClass("s5-vec");

    if(current_screen == 5) {   // is white -> color back on
        
    } else {


    }
}

vec_ids = [
   'btr-vec-0', 'ptr-vec-0', 'ptr-vec-1', 'ptr-vec-2', 'ptr-vec-3', 'ptr-vec-4', 'ptr-vec-5',
   'ptr-vec-6', 'otr-vec-0', 'gm-vec-0', 'gm-vec-1', 'gm-vec-2', 'gm-vec-3', 'gm-vec-4',
   'gm-vec-5', 'bbr-vec-0', 'bbr-vec-1', 'bbr-vec-2', 'bbr-vec-3', 'bbr-vec-4', 'pb-vec-0',
   'pb-vec-1', 'pb-vec-2', 'pb-vec-3', 'pb-vec-4', 'pb-vec-5', 'pb-vec-6', 'pb-vec-7', 'pb-vec-8',
   'pb-vec-9', 'pb-vec-10', 'pb-vec-11', 'pb-vec-12', 'pb-vec-13', 'pb-vec-14', 'pb-vec-15',
   'gr-vec-0', 'gr-vec-1', 'gr-vec-2', 'gr-vec-3', 'gr-vec-4', 'gr-vec-5', 'gr-vec-6', 'gr-vec-7',
   'gr-vec-8', 'pt-vec-0', 'pt-vec-1', 'pt-vec-2', 'pt-vec-3', 'pt-vec-4', 'pt-vec-5', 'pt-vec-6',
   'pt-vec-7', 'pt-vec-8', 'btl-vec-0', 'btl-vec-1', 'btl-vec-2', 'otl-vec-0', 'otl-vec-1',
   'otl-vec-2', 'obl-vec-0', 'obl-vec-1', 'gl-vec-0', 'gl-vec-1', 'gl-vec-2', 'gl-vec-3', 'gl-vec-4',
   'gl-vec-5', 'pbl-vec-0', 'pbl-vec-1', 'pbl-vec-2', 'pbl-vec-3', 'pbl-vec-4', 'pbl-vec-5',
   'bbl-vec-0', 'bbl-vec-1', 'bbl-vec-2'
];

vec_start_pos = [
    {'top': '150px;', 'left': '45px;', 'transform': 'rotate(0)'}, {'top': '-56.29px;', 'left': '1511.61px;', 'transform': 'rotate(0)'},
    {'top': '330.12px;', 'left': '122.69px;', 'transform': 'rotate(0)'}, {'top': '233.01px;', 'left': '2.92px;', 'transform': 'rotate(0)'},
    {'top': '322.06px;', 'left': '144.2px;', 'transform': 'rotate(0)'}, {'top': '346.01px;', 'left': '157.27px;', 'transform': 'rotate(0)'},
    {'top': '126.64px;', 'left': '112.71px;', 'transform': 'rotate(0)'}, {'top': '264.8px;', 'left': '91.55px;', 'transform': 'rotate(0)'},
    {'top': '186.83px;', 'left': '109.17px;', 'transform': 'rotate(0)'}, {'top': '186.86px;', 'left': '1725.91px;', 'transform': 'rotate(0)'},
    {'top': '164px;', 'left': '93.26px;', 'transform': 'rotate(0)'}, {'top': '954.62px;', 'left': '1234.07px;', 'transform': 'rotate(0)'},
    {'top': '0px;', 'left': '53.52px;', 'transform': 'rotate(0)'}, {'top': '-66.39px;', 'left': '-8.92px;', 'transform': 'rotate(0)'},
    {'top': '-66.72px;', 'left': '-9.00px;', 'transform': 'rotate(0)'}, {'top': '-17.52px;', 'left': '44.84px;', 'transform': 'rotate(0)'},
    {'top': '25.8px;', 'left': '7px;', 'transform': 'rotate(0)'}, {'top': '29.5px;', 'left': '6.55px;', 'transform': 'rotate(0)'},
    {'top': '609.89px;', 'left': '1753.64px;', 'transform': 'rotate(0)'}, {'top': '6.5px;', 'left': '28.68px;', 'transform': 'rotate(0)'},
    {'top': '152.41px;', 'left': '117.58px;', 'transform': 'rotate(0)'}, {'top': '163.64px;', 'left': '119.18px;', 'transform': 'rotate(0)'},
    {'top': '0px;', 'left': '23.58px;', 'transform': 'rotate(0)'}, {'top': '91.5px;', 'left': '65.59px;', 'transform': 'rotate(0)'},
    {'top': '840.02px;', 'left': '1267.11px;', 'transform': 'rotate(0)'}, {'top': '664.17px;', 'left': '1380.74px;', 'transform': 'rotate(0)'},
    {'top': '42.90px;', 'left': '229.5px;', 'transform': 'rotate(0)'}, {'top': '100.25px;', 'left': '211.72px;', 'transform': 'rotate(0)'},
    {'top': '131.75px;', 'left': '219.24px;', 'transform': 'rotate(0)'}, {'top': '121.48px;', 'left': '87.43px;', 'transform': 'rotate(0)'},
    {'top': '105.28px;', 'left': '138.58px;', 'transform': 'rotate(0)'}, {'top': '137.71px;', 'left': '-1.86px;', 'transform': 'rotate(0)'},
    {'top': '89.83px;', 'left': '87.35px;', 'transform': 'rotate(0)'}, {'top': '135.48px;', 'left': '3.80px;', 'transform': 'rotate(0)'},
    {'top': '97.56px;', 'left': '33.60px;', 'transform': 'rotate(0)'}, {'top': '92.67px;', 'left': '33.59px;', 'transform': 'rotate(0)'},
    {'top': '42.61px;', 'left': '37.89px;', 'transform': 'rotate(0)'}, {'top': '44.20px;', 'left': '38.68px;', 'transform': 'rotate(0)'},
    {'top': '22.02px;', 'left': '213.64px;', 'transform': 'rotate(0)'}, {'top': '47.64px;', 'left': '198.37px;', 'transform': 'rotate(0)'},
    {'top': '35.48px;', 'left': '198.34px;', 'transform': 'rotate(0)'}, {'top': '22.04px;', 'left': '234.87px;', 'transform': 'rotate(0)'},
    {'top': '815.89px;', 'left': '1480.41px;', 'transform': 'rotate(0)'}, {'top': '102.47px;', 'left': '74.35px;', 'transform': 'rotate(0)'},
    {'top': '2.82px;', 'left': '196.46px;', 'transform': 'rotate(0)'}, {'top': '-0.06px;', 'left': '243.64px;', 'transform': 'rotate(0)'},
    {'top': '10.56px;', 'left': '-12.29px;', 'transform': 'rotate(0)'}, {'top': '10.11px;', 'left': '-12.40px;', 'transform': 'rotate(0)'},
    {'top': '-13.93px;', 'left': '119.79px;', 'transform': 'rotate(0)'}, {'top': '-14.00px;', 'left': '126.98px;', 'transform': 'rotate(0)'},
    {'top': '78.55px;', 'left': '62.42px;', 'transform': 'rotate(0)'}, {'top': '61.65px;', 'left': '153.48px;', 'transform': 'rotate(0)'},
    {'top': '-202px;', 'left': '246.15px;', 'transform': 'rotate(0)'}, {'top': '289.39px;', 'left': '-13.93px;', 'transform': 'rotate(0)'},
    {'top': '288.13px;', 'left': '-29.13px;', 'transform': 'rotate(0)'}, {'top': '302.97px;', 'left': '88.18px;', 'transform': 'rotate(0)'},
    {'top': '351.05px;', 'left': '147.93px;', 'transform': 'rotate(0)'}, {'top': '357.50px;', 'left': '266.66px;', 'transform': 'rotate(0)'},
    {'top': '297.13px;', 'left': '186.91px;', 'transform': 'rotate(0)'}, {'top': '289.57px;', 'left': '266.92px;', 'transform': 'rotate(0)'},
    {'top': '427.56px;', 'left': '70.87px;', 'transform': 'rotate(0)'}, {'top': '443.34px;', 'left': '64.43px;', 'transform': 'rotate(0)'},
    {'top': '-138.22px;', 'left': '625.96px;', 'transform': 'rotate(0)'}, {'top': '133.96px;', 'left': '24.93px;', 'transform': 'rotate(0)'},
    {'top': '170.46px;', 'left': '84.68px;', 'transform': 'rotate(0)'}, {'top': '243.45px;', 'left': '243.62px;', 'transform': 'rotate(0)'},
    {'top': '4.94px;', 'left': '-145px;', 'transform': 'rotate(0)'}, {'top': '214.51px;', 'left': '369.80px;', 'transform': 'rotate(0)'},
    {'top': '193.46px;', 'left': '200.51px;', 'transform': 'rotate(0)'}, {'top': '10.20px;', 'left': '230.96px;', 'transform': 'rotate(0)'},
    {'top': '221.17px;', 'left': '-45.74px;', 'transform': 'rotate(0)'}, {'top': '79.03px;', 'left': '99.36px;', 'transform': 'rotate(0)'},
    {'top': '155.32px;', 'left': '135.22px;', 'transform': 'rotate(0)'}, {'top': '890.82px;', 'left': '-38.32px;', 'transform': 'rotate(0)'},
    {'top': '786.64px;', 'left': '-60.24px;', 'transform': 'rotate(0)'}, {'top': '-126.44px;', 'left': '133.03px;', 'transform': 'rotate(0)'},
    {'top': '-131.87px;', 'left': '134.85px;', 'transform': 'rotate(0)'}, {'top': '11.84px;', 'left': '90.57px;', 'transform': 'rotate(0)'},
    {'top': '-31.44px;', 'left': '64.03px;', 'transform': 'rotate(0)'}, {'top': '60.58px;', 'left': '158.19px;', 'transform': 'rotate(0)'},
    {'top': '60.58px;', 'left': '128.19px;', 'transform': 'rotate(0)'}, {'top': '734.77px;', 'left': '276.10px;', 'transform': 'rotate(0)'},
    {'top': '80.24px;', 'left': '167.19px;', 'transform': 'rotate(0)'}, {'top': '95.15px;', 'left': '18.72px;', 'transform': 'rotate(0)'},
    {'top': '9.65px;', 'left': '68.02px;', 'transform': 'rotate(0)'}, {'top': '3.93px;', 'left': '75.97px;', 'transform': 'rotate(0)'},
    {'top': '18px;', 'left': '138.00px;', 'transform': 'rotate(0)'}, {'top': '51.5px;', 'left': '42.3px;', 'transform': 'rotate(0)'},
    {'top': '967.89px;', 'left': '409.64px;', 'transform': 'rotate(0)'}, {'top': '15px;', 'left': '109.33px;', 'transform': 'rotate(0)'},
    {'top': '42.32px;', 'left': '43px;', 'transform': 'rotate(0)'}, {'top': '22.43px;', 'left': '118px;', 'transform': 'rotate(0)'}
];

