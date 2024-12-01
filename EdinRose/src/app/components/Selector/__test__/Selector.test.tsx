import { render, screen, fireEvent } from '@testing-library/react';
import Selector, { SelectorOption } from '@/app/components/Selector';

describe('Selector Component', () => {
  const options: SelectorOption[] = [
    { value: '', label: 'Select an option' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render the correct options', () => {
    render(<Selector options={options} onChange={jest.fn()} />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    const renderedOptions = screen.getAllByRole('option');
    expect(renderedOptions).toHaveLength(options.length);

    options.forEach((option, index) => {
      expect(renderedOptions[index]).toHaveTextContent(option.label);
      expect(renderedOptions[index]).toHaveValue(option.value);
    });
  });

  it('should call onChange with the selected value', () => {
    const onChangeMock = jest.fn();
    render(<Selector options={options} onChange={onChangeMock} />);

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'option2' } });

    expect(onChangeMock).toHaveBeenCalledWith('option2');
  });

  it('should select the initial value if provided', () => {
    render(<Selector options={options} value="option1" onChange={jest.fn()} />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveValue('option1');
  });

  it('should be accessible', () => {
    render(<Selector options={options} onChange={jest.fn()} label="Test Selector" />);
  
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toHaveAccessibleName('Test Selector');
  });
  
});
