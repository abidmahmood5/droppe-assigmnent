import React from 'react';
import renderer from 'react-test-renderer';
import Product from '../../components/Product';
import fixtures from '../../testing/fixtures';

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

describe('Product', () => {
  let product: IProduct;
  const onFav = jest.fn();

  beforeEach(() => {
    product = fixtures.product.create();
  });

  it('renders a Product', () => {
    const productComponent = renderer.create(
      <Product key={1} product={product} onFav={onFav} />
    ).toJSON();
  
    expect(productComponent).toMatchSnapshot();
  });
});
