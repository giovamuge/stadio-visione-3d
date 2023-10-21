<script setup lang="ts">
import Visione3D from "./components/Visione3D.vue"

//@ts-ignore
import okaObj from "./assets/models/oka/baked_mesh.obj"
//@ts-ignore
import okaMtl from "./assets/models/oka/baked_mesh.mtl"
//@ts-ignore
import okaUSDZ from "./assets/models/oka/baked_mesh.usdz"
import "./assets/models/oka/baked_mesh_tex0.png"
import "./assets/models/oka/baked_mesh_norm0.png"
import "./assets/models/oka/baked_mesh_ao0.png"

import { ref } from "vue"
import { OBJ } from "./models/format"

let modelTest = ref<OBJ>({ obj: okaObj, mtl: okaMtl })
</script>

<template>
	<Visione3D :model="modelTest" />
</template>

<style scoped>
body {
	margin: 0;
	display: flex;
	place-items: center;
	min-width: 320px;
	min-height: 100vh;
	background-color: black;
}
</style>
