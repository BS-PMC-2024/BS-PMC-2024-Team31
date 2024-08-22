import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from "./components/Navbar/Navbar";

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  test('renders logo and navigation links', () => {
    render(<Navbar />);

    // Check if logo is displayed
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();

    // Check if navigation links are displayed
    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('shows Login link when not logged in', () => {
    render(<Navbar />);

    // Check if Login button is present
    expect(screen.getByTestId('Login-button')).toBeInTheDocument();
    expect(screen.queryByTestId('Logout-button')).not.toBeInTheDocument();
  });

  test('shows Logout button when logged in', () => {
    localStorage.setItem('token', 'test-token');
    render(<Navbar />);

    // Check if Logout button is present
    expect(screen.getByTestId('Logout-button')).toBeInTheDocument();
    expect(screen.queryByTestId('Login-button')).not.toBeInTheDocument();
  });

  test('displays logout confirmation when Logout button is clicked', () => {
    localStorage.setItem('token', 'test-token');
    render(<Navbar />);

    // Click the Logout button
    fireEvent.click(screen.getByTestId('Logout-button'));

    // Check if confirmation dialog is displayed
    expect(screen.getByText('Are you sure you want to logout?')).toBeInTheDocument();
  });

  test('performs logout when "Yes" button is clicked in confirmation dialog', () => {
    localStorage.setItem('token', 'test-token');
    const originalLocation = window.location;

    // Mock window location
    delete window.location;
    window.location = { assign: jest.fn() };

    render(<Navbar />);

    // Click the Logout button to show confirmation dialog
    fireEvent.click(screen.getByTestId('Logout-button'));
    
    // Click "Yes" to confirm logout
    fireEvent.click(screen.getByText('Yes'));

    // Check if localStorage is cleared and redirect is performed
    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.assign).toHaveBeenCalledWith('/login');

    // Restore original window location
    window.location = originalLocation;
  });

  test('does not perform logout when "No" button is clicked in confirmation dialog', () => {
    localStorage.setItem('token', 'test-token');
    render(<Navbar />);

    // Click the Logout button to show confirmation dialog
    fireEvent.click(screen.getByTestId('Logout-button'));
    
    // Click "No" to cancel logout
    fireEvent.click(screen.getByText('No'));

    // Check if localStorage is not cleared
    expect(localStorage.getItem('token')).toBe('test-token');
  });
});
