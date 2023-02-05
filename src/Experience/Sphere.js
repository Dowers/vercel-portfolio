import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './shaders/sphere/vertex.glsl'
import fragmentShader from './shaders/sphere/fragment.glsl'
import gsap from 'gsap'

export default class Sphere{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.microphone = this.experience.microphone

        this.timeFrequency = 0.001
        this.elapsedTime = 0

        this.setVariations()
        this.setGeometry()
        this.setLights()
        this.setOffset()
        this.setMaterial()
        this.setMesh()
        this.setParticles()

                // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder('Sphere')
            this.debugFolder.lights = this.debug.addFolder('Lights')

            this.debugFolder.lights
                .addColor(
                    this.material.uniforms.uLightAColour, 'value'
                    )
                .onChange(() => {
                    this.material.uniforms.uLightAColour.value.set
                })
                .name('Light A Colour')

            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightAPosition.value, 'x'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light A Position X')

            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightAPosition.value, 'y'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light A Position Y')

            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightAPosition.value, 'z'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light A Position Z')

            this.debugFolder.lights
                .add(
                    this.lights.a, 'intensity'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightAIntensity.value = this.lights.a.intensity
                })
                .name('Light A Intensity') 

            this.debugFolder.lights
                .add(
                    this.lights.a.spherical, 'phi'
                    )
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightAPosition.value.setFromSpherical(this.lights.a.spherical)
                })
                .name('Light A phi')

            this.debugFolder.lights
                .add(
                    this.lights.a.spherical, 'theta'
                    )
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightAPosition.value.setFromSpherical(this.lights.a.spherical)
                })
                .name('Light A theta')

            this.debugFolder.lights
                .addColor(
                    this.material.uniforms.uLightBColour, 'value'
                    )
                .onChange(() => {
                    this.material.uniforms.uLightBColour.value.set
                })
                .name('Light B Colour')

            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightBPosition.value, 'x'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light B Position X')
            
            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightBPosition.value, 'y'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light B Position Y')
            
            this.debugFolder.lights
                .add(
                    this.material.uniforms.uLightBPosition.value, 'z'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Light B Position Z')     

            this.debugFolder.lights
                .add(
                    this.lights.b, 'intensity'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightBIntensity.value = this.lights.b.intensity
                })
                .name('Light B Intensity')
                
            this.debugFolder.lights
                .add(
                    this.lights.b.spherical, 'phi'
                    )
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightBPosition.value.setFromSpherical(this.lights.b.spherical)
                })
                .name('Light B phi')

            this.debugFolder.lights
                .add(
                    this.lights.b.spherical, 'theta'
                    )
                .min(-Math.PI)
                .max(Math.PI)
                .step(0.001)
                .onChange(() => {
                    this.material.uniforms.uLightBPosition.value.setFromSpherical(this.lights.b.spherical)
                })
                .name('Light B theta')

            this.debugFolder
                .add(
                    this.material.uniforms.uDistortionFrequency, 'value'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Distortion Frequency')

                
            this.debugFolder
                .add(
                this.material.uniforms.uDisplacementFrequency,
                'value'
                )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Displacement Frequency')
                    
            this.debugFolder
                .add(
                    this.material.uniforms.uDistortionStrength,
                    'value'
                    )
                .min(0)
                .max(10)
                .step(0.001)
                .name('Distortion Strength')

            this.debugFolder
                .add(
                    this.material.uniforms.uDisplacementStrength,
                    'value'
                    )
                .min(0)
                .max(2)
                .step(0.001)
                .name('Displacement Strength')

            this.debugFolder
                .add(
                    this.material.uniforms.uSubdivision,
                    'value'
                    )
                .min(1)
                .max(512)
                .step(1)
                .name('Subdivision')

            this.debugFolder
                .add(
                    this.material.uniforms.uFresnelPower,
                    'value'
                    )
                .min(0)
                .max(10)
                .step(0.01)
                .name('Fresnel Power')
            
            this.debugFolder
                .add(
                    this.material.uniforms.uFresnelMultiplier,
                    'value'
                    )
                .min(1)
                .max(10)
                .step(0.01)
                .name('Fresnel Multiplier')

            this.debugFolder
                .add(
                    this.material.uniforms.uFresnelOffset,
                    'value'
                    )
                .min(-3)
                .max(3)
                .step(0.01)
                .name('Fresnel Offset')
            }
    }

    setParticles()
    {
        const particlesCount = 5000
        const particlePositions = new Float32Array(particlesCount * 3)
        
        for(let i = 0; i < particlesCount; i++){
            particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 10
            particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        
        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            color: '#ffeded',
            sizeAttenuation: true,
            size: 0.03
        })
        
        // Points
        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        this.scene.add(particles)

    }

    setVariations()
    {
        this.variations = {}

        this.variations.volume = {}
        this.variations.volume.target = 0
        this.variations.volume.current = 0.02
        this.variations.volume.upEasing = 0.03
        this.variations.volume.downEasing = 0.002
        this.variations.volume.getValue = () =>
        {
            const level0 = this.microphone.levels[0] || 0
            const level1 = this.microphone.levels[1] || 0
            const level2 = this.microphone.levels[2] || 0

            return Math.max(level0, level1, level2) * 0.3
        }
        this.variations.volume.getDefault = () =>
        {
            return 0.45
        }

        this.variations.lowLevel = {}
        this.variations.lowLevel.target = 0
        this.variations.lowLevel.current = 0.004
        this.variations.lowLevel.upEasing = 0.010
        this.variations.lowLevel.downEasing = 0.005
        this.variations.lowLevel.getValue = () =>
        {
            let value = this.microphone.levels[0] || 0
            value *= 0.003
            value += 0.0001
            value = Math.max(0, value)

            return value
        }
        this.variations.lowLevel.getDefault = () =>
        {
            return 0.0003
        }
        
        this.variations.mediumLevel = {}
        this.variations.mediumLevel.target = 0
        this.variations.mediumLevel.current = 0
        this.variations.mediumLevel.upEasing = 0.05
        this.variations.mediumLevel.downEasing = 0.04
        this.variations.mediumLevel.getValue = () =>
        {
            let value = this.microphone.levels[1] || 0
            value *= 3
            value += 3.587
            value = Math.max(3.587, value)

            return value
        }
        this.variations.mediumLevel.getDefault = () =>
        {
            return 3.587
        }
        
        this.variations.highLevel = {}
        this.variations.highLevel.target = 0
        this.variations.highLevel.current = 0
        this.variations.highLevel.upEasing = 0.02
        this.variations.highLevel.downEasing = 0.001
        this.variations.highLevel.getValue = () =>
        {
            let value = this.microphone.levels[2] || 0
            value *= 5
            value += 0.5
            value = Math.max(0.5, value)

            return value
        }
        this.variations.highLevel.getDefault = () =>
        {
            return 0.65
        }
    }

    setLights(){
        this.lights = {}

        //Light A
        this.lights.a = {}

        this.lights.a.intensity = 4.5
        this.lights.a.color = {}
        this.lights.a.color.value = '#006eff'
        this.lights.a.color.instance = new THREE.Color(this.lights.a.color.value)

        this.lights.a.spherical = new THREE.Spherical(1, 0.615, 2.049)

        //Light B
        this.lights.b = {}

        this.lights.b.intensity = 2
        this.lights.b.color = {}
        this.lights.b.color.value = '#f3cd12'
        this.lights.b.color.instance = new THREE.Color(this.lights.b.color.value)

        this.lights.b.spherical = new THREE.Spherical(1, 2.561, -1.844)

        const directionalLight = new THREE.DirectionalLight(0x222222, 1)
        directionalLight.position.set(1, 1, 0)
        this.scene.add(directionalLight)
    }

    setOffset(){
        this.offset = {}
        this.offset.spherical = new THREE.Spherical(1, Math.random() * Math.PI, Math.random() * Math.PI * 2)
        this.offset.direction = new THREE.Vector3()
        this.offset.direction.setFromSpherical(this.offset.spherical)
    }

    setGeometry(){
        // console.time('load')
        this.geometry = new THREE.SphereGeometry(1, 512, 512)
        // console.timeEnd('load')
        this.geometry.computeTangents()

        // console.log(this.geometry)
    }

    setMaterial(){

        //  console.log(this.lights.a.intensity)
        this.material = new THREE.ShaderMaterial({ 
            uniforms: {                
                uLightAColour: { value: this.lights.a.color.instance }, 
                uLightAPosition: { value: new THREE.Vector3(1.0, 1.0, 0.0)}, 
                uLightAIntensity: { value: this.lights.a.intensity }, 

                uLightBColour: { value: this.lights.b.color.instance },
                uLightBPosition: { value: new THREE.Vector3(- 1.0, - 1.0, 0.0)}, 
                uLightBIntensity: { value: this.lights.a.intensity }, 

                uSubdivision: { value: 512.0 },
                
                uOffset: { value: new THREE.Vector3() },
                
                uDistortionFrequency: { value: 1.5 },
                uDistortionStrength: { value: 0.65 },
                uDisplacementFrequency: { value: 2.120 },
                uDisplacementStrength: { value: 0.152 },

                uFresnelOffset: { value: -2.0 },
                uFresnelMultiplier: { value: 3.587 },
                uFresnelPower: { value: 1.793 },
                
                uTime: { value: 0}
            },
            defines: {
                USE_TANGENT: ''
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update(){

        // Update variations
        for(let _variationName in this.variations)
        {
            const variation = this.variations[_variationName]
            variation.target = this.microphone.ready ? variation.getValue() : variation.getDefault()
            
            const easing = variation.target > variation.current ? variation.upEasing : variation.downEasing
            variation.current += (variation.target - variation.current) * easing * this.time.delta
        }

        // Time
        this.timeFrequency = this.variations.lowLevel.current
        this.elapsedTime = this.time.delta * this.timeFrequency

        // Update material
        this.material.uniforms.uDisplacementStrength.value = this.variations.volume.current
        this.material.uniforms.uDistortionStrength.value = this.variations.highLevel.current
        this.material.uniforms.uFresnelMultiplier.value = this.variations.mediumLevel.current

        // Offset
        const offsetTime = this.elapsedTime * 0.5
        this.offset.spherical.phi = ((Math.sin(offsetTime * 0.001) * Math.sin(offsetTime * 0.00321)) * 0.5 + 0.5) * Math.PI
        this.offset.spherical.theta = ((Math.sin(offsetTime * 0.0001) * Math.sin(offsetTime * 0.000321)) * 0.5 + 0.5) * Math.PI * 2
        this.offset.direction.setFromSpherical(this.offset.spherical)
        this.offset.direction.multiplyScalar(this.timeFrequency * 2)

        this.material.uniforms.uOffset.value.add(this.offset.direction)

        this.material.uniforms.uTime.value += this.elapsedTime

        this.lights.a.spherical.phi += this.time.delta * 0.0005
        this.lights.b.spherical.phi -= this.time.delta * 0.0005 
        // this.lights.a.spherical.theta += this.time.delta * 0.001 
        // this.lights.b.spherical.theta -= this.time.delta * 0.001 
        this.material.uniforms.uLightAPosition.value.setFromSpherical(this.lights.a.spherical)
        this.material.uniforms.uLightBPosition.value.setFromSpherical(this.lights.b.spherical)
        // this.mesh.rotation.y += this.time.delta

        // console.log(this.mesh.rotation)
      
    }

    destroy()
    {
    }
}