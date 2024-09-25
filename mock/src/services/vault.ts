import { http, HttpResponse } from 'msw'
import type {
	VaultInput,
	VaultResponse
} from '@features/vault/client/use_vault'

export const createVaultService = (endpoint: string) => [
	http.post<never, VaultInput, VaultResponse, typeof endpoint>(
		endpoint,
		async ({ request }) => {
			const input = await request.json()
			const token = Buffer.from(input.value).toString('base64')

			return HttpResponse.json({ token })
		}
	)
]
