const light_top_left = document.getElementById("licht_oben_links");
const light_top_right = document.getElementById("licht_oben_rechts");
const light_middle = document.getElementById("licht_mitte");
const light_bottom_left = document.getElementById("licht_unten_links");
const light_bottom_right = document.getElementById("licht_unten_rechts");
const light_bar_top = document.getElementById("lichtbalken_oben");
const light_bar_bottom = document.getElementById("lichtbalken_unten");

const light_cycle = [["green", false], ["green", true], ["#3f3f3f", false]]
var light_cycle_state = 0

function test() {
    console.log(light_cycle_state);

    light_top_left.style.fill = light_cycle[light_cycle_state][0];
    
    if (light_cycle[light_cycle_state][1]) {
        light_top_left.style.animationPlayState = "running";
    } else {
        light_top_left.style.animationPlayState = "stopped";
        light_top_left.style.fill = light_cycle[light_cycle_state][0];
    }
    
    if (light_cycle_state == 2) {
        light_cycle_state = 0;
    } else {
        light_cycle_state++;
    }
}

light_top_left.addEventListener("click", test);
