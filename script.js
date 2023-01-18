const container = document.querySelector("container"),
mainVideo = container.querySelector("video"),
progressBar = container.querySelector(".progress-bar"),
videoTimeline = container.querySelector(".video-timeline"),
volumeBtn = container.querySelector("volume i"),
volumeSlider = container.querySelector(".left input"),
currentVidTime = container.querySelector(".current-time"),
videoDuration= container.querySelector(".video-duration"),
skipBackward= container.querySelector(".skip-backward i"),
skipForward= container.querySelector(".skip-forward i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
playPauseBtn= container.querySelector(".play-Pause i"),
picInpicBtn= container.querySelector(".pic-in-pic span"),
fullscreenBtn= container.querySelector(".fullscreen i")


let timer;

const hideControls =() =>{
    if(mainVideo.paused)return;
    timer = setTimeout(()=>{
        container.classList.remove("show-controls");
    },3000 );
}
hideControls();

container.addEventListener("mousemove",()=>{
    container.classList.remove("show-controls");
    clearTimeout(timer);
});

const formatTime = time =>{
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time/60) %60,
    hours = Math.floor(time/3600);

    seconds =seconds <10 ?`0${seconds}` :seconds;
    minutes = minutes <10 ?`0${minutes}` :minutes;
    hours = hours <10 ?`0${hours}` :hours;

    if (hours == 0) {
        return `$(minutes):$(seconds)`;
    }
    return `$(hours):$(minutes):$(seconds)`;
}

mainVideo.addEventListener("timeupdate", e =>{
    let{currentTime, duration} = e.target; 
    let percent =  (currentTime / duration)*100;
    progressBar.style.width = $`{percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loaddata", e =>{
    videoDuration.innerText= formatTime(e.target.duration);
});

videoTimeline.addEventListener("click", e =>{
    let timelinewidth =  e.target.clientwidth;
    mainVideo.currentTime =(e. offsetx /timelinewidth)* mainVideo.duration;
});
const draggableProgressBar = ()=>{
    let timelinewidth =  e.target.clientwidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime =(e. offsetx /timelinewidth)* mainVideo.duration;
}

videoTimeline.addEventListener("mousedown", ()=>{
    videoTimeline.addEventListener("mousemove",draggableProgressBar);//mouse-down movement
});

videoTimeline.addEventListener("mouseup", ()=>{
    videoTimeline.addEventListener("mousemove",draggableProgressBar); //mouse-up movement
});

videoTimeline.addEventListener("mousemove", e =>{
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX;
    progressTime.style.left = `${offsetX}px`;
    let timelinewidth = videoTimeline.clientWidth;
    let percent = (e.offsetX /timelinewidth) * mainVideo.duration; 
    progressTime.innerText = formatTime(percent);
});

volumeBtn.addEventListener("click", ()=>{
    if(!volumeBtn.classList.contains("fa-volume-high")){
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    }else  {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
});

speedBtn.addEventListener("click",() =>{
    speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach(Option=>{
    Option.addEventListener("click", ()=>{
        mainVideo.playbackRate = Option.dataset.speed;
        speedOptions.querySelector("active").classList.remove("active");
        Option.classList.add("active");
    });
});

document.addEventListener("click",e=>{
    if (e.target.tagName !=="SPAN" || e.target.className !=="material-symbols-rounded"){
        speedOptions.classList.remove("show");
    }
});

picInpicBtn.addEventListener("click", ()=>{
    mainVideo.requestPictureInPicture();   // change in different position
});

fullscreenBtn.addEventListener("click",()=>{
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement){
        fullscreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    } 
    fullscreenBtn.classList.replace("fa-compress", "fa-expand");
        container.requestFullscreen();
})

skipBackward.addEventListener("click",() =>{ 
    mainVideo.currentTime -=5;   //substract 5 seconeds from the playing video time 
});

skipForward.addEventListener("click",() =>{
    mainVideo.currentTime +=5;  //add 5 seconeds from current video time
});
playPausebtn.addEventListener("click", ()=>{
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () =>{
    playPausebtn.classList.replace("fa-play","fa-pause");
});

mainVideo.addEventListener("pause", () => {
    playPausebtn.classListreplace("fa-pause", "fa-play");
});

