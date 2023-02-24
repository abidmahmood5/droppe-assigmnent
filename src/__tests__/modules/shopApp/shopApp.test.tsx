import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react";

import fixtures from '../../../testing/fixtures'
import Shop from "../../../modules/shopApp/Shop";

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


describe('Shop App', () => {
  typeof jest.mock
  let favorites = 0;
  let onFavClick: any;
  let onSubmit: any;
  let products: IProduct[] = [];
  let prodCount = 0;
  let renderShop: any = null;

  beforeAll(() => {
    const favClick = (title: string) => {}
    const submit = () => {}
    onFavClick = jest.fn(favClick);
    onSubmit = jest.fn(submit);
    products = [
      fixtures.product.create(),
      fixtures.product.create(),
      fixtures.product.create(),
      fixtures.product.create(),
      fixtures.product.create(),
    ];

    prodCount = products.length;

    renderShop = () =>
      render(
        <Shop
          favorites={favorites}
          onFavClick={onFavClick}
          onSubmit={onSubmit}
          products={products}
          prodCount={prodCount}
        />
      );
  });

  it('renders Shop Component and look for any element present', () => {
    const comp = renderShop();
    
    expect(comp.getByText('Send product proposal')).toBeInTheDocument();
  });

  it('checks for image', () => {
    renderShop();

    const img = document.querySelector('img');

    const image = screen.getByTestId('image1');
    expect(image).toHaveAttribute('src');
    expect(image).toHaveStyle("display: block;");
    expect(image).toHaveTextContent('');

    expect(img?.src).toContain("http://localhost/droppe-logo.png");
  });

  it('tests dynamically updating the prodCount', () => {
    const prodCount = 3;

    const customShop = render(
      <Shop
        favorites={favorites}
        onFavClick={onFavClick}
        onSubmit={onSubmit}
        products={products}
        prodCount={prodCount}
      />
    )

    expect(customShop.getByText(`Total products: ${prodCount}`)).toBeInTheDocument();
  });
})
