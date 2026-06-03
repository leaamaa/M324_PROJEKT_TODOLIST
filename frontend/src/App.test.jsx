import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App.jsx'

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([])
    })
  )
})

afterEach(() => {
  cleanup()
})

describe('App component', () => {

  test('renders heading', () => {
    render(<App />)

    expect(screen.getByText(/ToDo Liste/i)).toBeTruthy()
  })

  test('renders input and button', () => {
    render(<App />)

    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(
      screen.getByRole('button', { name: /Absenden/i })
    ).toBeTruthy()
  })

  test('input updates correctly', () => {
    render(<App />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, {
      target: { value: 'Test Task' }
    })

    expect(input.value).toBe('Test Task')
  })

  test('renders todo list container', () => {
    render(<App />)

    expect(screen.getByRole('list')).toBeTruthy()
  })

})