import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[] | null, searchText: string, category: string = 'All'): Product[] {
    if (!products) {
      return [];
    }

    let filtered = products;

    // Filter by category first
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Then filter by search text
    if (searchText) {
      searchText = searchText.toLowerCase();
      filtered = filtered.filter(product => {
        return product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText);
      });
    }

    return filtered;
  }
}
