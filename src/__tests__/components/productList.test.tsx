import React from 'react';
import renderer from 'react-test-renderer';
import ProductList from '../../components/productList';

interface Rating {
  count: number;
  rate: number;
}

interface IProduct {
  category?: string;
  description: string;
  id?: number;
  image?: string;
  isFavorite?: boolean;
  price: string | number;
  rating?: Rating;
  title: string;
}

describe('ProductList', () => {
  let products: IProduct[] = [];
  const onFavClick = jest.fn();

  beforeEach(() => {
    products = [
      { title: 'Fake Product 1', description: 'Fake description 1', price: '$23.90' },
      { title: 'Fake Product 2', description: 'Fake description 2', price: '$45.90' },
      { title: 'Fake Product 3', description: 'Fake description 3', price: '$89.90' },
    ];
  });

  it('renders a ProductList', () => {
    const productListComponent = renderer.create(
      <ProductList products={products} onFav={onFavClick} />
    ).toJSON();
  
    expect(productListComponent).toMatchSnapshot();
  });
});
