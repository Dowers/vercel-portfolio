import * as THREE from 'three';
import Experience from './Experience.js';
import Sphere from './Sphere.js';
import gsap from 'gsap';
import flagVertexShader from './shaders/flag/vertex.glsl';
import flagFragmentShader from './shaders/flag/fragment.glsl';
import flyingVertexShader from './shaders/flying/vertex.glsl';
import flyingFragmentShader from './shaders/flying/fragment.glsl';
import { CompressedPixelFormat } from 'three';

export default class World {
	constructor(_options) {
		this.experience = new Experience();
		this.config = this.experience.config;
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.camera = this.experience.camera;
		this.time = this.experience.time;

		this.timeFrequency = 0.001;
		this.elapsedTime = 0;

		this.resources.on('groupEnd', (_group) => {
			if (_group.name === 'base') {
				this.setSphere();
				this.SetSections();
			}
		});
	}

	setSphere() {
		this.sphere = new Sphere();
	}

	SetSections() {
		this.clock = new THREE.Clock();

		const textureLoader = new THREE.TextureLoader();
		this.flagTexture = textureLoader.load('./assets/flag-nz.jpg');

		const sectMaterial = new THREE.MeshToonMaterial({
			color: '#dccdcd',
		});

		this.flagMaterial = new THREE.ShaderMaterial({
			vertexShader: flagVertexShader,
			fragmentShader: flagFragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(5, 1.5) },
				uTime: { value: 0 },
				uTexture: { value: this.flagTexture },
			},
		});

		this.flyingMaterial = new THREE.ShaderMaterial({
			vertexShader: flyingVertexShader,
			fragmentShader: flyingFragmentShader,
			side: THREE.DoubleSide,
			uniforms: {
				uTime: { value: 0 },
			},
		});

		const objectsDistance = 4.2;

		this.mesh1 = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 1.5, 32, 32),
			this.flagMaterial
		);
		this.mesh2 = new THREE.Mesh(
			new THREE.ConeGeometry(1, 2, 32),
			this.flyingMaterial
		);
		this.mesh3 = new THREE.Mesh(
			new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
			this.flyingMaterial
		);

		this.tick = () => {
			const elapsedTime = this.clock.getElapsedTime();
			this.flagMaterial.uniforms.uTime.value = elapsedTime;
			this.flyingMaterial.uniforms.uTime.value = elapsedTime;
		};

		this.mesh1.position.y = -objectsDistance * 1;
		this.mesh2.position.y = -objectsDistance * 2;
		this.mesh3.position.y = -objectsDistance * 3;

		this.mesh1.position.x = 1.8;
		this.mesh2.position.x = -1.8;
		this.mesh3.position.x = 1.8;

		this.currentSection = 0;

		window.addEventListener('scroll', () => {
			if (this.camera.newSection > 1) {
				this.newSection = Math.round(scrollY / this.config.height);
			}
			gsap.to(this.mesh2.rotation, {
				duration: 1.5,
				ease: 'power2.inOut',
				x: '+=6',
				y: '+=3',
				z: '+=1.5',
			});
			gsap.to(this.mesh3.rotation, {
				duration: 1.5,
				ease: 'power2.inOut',
				x: '+=6',
				y: '+=3',
				z: '+=1.5',
			});
		});
		this.scene.add(this.mesh1, this.mesh2, this.mesh3);
	}

	resize() {}

	update() {
		if (this.sphere) {
			this.sphere.update();
		}

		if (this.mesh1) {
			this.tick();
		}

		if (this.mesh2) {
			this.mesh2.rotation.x += this.time.delta * 0.0001;
			this.mesh2.rotation.y += this.time.delta * 0.0001;
		}

		if (this.mesh3) {
			this.mesh3.rotation.x += this.time.delta * 0.0002;
			this.mesh3.rotation.y += this.time.delta * 0.0001;
		}
	}

	destroy() {}
}
