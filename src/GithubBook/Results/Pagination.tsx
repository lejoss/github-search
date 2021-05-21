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
				data-testid="list-pagination"
				className="li"
				key={number}
				id={number.toString()}
				onClick={onChangePage}
				style={{ color: highlightIndex === i ? 'white' : '#7A7E83' }}
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