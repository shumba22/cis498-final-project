'use client';

import { useRouter } from 'next/navigation';
import CategorySelector from './category-selector';

export default function ProductFilters({ categories, selectedCategory }) {
  const router = useRouter();

  function handleSelect(id) {
    const params = new URLSearchParams(window.location.search);
    if (id === 'all') {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    const qs = params.toString();
    router.push(`/products${qs ? `?${qs}` : ''}`);
  }

  return (
    <section className="py-8">
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleSelect}
      />
    </section>
  );
}