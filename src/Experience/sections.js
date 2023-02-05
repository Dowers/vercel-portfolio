import * as THREE from 'three'
import Experience from './Experience.js'

export default class Sections
{
    constructor()
    { 
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sphere = this.experience.sphere
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.camera = this.experience.camera
        this.config = this.experience.config

        const material = new THREE.MeshToonMaterial({ 
            color: parameters.materialColor,
            gradientMap: gradientTexture
        })

        const objectsDistance = 4

        const mesh1 = new THREE.Mesh(
            new THREE.TorusGeometry(1, 0.4, 16, 50),
            material
        )
        const mesh2 = new THREE.Mesh(
            new THREE.ConeGeometry(1, 2, 32),
            material
        )
        const mesh3 = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
            material
        )
        
        mesh1.position.y = - objectsDistance * 0
        mesh2.position.y = - objectsDistance * 1
        mesh3.position.y = - objectsDistance * 2
        
        mesh1.position.x = 2
        mesh2.position.x = -2
        mesh3.position.x = 2
        
        this.scene.add(mesh1, mesh2, mesh3)
        
        const sectionMeshes = [mesh1, mesh2, mesh3]
        // window.addEventListener('scroll', () =>
        // {
        //         scrollY = window.scrollY

        //     const newSection = Math.round(scrollY / sizes.height)

        //     if(newSection != currentSection){
        //         currentSection = newSection

        //         gsap.to(
        //             sectionMeshes[currentSection].rotation,
        //             {
        //                 duration: 1.5,
        //                 ease: 'power2.inOut',
        //                 x: '+=6',
        //                 y: '+=3',
        //                 z: '+=1.5'
        //             }
        //         )
        //     }
        // })
    }

    

    update()
    {
        // if(this.config.sections.about)
        // {
        //     console.log("about")
        // }
        // if(this.config.sections.experience)
        // {
        //     console.log("experience")
        // }
    }
}