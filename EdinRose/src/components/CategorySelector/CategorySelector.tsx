import React, { useState, useEffect } from 'react';
import styles from './CategorySelector.module.css';
import { Category } from '@/types/Category';
import { fetchCategories } from '@/services/categoryService';

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error: unknown) {
        // Validar el tipo del error y extraer un mensaje
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido');
        }
      }
    };

    loadCategories();
  }, []);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className={styles['category-selector']}>
      <label htmlFor="categories" className={styles['category-selector__label']}>
        Categories:
      </label>
      {error ? (
        <p className={styles['category-selector__error']}>
          Error al cargar las categorías: {error}
        </p>
      ) : (
        <select
          id="categories"
          value={selectedCategory}
          onChange={(e) => handleSelect(e.target.value)}
          className={styles['category-selector__select']}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategorySelector;
