import HomePageStudent from './components/HomePageStudent'; 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the extended matchers
import Home from './HomeStudent'; // Adjust the import path if necessary

describe('Home Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders Home component with correct elements', () => {
    render(<Home />);

    // Check if the header and buttons are rendered
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Setting')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  test('clicking on "Edit" button clears localStorage and redirects to /profile', () => {
    // Mock window.location
    delete window.location;
    window.location = { href: '' };

    render(<Home />);
    fireEvent.click(screen.getByText('Setting'));
    fireEvent.click(screen.getByText('Edit'));

    // Check if localStorage was cleared
    expect(localStorage.getItem('token')).toBeNull();
    // Check if the redirect occurred
    expect(window.location.href).toBe('/profile');
  });

  test('clicking on "Log Out" button clears localStorage and redirects to /', () => {
    // Mock window.location
    delete window.location;
    window.location = { href: '' };

    render(<Home />);
    fireEvent.click(screen.getByText('Setting'));
    fireEvent.click(screen.getByText('Log Out'));

    // Check if localStorage was cleared
    expect(localStorage.getItem('token')).toBeNull();
    // Check if the redirect occurred
    expect(window.location.href).toBe('/');
  });

  test('clicking on "Python" button should render the button correctly', () => {
    render(<Home />);
    const pythonButton = screen.getByText('Python');
    expect(pythonButton).toBeInTheDocument();
    expect(pythonButton).toHaveClass('home-button');
  });

  test('clicking on "Java" button should render the button correctly', () => {
    render(<Home />);
    const javaButton = screen.getByText('Java');
    expect(javaButton).toBeInTheDocument();
    expect(javaButton).toHaveClass('home-button');
  });
});
