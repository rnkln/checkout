import u from 'url'
import p from 'path'
import fs from 'fs/promises'

const filename = u.fileURLToPath(import.meta.url)
const directory = p.dirname(filename)
const example = p.resolve(directory, '..', '.env.example')
const local = p.resolve(directory, '..', '.env.local')

await fs.cp(example, local)
