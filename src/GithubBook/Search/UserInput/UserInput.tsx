const UserInput = ({ value, setValue }: { value: string, setValue: Function }) => {
	return (
		<input
			data-testid="user-input"
			aria-label="user-input"
			placeholder="Search for github user"
			type="text"
			name="user"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	)
}

export default UserInput