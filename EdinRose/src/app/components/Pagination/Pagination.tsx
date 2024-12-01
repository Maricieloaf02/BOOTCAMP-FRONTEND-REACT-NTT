import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Pagination.module.css';

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

  useEffect(() => {
    const currentRange = Math.floor((currentPage - 1) / visibleRange) * visibleRange + 1;
    setRangeStart(currentRange);
  }, [currentPage, visibleRange]);

  const handleNextRange = () => {
    console.log('rangeStart:', rangeStart, 'visibleRange:', visibleRange, 'totalPages:', totalPages); // Registro de valores
    const newRangeStart = Math.min(rangeStart + visibleRange, totalPages - visibleRange + 1);
    setRangeStart(newRangeStart);
    onPageChange(newRangeStart);
  };
  

  const handlePrevRange = () => {
    console.log('rangeStart:', rangeStart, 'visibleRange:', visibleRange, 'totalPages:', totalPages); // Registro de valores
    const newRangeStart = Math.max(rangeStart - visibleRange, 1);
    setRangeStart(newRangeStart);
    onPageChange(newRangeStart);
  };
  

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const visiblePages = Array.from(
    { length: visibleRange },
    (_, index) => rangeStart + index
  ).filter((page) => page <= totalPages);

  return (
    <div className={styles['pagination']}>
      <button
        className={styles['pagination__button']}
        onClick={handlePrevRange}
        disabled={rangeStart === 1}
        aria-label="Previous"
      >
        <FaArrowLeft className={styles['pagination__icon']} />
      </button>
  
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${styles['pagination__button']} ${
            currentPage === page ? styles['pagination__button--active'] : ''
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
  
      <button
        className={styles['pagination__button']}
        onClick={handleNextRange}
        disabled={rangeStart + visibleRange > totalPages}
        aria-label="Next"
      >
        <FaArrowRight className={styles['pagination__icon']} />
      </button>
    </div>
  );
  
};

export default Pagination;
