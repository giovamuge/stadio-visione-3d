<script setup lang="ts">
import { ref } from "vue"
// import { gsap } from "gsap"
//@ts-ignore
import * as THREE from "three"
//@ts-ignore
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
//@ts-ignore
import { OBJLoader } from "three/addons/loaders/OBJLoader.js"
//@ts-ignore
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader.js"
//@ts-ignore
import { MTLLoader } from "three/addons/loaders/MTLLoader.js"
import { USDZ, OBJ } from "../models/format"
import Loader from "./Loader.vue"

// import playButton from "./assets/play-button.svg"
// import pauseButton from "./assets/pause-button.svg"

type Props = {
	model: USDZ | OBJ
}

// const isPlaying = ref(true)
const autoRotate = ref(true)
const isLoaded = ref(false)

const props = defineProps<Props>()

function onProgress(xhr: any) {
	if (xhr.lengthComputable) {
		const percentComplete = (xhr.loaded / xhr.total) * 100
		console.log(Math.round(percentComplete) + "% downloaded")
	}
}

function loadOBJ(
	objPath: string,
	materialPath: string,
	startCallback: () => void,
	endCallback: () => void,
) {
	startCallback()
	new MTLLoader().load(materialPath, function (materials: any) {
		materials.preload()

		new OBJLoader()
			.setMaterials(materials)
			.load(
				objPath,
				(model: any) => onLoaded(model, endCallback),
				onProgress,
			)
	})
}

function loadUSDZ(
	path: string,
	startCallback: () => void,
	endCallback: () => void,
) {
	startCallback()
	new USDZLoader().load(
		path,
		(model: any) => onLoaded(model, endCallback),
		onProgress,
	)
}

function onLoaded(model: any, endCallback: () => void) {
	model.rotation.x = 0.5
	scene.add(model)
	endCallback()
}

function load(
	model: OBJ | USDZ,
	startCallback: () => void,
	endCallback: () => void,
) {
	startCallback()
	const obj = <OBJ>model
	const usdz = <USDZ>model

	if (obj.obj && obj.mtl) {
		loadOBJ(obj.obj, obj.mtl, startCallback, endCallback)
	} else if (usdz.usdz) {
		loadUSDZ(usdz.usdz, startCallback, endCallback)
	}
}

load(props.model, onStartLoad, onEndLoad)

function onStartLoad() {
	isLoaded.value = true
}

function onEndLoad() {
	// isLoaded.value = false
}

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	20,
)
camera.position.z = 2.5

// scene

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 15)
camera.add(pointLight)
scene.add(camera)

// model

const clock = new THREE.Clock()

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 2
controls.maxDistance = 5
controls.autoRotate = true

const positionStarted = controls.position0
console.log(positionStarted)

// controls.addEventListener("change", () => {
// if (isPlaying.value) {
// 	isPlaying.value = false
// }
// if (autoRotate.value) {
// 	autoRotate.value = false
// }
// })

window.addEventListener("resize", onWindowResize)

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

function tic() {
	controls.update(clock.getDelta() * 0.35)
	requestAnimationFrame(tic)
	renderer.render(scene, camera)
}

function resetPosition() {
	console.log("reset")
	console.log(positionStarted)
	// gsap.to(mesh.rotation, {
	// 	duration: 1,
	// 	x: 0,
	// 	y: 0,
	// 	z: 0,
	// })
}

function startStopAnimation() {
	controls.autoRotate = !controls.autoRotate
	autoRotate.value = controls.autoRotate

	// if (controls.autoRotate) {
	// 	resetPosition()
	// }
}

tic()

const vRenderDirective = {
	beforeMount: (el: HTMLElement) => {
		el.appendChild(renderer.domElement)
	},
}
</script>

<template>
	<Loader v-if="isLoaded" />
	<div v-else>
		<div v-render-directive id="container-render"></div>
		<!-- <a rel="ar" v-href="{ okaUSDZ }"></a> -->
		<a rel="ar" href="./assets/models/oka/baked_mesh.usdz"></a>
		<button @click="resetPosition">Reset</button>
		<button @click="startStopAnimation" class="">
			{{ autoRotate ? "Pause" : "Resume" }}
		</button>
	</div>
</template>

<style scoped>
#container-render:hover {
	cursor: -webkit-grab;
	cursor: grab;
}

#container-render:active {
	cursor: -webkit-grabbing;
	cursor: grabbing;
}

button {
	position: absolute;
	top: 0;
	right: 0;
	z-index: 100;
	padding: 0.5em 1em;
	border: none;
	background: #646cff;
	color: white;
	font-size: 1.5em;
	font-weight: bold;
	border-radius: 0 0 0 1em;
}

.white {
	color: white;
}
</style>
