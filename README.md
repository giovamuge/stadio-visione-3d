# Visione 3D 🚀

This is a simple Vue component with Three.js to display any 3d object in usdz and obj format with its materials.

## Usage

Here a simple example with vite framework and vue

```html
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
```