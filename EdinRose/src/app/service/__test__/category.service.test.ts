import fetchMock from 'jest-fetch-mock';
import { fetchCategories } from '../category.service';
import { categoriesResponseMock } from '@/app/__mocks__/categories';
import { mapCategory } from '@/shared/utils/categoryMapper';

jest.mock('@/shared/utils/categoryMapper', () => ({
  mapCategory: jest.fn(),
}));

describe('fetchCategories', () => {
  const API_BASE_URL = "https://dummyjson.com";

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.resetMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar las categorías mapeadas correctamente', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(categoriesResponseMock));

    const mappedCategories = [
      { id: 1, name: 'Mocked Beauty' },
      { id: 2, name: 'Mocked Fragrances' },
    ];
    (mapCategory as jest.Mock).mockReturnValue(mappedCategories);

    const result = await fetchCategories();

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products/categories`);
    expect(mapCategory).toHaveBeenCalledWith(categoriesResponseMock);
    expect(result).toEqual(mappedCategories);
  });

  it('debería lanzar un error si la respuesta de la API no es correcta', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: () => Promise.resolve(null),
      })
    );

    console.log('fetch llamado:', (global.fetch as jest.Mock).mock.calls);

    await expect(fetchCategories()).rejects.toThrow('Error HTTP: 500 Internal Server Error');
    expect(global.fetch).toHaveBeenCalledWith(`${API_BASE_URL}/products/categories`);
    expect(mapCategory).not.toHaveBeenCalled();
    console.log('mapCategory fue llamado:', (mapCategory as jest.Mock).mock.calls);
  });

  it('debería manejar errores inesperados correctamente', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    await expect(fetchCategories()).rejects.toThrow('Network Error');
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/products/categories`);
    expect(mapCategory).not.toHaveBeenCalled();

    console.log('mapCategory fue llamado:', (mapCategory as jest.Mock).mock.calls);
  });

});
