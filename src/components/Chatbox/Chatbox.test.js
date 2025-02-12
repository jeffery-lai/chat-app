// src/components/Chatbox/Chatbox.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Chatbox from './Chatbox';

describe('Chatbox Component', () => {
  it('renders the chatbox', () => {
    render(<Chatbox />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('allows users to send messages', () => {
    render(<Chatbox />);
    const input = screen.getByPlaceholderText('Type a message...');
    const button = screen.getByText('Send');

    // Type a message and send it
    fireEvent.change(input, { target: { value: 'Hello, World!' } });
    fireEvent.click(button);

    // Check if the message is displayed
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    expect(input.value).toBe(''); // Input should be cleared after sending
  });

  it('does not send empty messages', () => {
    render(<Chatbox />);
    const button = screen.getByText('Send');

    // Click send without typing a message
    fireEvent.click(button);

    // No messages should be displayed
    expect(screen.queryByText('Hello, World!')).not.toBeInTheDocument();
  });
});
