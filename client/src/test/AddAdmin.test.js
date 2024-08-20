import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import AddAdmin from './AddAdmin';
 // נתיב יחסי לרכיב

jest.mock('axios'); // מבצע mock ל-axios

describe('AddAdmin Component', () => {
  ///וודא שכל האלמנטים בטופס נוכחים (כותרת, תיבות קלט וכפתור).
  test('renders the AddAdmin form correctly', () => {
    render(<AddAdmin />);
    expect(screen.getByText(/Add New Admin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Admin/i)).toBeInTheDocument();
  });
  ///Just for testing 
  test('Dummy test', () => {
    expect(true).toBe(true);
  });
  
  ///שולח את הטופס בהצלחה ומשתמש ב-mockResolvedValueOnce כדי לוודא שהשרת מחזיר תגובה מוצלחת
  test('displays success message on successful admin addition', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<AddAdmin />);
    fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Add Admin/i));

    await waitFor(() => {
      expect(screen.getByText(/Admin added successfully!/i)).toBeInTheDocument();
    });
  });

  ///כישלון בשליחת הטופס באמצעות mockRejectedValueOnce, ואישור שמופיעה הודעת שגיאה
  test('displays error message on failed admin addition', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to add admin'));

    render(<AddAdmin />);
    fireEvent.change(screen.getByLabelText(/First Name:/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name:/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/Add Admin/i));

    await waitFor(() => {
      expect(screen.getByText(/Failed to add admin/i)).toBeInTheDocument();
    });
  });
});


