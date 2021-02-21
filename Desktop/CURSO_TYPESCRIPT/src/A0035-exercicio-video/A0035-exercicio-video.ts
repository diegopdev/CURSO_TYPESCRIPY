interface VidePlayerElements {
    videoPlayer: HTMLVideoElement;
    playButton: HTMLButtonElement;
    stopButton: HTMLButtonElement
}

interface videoPlayerProtocols {
    playToggle(): void;
    stop():void;
    iniciarEventos(): void
}

export default class VideoPlayer implements videoPlayerProtocols {
    private videoPlayer: HTMLVideoElement;
    private playButton: HTMLButtonElement;
    private stopButton: HTMLButtonElement

    constructor(videPlayerElements:VidePlayerElements){
        this.videoPlayer = videPlayerElements.videoPlayer
        this.playButton = videPlayerElements.playButton
        this.stopButton = videPlayerElements.stopButton
    }

    iniciarEventos():void {
        this.playButton.addEventListener('click', () => {
            this.playToggle()
        })

        this.stopButton.addEventListener('click', () => {
            this.videoPlayer.pause();
            this.videoPlayer.currentTime = 0;
            this.playButton.innerText = 'Play';
          });
    }

    playToggle(): void {
        if (this.videoPlayer.paused) {
          this.videoPlayer.play();
          this.playButton.innerText = 'Pause';
        } else {
          this.videoPlayer.pause();
          this.playButton.innerText = 'Play';
        }
      }

    stop():void{}
}

const videoPlayer = new VideoPlayer({
    videoPlayer: document.querySelector('.video') as HTMLVideoElement,
    playButton: document.querySelector('.play') as HTMLButtonElement,
    stopButton: document.querySelector('.stop') as HTMLButtonElement
})

videoPlayer.iniciarEventos()
