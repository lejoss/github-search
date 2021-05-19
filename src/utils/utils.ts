type Record = {
	avatar_url: string
	login: string
	type: string
}

const sorter = (arr: [], type: string = 'login', order: string = 'desc'): Record[] | void => {
	if (!arr) return
	if (type.toLowerCase() === 'login') {
		if (order === 'asc') {
			return arr.sort(function (a: Record, b: Record) {
				const A = a.login.toLowerCase()
				const B = b.login.toLowerCase()
				if (A > B) {
						return 1;
				}
				if (B > A) {
						return -1;
				}
				return 0;
		});
		}
		if (order === 'desc') {
			return arr.sort(function (a: Record, b: Record) {
				const A = a.login.toLowerCase()
				const B = b.login.toLowerCase()

				if (A > B) {
						return -1;
				}
				if (B > A) {
						return 1;
				}
				return 0;
		});
		}
	}
	
	return arr
}

const formatData = ((data: []) => {
	if (!data) return
	return data.map((record: Record) => {
		return {
			avatar_url: record.avatar_url,
			login: record.login,
			type: record.type,
		}
	})
	
})

export {
	sorter,
	formatData
}