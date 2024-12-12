// test?
import { Category } from '@/app/domain/Category';

export const mapCategory = (data: Category[]): Category[] => {
  return data.map((item) => ({
    slug: String(item.slug),
    name: String(item.name),
    url: String(item.url),
  }));
};
