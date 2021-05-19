import React from 'react'
import './UserDetails.css'

const Pagination = ({
	pages,
	onChangePage,
	highlightIndex
}:
	{
		pages: number[] | undefined,
		onChangePage: React.MouseEventHandler,
		highlightIndex: number
	}) => {
	const renderPageNumbers = pages && pages.map((number, i) => {
		return (
			<li
				className="li"
				key={number}
				id={number.toString()}
				onClick={onChangePage}
				style={{ color: highlightIndex === i ? 'white' : 'inherit' }}
			>
				{number}
			</li>
		);
	});

	return (
		<ul className="ul">
			{renderPageNumbers}
		</ul>
	)
}

export default Pagination