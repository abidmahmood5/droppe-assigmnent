import React from 'react';
import renderer from 'react-test-renderer';

import ProductList from '../../components/productList';
import fixtures from '../../testing/fixtures'

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
      fixtures.product.create({ price: '$22.0' }),
      fixtures.product.create(),
      fixtures.product.create({ title: 'New Fake Product' }),
      fixtures.product.create(),
      fixtures.product.create({ description: 'Customised description' }),
    ];
  });

  it('renders a ProductList', () => {
    const productListComponent = renderer.create(
      <ProductList products={products} onFav={onFavClick} />
    ).toJSON();
  
    expect(productListComponent).toMatchSnapshot();
  });
});
