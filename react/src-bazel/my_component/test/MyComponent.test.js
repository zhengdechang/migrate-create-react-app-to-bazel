import React from 'react';
import {render} from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders learn react link', () => {
  const {getByText} = render(<MyComponent />);
  const textElement = getByText(/my fancy component/i);
  expect(textElement).toBeInTheDocument();
});
