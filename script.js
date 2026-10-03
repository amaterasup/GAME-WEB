function generate_body(){
    
}
function UPDATE_ROTATION(tar1X,tar1Y,tar2X,tar2Y){
    sin = (tar1Y-tar2Y)/Math.sqrt((tar1X-tar2X)*(tar1X-tar2X) + (tar1Y-tar2Y)*(tar1Y-tar2Y));
    cos = (tar1X-tar2X)/Math.sqrt((tar1X-tar2X)*(tar1X-tar2X) + (tar1Y-tar2Y)*(tar1Y-tar2Y));
    deg = Math.atan2(sin,cos) * 180 / Math.PI;
    
    // console.log((tar1Y-tar2Y)/Math.sqrt((tar1X-tar2X)*(tar1X-tar2X) + (tar1Y-tar2Y)*(tar1Y-tar2Y)))
    return deg;
}
function UPDATE_PLAYER(object,parent,from,to){
    dy = from.y - parent.y + (to.y - from.y) / 10 - 16;
    dx = from.x - parent.x + (to.x - from.x) / 10 - 16;
    object.style.top = dy + 'px';
    object.style.left = dx + 'px';
    // console.log("move",dy,from.y,to.y,(to.y - from.y) / 20 - parent.y - 16)
}
function UPDATE_BODY(object,from,to){
    dy = parseFloat(from.top) + (parseFloat(to.top) - parseFloat(from.top)) / 20;
    dx = parseFloat(from.left) + (parseFloat(to.left) - parseFloat(from.left)) / 20;
    object.style.top = dy + 'px';
    object.style.left = dx + 'px';
    console.log("move",from.left,to.left,from.top,to.top)
}
document.querySelector('html').addEventListener("mousemove",(e) => {
    const cursor = document.getElementsByClassName('cursor-sp')[0];
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
})

const MAIN_SCREEN = document.getElementsByClassName("main-screen")[0];
const ENTITY = document.querySelector('#player-1');

const div = document.createElement("div");
MAIN_SCREEN.addEventListener("mousemove",(e) => {
    // console.log(e)
    const SCREEN_OBJ = MAIN_SCREEN.getBoundingClientRect();

    const PLAYER = document.querySelectorAll(".player");
    const CENTER = document.querySelectorAll(".center");
    const PIVOT = document.querySelectorAll(".pivot");

    function getCenter(n) {
        return CENTER[n].getBoundingClientRect();
    }
    function getPivot(n) {
        return PIVOT[n].getBoundingClientRect();
    }
    // const HEAD = PLAYER[0].getBoundingClientRect();
    // const CENTER_OBJ = CENTER[0].getBoundingClientRect();
    // const BODY = getComputedStyle(PLAYER[1]);
    // const PIVOT_OBJ = getComputedStyle(PIVOT[0]);

    // console.log(SCREEN_OBJ);

    deg = UPDATE_ROTATION(e.clientX,e.clientY,getCenter(0).x,getCenter(0).y);
    PLAYER[0].style.transform = `rotateZ(${deg}deg)`;   
    UPDATE_PLAYER(PLAYER[0],SCREEN_OBJ,getCenter(0),e);
    for(let i  = 1; i < PLAYER.length; i++){
        deg = UPDATE_ROTATION(getCenter(i).x,getCenter(i).y,getPivot(i-1).x,getPivot(i-1).y);
        PLAYER[i].style.transform = `rotateZ(${deg + 180}deg)`;
        UPDATE_PLAYER(PLAYER[i],SCREEN_OBJ,getCenter(i),getPivot(i-1));
    }
    // return;
    // document.getElementsByClassName("coor")[0].innerHTML = `x:${e.x}, ${PLAYER[1].style.left}, ${getCenter(1).x}, ${getPivot(0).x}<br>y:${e.y}, ${PLAYER[1].style.top}, ${getCenter(1).y}, ${getPivot(0).y}`;
})
const rainbowColors = [
    '#FF6D00', // Vibrant Orange
    '#FFEA00', // Vibrant Yellow
    '#00E676', // Vibrant Green
    '#00B0FF', // Vibrant Cyan
    '#2979FF', // Vibrant Blue
    '#D500F9', // Vibrant Purple
];

MAIN_SCREEN.addEventListener("click",() => {
    const div = document.createElement("div");

    div.className = "body player";
    div.style.background = rainbowColors[parseInt(Math.random() * 10000) % 6];
    div.innerHTML = "<div class=center></div><div class=pivot></div>";
    ENTITY.appendChild(div);

    // Remove after 3 seconds
    setTimeout(() => {
        div.remove();
    }, 100000 * Math.random());
})