import Experience from './Experience.js'

export default class Particles
{
    constructor()
    { 
        this.experience = new Experience()
        this.debug = this.experience.debug
    }

    init()
    {
       //load default particle positions
        
        this.ready = true
    }

    update()
    {
        if(!this.ready)
            return

        // Retrieve audio data
        this.analyserNode.getByteFrequencyData(this.byteFrequencyData)
        this.analyserNode.getFloatTimeDomainData(this.floatTimeDomainData)
        
        this.volume = this.getVolume()
        this.levels = this.getLevels()

        // Spectrum
        if(this.spectrum)
            this.spectrum.update()

        // console.log(this.volume)
    }

}
