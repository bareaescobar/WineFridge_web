import path from 'path'
import { defineConfig } from 'vite'
import fs from 'fs'
import includeHtml from 'vite-plugin-include-html'
import contentPlugin from './vite-plugins/content-plugin'

function getHtmlEntryFiles(srcDir) {
    const entry = {}

    function traverseDir(currentDir) {
        const files = fs.readdirSync(currentDir)

        files.forEach((file) => {
            const filePath = path.join(currentDir, file)
            const isDirectory = fs.statSync(filePath).isDirectory()

            if (isDirectory) {
                traverseDir(filePath)
            } else if (path.extname(file) === '.html') {
                const name = path.relative(srcDir, filePath).replace(/\..*$/, '')
                entry[name] = filePath
            }
        })
    }

    traverseDir(srcDir)

    return entry
}

export default defineConfig({
    root: './src',
    base: './',

    plugins: [includeHtml(), contentPlugin()],

    server: {
        open: './src/index.html',
        host: true,
    },

    css: {
        devSourcemap: true,
        preprocessorOptions: {
            scss: {
                charset: false,
            },
        },
    },

    build: {
        outDir: '../dist',
        assetsDir: './',
        assetsInlineLimit: 4096,
        emptyOutDir: true,
        target: 'es2015',

        rollupOptions: {
            input: getHtmlEntryFiles('src'),
            output: {
                manualChunks: undefined,

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return `[name][extname]`
                    }
                    return '[name]-[hash][extname]'
                },
            },
        },
    },
})
