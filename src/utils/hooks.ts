import React from 'react'
import { client } from './api-client'
import { sorter, formatData } from 'utils/utils'

type Record = {
	avatar_url: string
	login: string
	type: string
}

function useSafeDispatch(dispatch: any) {
	const mounted = React.useRef(false)

	React.useLayoutEffect((): any => {
		mounted.current = true
		return () => (mounted.current = false)
	}, [])
	return React.useCallback(
		(...args) => (mounted.current ? dispatch(...args) : void 0),
		[dispatch],
	)
}

const defaultInitialState = { status: 'idle', data: null, error: null }
function useAsync(initialState = {}) {
	const initialStateRef = React.useRef({
		...defaultInitialState,
		...initialState,
	})

	const [{ status, data, error }, setState] = React.useReducer(
		(s: any, a: any) => ({ ...s, ...a }),
		initialStateRef.current,
	)

	const safeSetState = useSafeDispatch(setState)

	const setData = React.useCallback(
		data => safeSetState({ data, status: 'resolved' }),
		[safeSetState],
	)
	const setError = React.useCallback(
		error => safeSetState({ error, status: 'rejected' }),
		[safeSetState],
	)

	const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
		safeSetState,
	])

	const run = React.useCallback(
		promise => {
			if (!promise || !promise.then) {
				throw new Error(
					`The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
				)
			}
			safeSetState({ status: 'pending' })
			return promise.then(
				(data: any) => {
					setData(data)
					return data
				},
				(error: any) => {
					setError(error)
					return Promise.reject(error)
				},
			)
		},
		[safeSetState, setData, setError],
	)

	return {
		isIdle: status === 'idle',
		isLoading: status === 'pending',
		isError: status === 'rejected',
		isSuccess: status === 'resolved',

		reset,
		setData,
		setError,
		error,
		status,
		data,
		run,
	}
}

function useClient() {
	return React.useCallback((endpoint) => client(endpoint), [])
}

function useSorter() {
	const [filter, setFilter] = React.useState('login')
	const [sortOrder, setSortOrder] = React.useState('asc')

	const sortUsers = sorter

	return { sortUsers, filter, setFilter, setSortOrder, sortOrder }
}

function useGithubBook() {
	const [queryParam, setQueryParam] = React.useState('')
	const [userInput, setUserInput] = React.useState('')
	const {setPage,setCurrentUsers,setPageNumbers, page } = usePagination()
	const { run, data, isError, isLoading, isSuccess, reset, setData } = useAsync()
	const { filter, sortOrder, setFilter, setSortOrder, sortUsers } = useSorter()
	const client = useClient()

	const users = data && formatData(data)

	React.useEffect(() => {
		if (!queryParam) return
		run(client(`https://api.github.com/search/users?q=${queryParam}`))
	}, [queryParam, run, client])

	React.useEffect(() => {
		if (!data) return
		setData(sortUsers(data, filter, sortOrder))
	}, [filter, data, sortOrder, setData, sortUsers])

	React.useEffect(() => {
		reset()
	}, [userInput, reset])

	return {
		userInput,
		setUserInput,
		setQueryParam,
		data: users,
		isSuccess,
		isLoading,
		isError,
		setData,
		setFilter,
		sortOrder,
		setSortOrder,
		setPage,
		setCurrentUsers,
		setPageNumbers,
		page
	}
}

function usePagination() {
	const [page, setPage] = React.useState(1)
	const [usersPerPage] = React.useState(9)

	const indexOfLastUser = page * usersPerPage
	const indexOfFirstUser = indexOfLastUser - usersPerPage

	const setCurrentUsers = (users: []): Record[] | null => {
		if (!users) return null
		return users.slice(indexOfFirstUser, indexOfLastUser)
	}

	const setPageNumbers = (users: []) => {
		if (!users) return

		const pageNumbers = []
		for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
			pageNumbers.push(i);
		}
		return pageNumbers
	}

	return { setPage, setCurrentUsers, setPageNumbers, page }

}

export { useGithubBook }