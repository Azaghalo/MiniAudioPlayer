
let songs = ["./Assets/JUJUTSU KAISEN - Lost in Paradise .feat - AKLO.mp3", "./Assets/Cowboy-Bebop-Theme.mp3", "./Assets/JUDGEMENT.mp3", "./Assets/Share The World - One Piece.mp3"]
let songImgs = ["./Assets/JUJUTSU_KAISEN-IMG.jpg", "./Assets/Cowboy_Bebop.jpg", "./Assets/yakuza.jpg"]
let songNames = ["Lost in Paradise .feat - AKLO", "Tank! - Cowboy Bebop", "Judgement - Yakuza"]

let timerBar = document.getElementById("timerBar")
let display = document.getElementById("timerDisplay")
let img = document.getElementById("musicImg")
let musicName = document.getElementById("name")
let audio = document.getElementById("audio1")
let play = document.getElementById("playImg")
let loop = document.getElementsByClassName("repeatImg")[0]
let volumeIcon = document.getElementsByClassName("volumeBtn")[0]
let volumeBar = document.getElementById("volume")

let musicIndex = 0

audio.volume = volmeBar.value;

function Retroceder(){
    if(musicIndex > 0){
        musicIndex -= 1
        audio.src = songs[musicIndex]

        if(songImgs[musicIndex] == null){
            img.src = "./Assets/Default.jpg"
        }else{            
            img.src = songImgs[musicIndex]
        }

        if(songNames[musicIndex] == null){
            musicName.textContent = songs[musicIndex].replace("./Assets/", "", ".mp3", "")
        }else{
            musicName.textContent = songNames[musicIndex]
        }        

        play.src = "./Assets/pause-circle.svg"
        audio.play()

    }else{
        audio.currentTime = 0;
    }
    console.log(songs[musicIndex] - "./Assets/")
}

function Avancar(){
    if(musicIndex < songs.length - 1){
        musicIndex += 1
        audio.src = songs[musicIndex]

        if(songImgs[musicIndex] == null){
            img.src = "./Assets/Default.jpg"
        }else{            
            img.src = songImgs[musicIndex]
        }
        
        if(songNames[musicIndex] == null){
            musicName.textContent = songs[musicIndex].replace("./Assets/", "", ".mp3", "")
        }else{
            musicName.textContent = songNames[musicIndex]
        }

        audio.play()
        play.src = "./Assets/pause-circle.svg"

    }else{
        musicIndex = 0;
        audio.src = songs[musicIndex]

        if(songImgs[musicIndex] == null){
            img.src = "./Assets/Default.jpg"
        }else{            
            img.src = songImgs[musicIndex]
        }

        if(songNames[musicIndex] == null){
            musicName.textContent = songs[musicIndex].replace("./Assets/", "", ".mp3", "")
        }else{
            musicName.textContent = songNames[musicIndex]
        }

        audio.play()
        play.src = "./Assets/pause-circle.svg"
    }
}

function Loop(){
    audio.loop = !audio.loop

    if(!audio.loop){
        loop.src = "./Assets/repeat.svg"
    }
    else{
        loop.src = "./Assets/repeatGreen.svg"
    }
}

function Play() {
    if (audio.paused){
        audio.play()
        play.src = "./Assets/pause-circle.svg"
    }else{
        audio.pause()
        play.src = "./Assets/play-circle.svg"
    }
}

function Parar(){
    audio.pause()
    audio.currentTime = 0;
    play.src = "./Assets/play-circle.svg"
}

function MusicVolume(value){
    audio.volume = value
    audio.muted = false
    volumeIcon.src = "./Assets/volume-2.svg"
}

function Mute(){
    audio.muted = !audio.muted
    if(!audio.muted){
        volumeIcon.src = "./Assets/volume-2.svg"
        volumeBar.value = audio.volume
    }else{
        volumeIcon.src = "./Assets/volume-x.svg"
        volumeBar.value = 0
    }
}

function ProgressBar(){
    timerBar.value = audio.currentTime;
    timerBar.setAttribute('max', audio.duration);
}

setInterval(ProgressBar, 500)

timerBar.addEventListener("input", function(event){
    audio.currentTime = event.target.value;
})

function Time(){

    let totalTime = audio.duration;
    let currentTime = 0 + audio.currentTime;

    let hour = Math.round(totalTime / 3600);

    let currentMinutes = Math.floor((currentTime - (hour * 3600)) / 60);
    let currentSeconds = Math.round(currentTime % 60);

    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    
    let totalMinutes = Math.floor((totalTime - (hour * 3600)) / 60);
    let totalSeconds = Math.round(totalTime % 60);

    if (totalMinutes < 10) {
        minutes = "0" + totalMinutes;
    }
    if (totalSeconds < 10) {
        totalSeconds = "0" + totalSeconds;
    }

    display.innerText = currentMinutes + ":" + currentSeconds + " / " + totalMinutes + ":" + totalSeconds;

    if(currentTime == totalTime && !audio.loop){
        play.src = "./Assets/play-circle.svg"
        Avancar()
    }

}

setInterval(Time, 500);
