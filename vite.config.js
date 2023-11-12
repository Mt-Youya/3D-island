import { defineConfig } from "vite"
import { extname, resolve } from "path"
import { Plugin as PluginImportToCDN } from "vite-plugin-cdn-import"
import react from "@vitejs/plugin-react-swc"
import Compression from "vite-plugin-compression"
import Inspect from "vite-plugin-inspect"

const modelExts = [".gltf", ".glb", ".obj", "mtl", ".fbx", "stl", "vtp", "vtk", "ply", "xyz"]
const cssExts = [".css", ".less", ".scss", "sass", ".stylus"]

const cdnModules = [
    {
        name: "react",
        var: "React",
        path: `https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js`,
    },
]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Inspect(),
        Compression({ threshold: 1024 * 1024 * 2 }), // gzip : over 2Mb compression
        PluginImportToCDN({ modules: cdnModules }),
    ],
    server: {
        open: true,
        port: 8080,
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src"),
            },
        ],
    },
    assetsInclude: ["**/*.glb"],
    build: {
        outDir: "dist",
        assetsDir: "assets",
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            // external: Object.keys(cdnPath),
            output: {
                // paths: cdnPath,
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name].[hash].js",
                compact: true,
                // manualChunks: {
                //     react: ["react", "react-router", "react-router-dom"],
                //     redux: ["react-redux", "@reduxjs/toolkit"],
                //     konva: ["konva", "react-konva"],
                //     antd: ["antd", "@ant-design/icons"],
                // },
                assetFileNames: chunkInfo => {
                    const ext = extname(chunkInfo.name)

                    if (cssExts.includes(ext)) {
                        return `assets/css/[name].[hash].[ext]`
                    }

                    if (modelExts.includes(ext)) {
                        return `assets/model/[name].[hash].[ext]`
                    }

                    return `assets/images/[name].[hash].[ext]`
                },
            },
        },
        minify: true,
        // reportCompressedSize: false,
        cssCodeSplit: true,
        assetsInlineLimit: 1024 * 5,
        emptyOutDir: true,
    },
})
