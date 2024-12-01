import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/app/components/Pagination';

describe('Pagination Component', () => {
  const onPageChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct number of buttons', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
        visibleRange={5}
      />
    );

    // Deben mostrarse botones de 1 a 5
    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7); // 5 botones + Prev + Next
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onPageChange when a page is clicked', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
        visibleRange={5}
      />
    );

    // Hacer clic en el botón 3
    fireEvent.click(screen.getByText('3'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it('should disable "Prev" button on the first page', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={onPageChangeMock}
        visibleRange={5}
      />
    );
  
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });
  
  it('should disable "Next" button on the last page range', () => {
    render(
      <Pagination
        totalItems={50}
        itemsPerPage={10}
        currentPage={5}
        onPageChange={onPageChangeMock}
        visibleRange={5}
      />
    );
  
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
  
  it('should change the visible range when "Next" is clicked', () => {
    render(
      <Pagination
        totalItems={100}
        itemsPerPage={10}
        currentPage={5}
        onPageChange={onPageChangeMock}
        visibleRange={5}
      />
    );
  
    const nextButton = screen.getByRole('button', { name: /next/i });
  
    // Asegúrate de que el botón "Next" no está deshabilitado
    expect(nextButton).not.toBeDisabled();
  
    // Haz clic en el botón "Next"
    fireEvent.click(nextButton);
  
    // Verifica las llamadas al mock
    expect(onPageChangeMock).toHaveBeenCalledWith(6); // Debería pasar al siguiente rango
  });
  
  
  
  
  


});
