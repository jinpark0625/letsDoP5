
const music = new Audio('./sound/uptown.mp3');
const main = document.querySelector('main')

export default function (playBtn){
    let agent = navigator.userAgent.toLowerCase(); 

    if (agent.indexOf("chrome") != -1) { //
        music.innerHTML = ""; 
        // let weaList = '<iframe style="width:0px;height:0px;" src="./sound/uptown.mp3" allow="autoplay"></iframe>' 
        // main.innerHTML= weaList
        // music.play();
        playBtn.target.style = "animation: startBtn 2s cubic-bezier(0.830, 0.140, 0.850, 0.120) forwards; pointer-events: none;"
    //    playBtn.target.style = "display:none"
        setTimeout(()=>{
            music.play();
        }, 4000);
    } else { 
        console.log("idk what's going on")
    }
}
