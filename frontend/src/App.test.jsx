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
    // Es gibt zwei Textfelder (Todo + Gruppe), darum getAllByRole statt getByRole
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
    expect(
      screen.getByRole('button', { name: /Absenden/i })
    ).toBeTruthy()
  })

  test('input updates correctly', () => {
    render(<App />)
    // Erstes Textfeld ist das Todo-Eingabefeld
    const input = screen.getAllByRole('textbox')[0]
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