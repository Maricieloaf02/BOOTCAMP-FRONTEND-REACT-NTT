import React, { useState, useEffect } from 'react';
import './CategorySelector.module.css';
import { Category } from '@/types/Category';
import { fetchCategories } from '@/services/categoryService';

interface Props {
  onSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<Props> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar el mensaje de carga

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true); // Mostrar "Cargando..."
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setError(null); // Limpiar error si se cargaron correctamente
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Error desconocido al cargar las categorías'
        );
      } finally {
        setLoading(false); // Ocultar "Cargando..."
      }
    };

    loadCategories();
  }, []);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="category-selector">
      <label htmlFor="categories" className="category-selector__label">
        Categories:
      </label>
      {loading ? (
        <p className="category-selector__loading">Cargando categorías...</p>
      ) : error ? (
        <p className="category-selector__error">Error: {error}</p>
      ) : (
        <select
          id="categories"
          value={selectedCategory}
          onChange={(e) => handleSelect(e.target.value)}
          className="category-selector__select"
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
