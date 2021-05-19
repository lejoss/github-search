import './UserDetails.css'

const ArrowUp = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7A7E83"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>
}
const ArrowDown = () => {
	return <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#7A7E83"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
}

const Sorter = ({ onSort, sortOrder }: { onSort: Function, sortOrder: any }) =>  {
	return (
		<div className="sorter row">
			<div className="img" />
			{sortOrder === 'asc' && (
				<span onClick={() => onSort('desc')}><ArrowUp /></span>
			)}
			{sortOrder === 'desc' && (
				<span onClick={() => onSort('asc')}><ArrowDown /></span>
			)}			
			<p className="p item">Sort by Login</p>
		</div>
	)
}

export default Sorter