async function client(endpoint: string) {
	return window
		.fetch(endpoint)
			.then(async response => {
				const data = await response.json()
				if (response.ok) {
					return data.items
				} else {
					return Promise.reject(data)
				}

			})
}

export { client }