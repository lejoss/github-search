import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GithubBook from '../GithubBook'
import Sorter from '../Results/Sorter'
import Pagination from '../Results/Pagination'


test('user can type inside input', () => {
	render(<GithubBook />)
	const inputValue = 'test'

	const inputEl = screen.getByTestId(/user-input/i)
	expect(inputEl).toBeInTheDocument()

	userEvent.type(inputEl, inputValue)
	expect(inputEl).toHaveValue(inputValue)
});

test('display alert msg if user tries to submit an empty form', () => {
	window.alert = jest.fn();
	const alertMsg = 'enter some text before submiting'

	render(<GithubBook />)

	const searchButton = screen.getByRole('button', { name: /search/i })
	expect(searchButton).toBeInTheDocument()

	userEvent.click(searchButton)
	expect(window.alert).toHaveBeenCalledWith(alertMsg)

})

test('user can submit a valid form', () => {
	render(<GithubBook />)

	const inputValue = 'test'

	const inputEl = screen.getByTestId(/user-input/i)
	const searchButton = screen.getByRole('button', { name: /search/i })
	let formEl = screen.getByRole('form')

	formEl.onsubmit = jest.fn();
	const onSubmit = formEl.onsubmit

	userEvent.type(inputEl, inputValue)
	expect(inputEl).toHaveValue(inputValue)

	userEvent.click(searchButton)
	expect(onSubmit).toHaveBeenCalledTimes(1)
})

test('user can sort a list in asc order', () => {
	const onSort = jest.fn()

	render(<Sorter onSort={onSort} sortOrder="desc" />)
	const spanEl = screen.getByTestId(/asc/i)

	userEvent.click(spanEl)
	expect(onSort).toHaveBeenCalledTimes(1)

})

test('user can sort a list in desc order', () => {
	const onSort = jest.fn()

	render(<Sorter onSort={onSort} sortOrder="asc" />)
	const spanEl = screen.getByTestId(/desc/i)

	userEvent.click(spanEl)
	expect(onSort).toHaveBeenCalledTimes(1)
})

test('user can use pagination to change page and see active index', () => {
	const onChangePage = jest.fn()
	const { rerender } = render(<Pagination pages={[1, 2]} onChangePage={onChangePage} highlightIndex={0} />)

	expect(screen.getByText('1')).toBeInTheDocument()
	expect(screen.getByText('2')).toBeInTheDocument()

	expect(screen.getByText('1')).toHaveTextContent('1')
	expect(screen.getByText('2')).toHaveTextContent('2')

	expect(screen.getByText('1')).toHaveStyle('color: white;')
	expect(screen.getByText('2')).toHaveStyle('color: #7A7E83;')

	userEvent.click(screen.getByText('2'))
	expect(onChangePage).toHaveBeenCalledTimes(1)

	rerender(<Pagination pages={[1, 2]} onChangePage={onChangePage} highlightIndex={1} />)

	expect(screen.getByText('2')).toHaveStyle('color: white;')
	expect(screen.getByText('1')).toHaveStyle('color: #7A7E83;')

})
