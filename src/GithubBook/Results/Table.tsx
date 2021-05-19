import './UserDetails.css'

type Record = {
	avatar_url: string
	login: string
	type: string
}

const Table = ({ data }: { data: Record[] | null }) => {
	return data ? (
		<div className="details">
			
			{
				data && data.map(
					(user: Record, i: number) => (
						<div key={`${user.login}-${i}`}>
							<div className="row">
								<img className="img" src={user.avatar_url} alt="" />
								<p className="p item">{user.login}</p>
								<p className="p item">{user.type}</p>
							</div>
							<br />
						</div>
					)
				)
			}
		</div>
	): null
}

export default Table