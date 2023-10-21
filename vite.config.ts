import { defineConfig } from "vite"
import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	assetsInclude: ["**/*.obj", "**/*.mtl", "**/*.usda", "**/*.usdz"],
	build: {
		lib: {
			// the entry file that is loaded whenever someone imports
			// your plugin in their app
			entry: resolve(__dirname, "lib/index.ts"),

			// the exposed global variable
			// is required when formats includes 'umd' or 'iife'
			name: "Visione3D",

			// the proper extensions will be added, ie:
			// name.js (es module)
			// name.umd.cjs) (common js module)
			// default fileName is the name option of package.json
			fileName: "visione-3d",
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
})
