import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './components/TodoForm';

describe('TodoList', () => {
  test('adds a todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), { target: { value: 'Test Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /circle down/i }));
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('toggles a todo state', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), { target: { value: 'Test Todo' } });
    fireEvent.click(screen.getByRole('button', { name: /circle down/i }));
    fireEvent.click(screen.getByRole('button', { name: /check circle/i }));
    expect(screen.getByText('Test Todo')).toHaveStyle('text-decoration: line-through');
  });

  test('clears completed todos', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), { target: { value: 'Todo 1' } });
    fireEvent.click(screen.getByRole('button', { name: /circle down/i }));
    fireEvent.change(screen.getByPlaceholderText('What needs to be done?'), { target: { value: 'Todo 2' } });
    fireEvent.click(screen.getByRole('button', { name: /circle down/i }));
    fireEvent.click(screen.getAllByRole('button', { name: /check circle/i })[0]);
    fireEvent.click(screen.getByText('Clear Completed'));
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });
});