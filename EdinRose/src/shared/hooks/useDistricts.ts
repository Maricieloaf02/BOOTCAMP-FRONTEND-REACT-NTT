// test?
import { useState, useEffect } from 'react';

interface UseDistrictsReturn {
  districts: string[]; // Lista de distritos
  loading: boolean; // Estado de carga
  error: string | null; // Error en caso de fallo
}

const useDistricts = (url: string): UseDistrictsReturn => {
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error al cargar distritos: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data.districts)) {
          setDistricts(data.districts);
        } else {
          throw new Error('La estructura de los datos es inválida');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [url]);

  return { districts, loading, error };
};

export default useDistricts;
