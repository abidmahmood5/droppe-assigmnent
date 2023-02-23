import React from 'react';
import renderer from 'react-test-renderer';
import Product from '../../components/Product';

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
    product = { title: 'Fake Product 20', description: 'Fake description 20', price: '$23.90' };
  });

  it('renders a Product', () => {
    const productComponent = renderer.create(
      <Product key={1} product={product} onFav={onFav} />
    ).toJSON();
  
    expect(productComponent).toMatchSnapshot();
  });
});
