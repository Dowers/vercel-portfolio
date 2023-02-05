import * as THREE from 'three'
import Experience from './Experience.js'
import World from './World.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.cursor = []
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene

        // Set up
        this.mode = 'debug' // defaultCamera \ debugCamera

        this.setInstance()
        this.setCursor()
        this.setModes()

        this.newSection = 0

    }

    setCursor(){
        this.cursor.x = 0
        this.cursor.y = 0
    }

    setInstance()
    {
        // Set up
        this.instance = new THREE.PerspectiveCamera(25, this.config.width / this.config.height, 0.1, 100)
        this.instance.cameraGroup = new THREE.Group()
        this.instance.cameraGroup.add(this.instance)
        this.scene.add(this.instance.cameraGroup)
    
        // console.log(this.instance.position)

        // const helper = new THREE.CameraHelper( this.instance );
        // this.scene.add( helper );
            
    }

    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        // this.modes.default.instance.rotation.reorder('YXZ')
        

        // Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        // this.modes.debug.instance.rotation.reorder('YXZ')
        this.modes.debug.instance.position.set(0, 0, 8)
        
        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        this.modes.debug.orbitControls.enabled = this.modes.debug.active
        this.modes.debug.orbitControls.screenSpacePanning = false
        this.modes.debug.orbitControls.enableKeys = false
        this.modes.debug.orbitControls.zoomSpeed = 0.25
        this.modes.debug.orbitControls.enableDamping = true
        // this.modes.debug.orbitControls.targetElement = this.experience.sphere

        // this.modes.debug.orbitControls.maxDistance = 8.0
        // this.modes.debug.orbitControls.minDistance = 8.0
        // this.modes.debug.orbitControls.targetElement = this.experience.sphere
        // this.modes.debug.orbitControls.camera.set(this.cursor.x, this.cursor.y, 8)

        window.addEventListener('mousemove', (event) => 
        {
            
            this.cursor.x = (event.clientX / this.config.width) - 0.5
            this.cursor.y = (event.clientY / this.config.height) - 0.5

            // console.log(this.cursor)
        })


        
        let scrollY = window.scrollY

        window.addEventListener('scroll', () =>
        {
            scrollY = window.scrollY
            // console.log(scrollY)
            this.newSection = (scrollY / this.config.height)
                
            // if(this.newSection != this.currentSection){
            //     this.currentSection = this.newSection

            //     gsap.to(
            //         this.scene.mesh1.rotation,
            //         {
            //             duration: 1.5,
            //             ease: 'power2.inOut',
            //             x: '+=6',
            //             y: '+=3',
            //             z: '+=1.5'
            //         }
            //     )
            //     console.log(this.scene.mesh1)
            // }

            if(this.newSection > 1) {
                this.newSection = Math.round(scrollY / this.config.height)
            }

        })


        // this.modes.debug.orbitControls.update()
    }

    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.debug.instance.aspect = this.config.width / this.config.height
        this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        // Update debug orbit controls
        this.modes.debug.orbitControls.update()

        // Apply coordinates
        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection

        
        const parallaxX = this.cursor.x
        const parallaxY = - this.cursor.y

        // console.log(this.newSection)

        // console.log(this.instance.position)
        // this.instance.lookAt(new THREE.Vector3())
        // console.log(this.instance.position)
        if(this.newSection == 0) {
            this.instance.position.x += (parallaxX  * 10 - this.instance.cameraGroup.position.x)
            this.instance.position.y += (parallaxY  * 10 - this.instance.cameraGroup.position.y)
            this.instance.lookAt(new THREE.Vector3())
        } else {
            this.instance.position.y = - (scrollY / this.config.height) * 4
            this.instance.cameraGroup.position.x += (parallaxX - this.instance.cameraGroup.position.x)
            this.instance.cameraGroup.position.y += (parallaxY - this.instance.cameraGroup.position.y)
        }
        
        // for(const mesh of this.sectionMeshes)
        // {            
        //     mesh.rotation.x += this.time.deltaTime
        //     mesh.rotation.y += this.time.deltaTime
        // }
    }

    destroy()
    {
        this.modes.debug.orbitControls.destroy()
    }
}
