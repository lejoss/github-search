import React from 'react'
import { render, screen, logDOM } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserInput from './UserInput'
import GithubBook from '../GithubBook'

// test('user can type inside input', () => {
// 	const props = {
// 		value: '',
// 		setValue: () => { }
// 	}

// 	const inputValue = 'test'
// 	render(<UserInput {...props} />)

// 	const inputEl = screen.getByTestId(/user-input/i)
// 	expect(inputEl).toBeInTheDocument()

// 	userEvent.type(inputEl, inputValue)
// 	expect(inputEl).toHaveTextContent(inputValue)

// });

// test('user can click button', () => {
// 	render(<GithubBook />)

// 	const searchButton = screen.getByRole('button', { name: /search/i })
// 	userEvent.click(searchButton)
// 	const spinner = screen.getByTestId(/spinner/i)
// 	expect(spinner).toBeInTheDocument()

// })
