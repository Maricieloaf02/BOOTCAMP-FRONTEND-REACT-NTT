import { fetchProducts } from "@/app/service/product.service";
import { productsResponseMock } from "@/proxy/__mocks__/products";


interface MockResponse<T> {
  ok: boolean;
  status: number;
  json: () => Promise<T>;
}

const mockFetch = <T>(data: T, status = 200, ok = true): jest.Mock => {
  const fn = jest.fn().mockImplementationOnce(() => {
    const response: MockResponse<T> = {
      ok,
      status,
      json: () => Promise.resolve(data),
    };
    return Promise.resolve(response);
  });
  global.fetch = fn;
  return fn;
};

describe("Product Service", () => {
  it("should fetch products successfully", async () => {
    mockFetch({ products: productsResponseMock, total: 2 });
    const response = await fetchProducts(1, 2);
    expect(response.products).toEqual(productsResponseMock);
    expect(response.total).toBe(2);
  });

  it("should handle error when fetching products", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));
    try {
      await fetchProducts(1, 2);
    } catch (error) {
      expect(error).toEqual(new Error("Network Error"));
    }
  });

  it("should filter products by query", async () => {
    mockFetch({ products: productsResponseMock, total: 2 });
    const response = await fetchProducts(1, 2, "beauty");
    expect(response.products).toEqual(productsResponseMock);
    expect(response.total).toBe(2);
  });

  it("should handle pagination", async () => {
    mockFetch({ products: productsResponseMock, total: 2 });
    const response = await fetchProducts(1, 1); // Pagina 1, 1 producto
    expect(response.products.length).toBe(1);
  });
});
