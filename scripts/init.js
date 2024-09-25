import u from 'url'
import p from 'path'
import fs from 'fs'

const filename = u.fileURLToPath(import.meta.url)
const directory = p.dirname(filename)

const env = {
	NEXT_TELEMETRY_DISABLED: 1,
	NEXT_PUBLIC_PAYMENTS_API_ENDPOINT: 'http://localhost:3001/api'
}

const envFile = p.resolve(directory, '..', '.env.local')
const envLocal = Object.entries(env)
	.map(([key, value]) => `${key}=${value}`)
	.join('\n')

fs.writeFile(envFile, envLocal, (err) => {
	if (err) throw err
})
