import { validateForm } from './utils';
import { FormData } from '../types/types';

describe('validateForm', () => {
  it('gives all errors if we don"t give values', () => {
    const formData: FormData = {
      description: '',
      amount: '',
      category: '',
      date: '2025-10-10'
    };

    const errors = validateForm(formData);

    expect(errors.description).toBe('Please enter description');
    expect(errors.amount).toBe('Please enter positive amount');
    expect(errors.category).toBe('Please select category');
  });

  it('gives empty errors with all values', () => {
    const formData: FormData = {
      description: 'Lunch',
      amount: '20',
      category: 'Food',
      date: '2025-10-10'
    };

    const errors = validateForm(formData);

    expect(errors).toEqual({});
  });
});
