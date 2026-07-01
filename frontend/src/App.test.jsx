import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App.jsx'

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([])
    })
  )
})

afterEach(() => {
  cleanup()
})

describe('App component', () => {

  // Bestehende Tests
  test('renders heading', () => {
    render(<App />)
    expect(screen.getByText(/ToDo Liste/i)).toBeTruthy()
  })

  test('renders input and button', () => {
    render(<App />)
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /Absenden/i })).toBeTruthy()
  })

  test('input updates correctly', () => {
    render(<App />)
    const input = screen.getAllByRole('textbox')[0]
    fireEvent.change(input, { target: { value: 'Test Task' } })
    expect(input.value).toBe('Test Task')
  })

  test('renders todo list container', () => {
    render(<App />)
    expect(screen.getByRole('list')).toBeTruthy()
  })

  // Test 5: Fehlermeldung bei leerem Eingabefeld
  /*
  test('zeigt Fehlermeldung wenn Eingabe leer ist', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /Absenden/i })
    fireEvent.click(button)
    expect(screen.getByText(/Bitte einen Text eingeben/i)).toBeTruthy()
  })

  // Test 6: Fehlermeldung wenn Laden fehlschlägt
  test('zeigt Fehlermeldung wenn Laden fehlschlägt', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Netzwerkfehler')))
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Fehler beim Laden der Aufgabenliste/i)).toBeTruthy()
    })
  })
    */

  // Test 7: Gruppe hinzufügen
  test('kann eine neue Gruppe hinzufügen', () => {
    render(<App />)
    const gruppenInput = screen.getAllByRole('textbox')[1]
    fireEvent.change(gruppenInput, { target: { value: 'Sport' } })
    fireEvent.click(screen.getByRole('button', { name: /\+ Gruppe/i }))
    expect(screen.getByText('Sport')).toBeTruthy()
  })

  // Test 8: Alle-Tab ist sichtbar
  test('zeigt den Alle-Tab an', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /Alle/i })).toBeTruthy()
  })

})