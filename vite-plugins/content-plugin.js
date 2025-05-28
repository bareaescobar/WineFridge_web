import fs from 'fs'
import { join } from 'path'

export default function contentPlugin() {
    return {
        name: 'vite-plugin-content',
        resolveId(source) {
            if (source === 'virtual:content') {
                return '\0virtual:content'
            }
        },
        transformIndexHtml(html) {
            const contentDir = join(process.cwd(), 'content')
            let content = {}
            try {
                const mainJsonPath = join(contentDir, 'main.json')
                if (fs.existsSync(mainJsonPath)) {
                    content = JSON.parse(fs.readFileSync(mainJsonPath, 'utf-8'))
                }
            } catch (error) {
                console.error('Error loading content:', error)
            }
            return html.replace(/{{content\.(.*?)}}/g, (match, path) => {
                const keys = path.split('.')
                let current = content
                try {
                    for (const key of keys) {
                        if (key.includes('[')) {
                            const [arrayKey, index] = key.split('[')
                            const arrayIndex = parseInt(index.replace(']', ''))
                            if (
                                current[arrayKey] &&
                                Array.isArray(current[arrayKey]) &&
                                arrayIndex < current[arrayKey].length
                            ) {
                                current = current[arrayKey][arrayIndex]
                            } else {
                                console.warn(`Warning: Array path not found in content: ${path}`)
                                return match
                            }
                        } else if (current[key] !== undefined) {
                            current = current[key]
                        } else {
                            console.warn(`Warning: Path not found in content: ${path}`)
                            return match
                        }
                    }
                    if (current === null) return 'null'
                    if (current === undefined) return 'undefined'
                    if (typeof current === 'object') return JSON.stringify(current)
                    return String(current)
                } catch (error) {
                    console.error(`Error accessing content path: ${path}`, error)
                    return match
                }
            })
        },
    }
}
