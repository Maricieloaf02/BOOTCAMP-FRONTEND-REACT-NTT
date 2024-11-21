import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  visibleRange?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  visibleRange = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [rangeStart, setRangeStart] = useState<number>(1);

  // Calcular el rango inicial cuando cambie la página actual
  useEffect(() => {
    const currentRange = Math.floor((currentPage - 1) / visibleRange) * visibleRange + 1;
    setRangeStart(currentRange);
  }, [currentPage, visibleRange]);

  const handleNextRange = () => {
    const newRangeStart = Math.min(rangeStart + visibleRange, totalPages - visibleRange + 1);
    setRangeStart(newRangeStart);
    onPageChange(newRangeStart); // Cambiar a la primera página del siguiente rango
  };

  const handlePrevRange = () => {
    const newRangeStart = Math.max(rangeStart - visibleRange, 1);
    setRangeStart(newRangeStart);
    onPageChange(newRangeStart); // Cambiar a la primera página del rango anterior
  };

  const handlePageClick = (page: number) => {
    onPageChange(page); // Cambiar la página actual
  };

  // Páginas visibles dentro del rango
  const visiblePages = Array.from(
    { length: visibleRange },
    (_, index) => rangeStart + index
  ).filter((page) => page <= totalPages);

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={handlePrevRange}
        disabled={rangeStart === 1}
      >
        <FaArrowLeft className="pagination__icon" />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`pagination__button ${
            currentPage === page ? 'pagination__button--active' : ''
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={handleNextRange}
        disabled={rangeStart + visibleRange > totalPages}
      >
        <FaArrowRight className="pagination__icon" />
      </button>
    </div>
  );
};

export default Pagination;
