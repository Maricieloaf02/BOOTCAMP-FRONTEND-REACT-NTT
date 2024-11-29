jest.mock('@/app/service/category.service');

import { fetchCategories } from '@/app/service/category.service';

describe("Category Service with Mock", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch mocked categories", async () => {
    const categories = await fetchCategories();
    expect(categories).toEqual([
      { slug: "beauty", name: "Beauty", url: "https://dummyjson.com/products/category/beauty" },
      { slug: "fragrances", name: "Fragrances", url: "https://dummyjson.com/products/category/fragrances" },
      { slug: "furniture", name: "Furniture", url: "https://dummyjson.com/products/category/furniture" },
    ]);
  });

  it("should verify that fetchCategories is called once", async () => {
    await fetchCategories();
    expect(fetchCategories).toHaveBeenCalledTimes(1);
  });
});
