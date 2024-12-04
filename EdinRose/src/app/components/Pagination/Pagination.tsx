import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './Pagination.module.css';
import { PaginationProps } from '@/app/domain/Pagination';

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
    const newRangeStart = Math.min(rangeStart + visibleRange, totalPages - visibleRange + 1);
    setRangeStart(newRangeStart);
    onPageChange(newRangeStart);
  };

  const handlePrevRange = () => {
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
        aria-label="Previous page range"
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
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        className={styles['pagination__button']}
        onClick={handleNextRange}
        disabled={rangeStart + visibleRange > totalPages}
        aria-label="Next page range"
      >
        <FaArrowRight className={styles['pagination__icon']} />
      </button>
    </div>
  );
};

export default Pagination;
