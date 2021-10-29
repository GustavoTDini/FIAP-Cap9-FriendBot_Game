class Settings{

    resWidths = [640,800,1280,1600]
    resHeights = [360,480,720,900]

    constructor(canvas, audioCtx) {
        this.gameCanvas = canvas
        this.music = true
        this.sounds = true
        this.threeD = true
        this.controls = true
        this.musicVolume = 2
        this.soundVolume = 2
        this.resolution = 1
        this.musicNode = audioCtx.createGain()
    }

    setNewResolution(){
        this.gameCanvas.width = this.resWidths[this.resolution]
        this.gameCanvas.height = this.resHeights[this.resolution]
    }

    setMusicVolume(){
        this.musicNode.gain.value = this.musicVolume
    }

}
