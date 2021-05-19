import React from 'react'
import { useGithubBook } from 'utils/hooks'
import Search from './Search/Search'
import UserInput from './Search/UserInput'
import Sorter from './Results/Sorter'
import { Table, Pagination, Results } from './Results'

import './GithubBook.css'

type Record = {
	avatar_url: string
	login: string
	type: string
}

const GithubBook = () => {
	const {
		userInput,
		setUserInput,
		setQueryParam,
		data,
		isError,
		isLoading,
		isSuccess,
		setFilter,
		sortOrder,
		setSortOrder,
		setPage,
		setCurrentUsers,
		setPageNumbers,
		page
	} = useGithubBook()

	const users: Record[] | null = setCurrentUsers(data)
	const pageNumbers: number[] | undefined = setPageNumbers(data)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (userInput === '') {
			alert('enter some text before submiting')
		} else {
			setQueryParam(userInput)
		}
	}

	const handleChangePage = (e: any) => {
		setPage(parseInt(e.target.id))
	}

	const handleSort = (type: string, order: string) => {
		setFilter(type)
		setSortOrder(order)
	}

	return (
			<div className="content">
				<h1 className="title">Github Book</h1>
				<Search>
					<form className="form" onSubmit={handleSubmit}>
						<UserInput value={userInput} setValue={setUserInput} />
						<button className="btn" type="submit">search</button>
					</form>
				</Search>
				{isLoading && <div className="spinner" id="spinner" />}
				{isSuccess && (
					<Results>
						<Sorter onSort={handleSort} sortOrder={sortOrder} />
						<Table data={users} />
						<Pagination pages={pageNumbers} onChangePage={handleChangePage} highlightIndex={page - 1} />
					</Results>
				)}
				{isError && <div>Some error happened</div>}
			</div>
	)
}

export default GithubBook