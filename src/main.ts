import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import WebGL from "three/addons/capabilities/WebGL.js"

if (WebGL.isWebGLAvailable()) {
	// Initiate function or other initializations here
	// animate()

	createApp(App).mount("#app")
} else {
	const warning = WebGL.getWebGLErrorMessage()
	document.getElementById("app")?.appendChild(warning)
}
