import * as THREE from 'three'
import * as dat from 'lil-gui'

import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import World from './World.js'

import assets from './assets.js'
import Microphone from './Microphone.js'

export default class Experience
{
    static instance
    
    constructor(_options = {})
    {
        // console.log(Experience.instance)
        if(Experience.instance)
        {
            return Experience.instance
        }
        Experience.instance = this

        // Options
        this.targetElement = _options.targetElement

        if(!this.targetElement)
        {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()
        this.setDebug()
        this.setScene()
        this.setCamera()
        this.setRenderer()
        this.setResources()
        this.setMicrohopne()
        this.setWorld()
        
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.update()
    }

    setConfig()
    {
        this.config = {}
    
        // Debug
        this.config.debug = window.location.hash === '#debug'
        
        this.config.sections= []
        this.config.sections.home = window.location.hash === ''
        this.config.sections.about = window.location.hash === 'about'
        this.config.sections.experience = window.location.hash === 'experience'
        this.config.sections.projects = window.location.hash === 'projects'
        this.config.sections.contact = window.location.hash === 'contact'

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
    }

    setDebug()
    {
        if(this.config.debug)
        {
            this.debug = new dat.GUI({ width: 340 })
        }
    }
    
    setScene()
    {
        this.scene = new THREE.Scene()
    }

    setCamera()
    {
        this.camera = new Camera()
    }

    setRenderer()
    {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources()
    {
        this.resources = new Resources(assets)
    }

    setMicrohopne()
    {
        this.microphone = new Microphone()
    }

    setSections()
    {
        this.sections = new Sections()
    }

    setWorld()
    {
        this.world = new World()
    }

    update()
    {       
        this.camera.update()

        if(this.microphone)
            this.microphone.update()

        if(this.world)
            this.world.update()
        
        if(this.renderer)
            this.renderer.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize()
    {
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()
    }

    destroy()
    {
        this.world.destroy()
    }
}
