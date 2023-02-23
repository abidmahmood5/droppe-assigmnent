import React, { Component } from 'react';
import findIndex from 'lodash/findIndex';

import Shop from './Shop';

const DATA_URL = 'https://fakestoreapi.com/products';

interface Rating {
  count: number;
  rate: number;
}

interface Product {
  category?: string;
  description: string;
  id?: number;
  image?: string;
  isFavorite?: boolean;
  price: string | number;
  rating?: Rating;
  title: string;
}

interface SumbitPayload {
  description: string;
  price: string;
  title: string;
}

interface State {
  prodCount: number;
  products: Product[];
  numFavorites: number;
}

type Props = {}; // Just for the sake of better readability

class ShopApp extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      numFavorites: 0,
      prodCount: 0,
      products: [],
    };
  }

  componentDidMount() {
    fetch(DATA_URL).then(async (response: any) => {
      let products = await response.json() as Product[];

      this.setState({
        products,
        prodCount: products.length
      });
    });
  }

  onFavClick = (title: string) => {
    const { numFavorites, products } = this.state;

    const prods = products;
    let currentFavs = numFavorites;

    const idx = findIndex(prods, { title });

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      currentFavs -= 1;
    } else {
      currentFavs += 1;
      prods[idx].isFavorite = true;
    }

    this.setState({
      numFavorites: currentFavs,
      products: prods,
    });
  }

  onSubmit = async ({
    description,
    price,
    title,
  }: SumbitPayload) => {
    const { products } = this.state;

    const product: Product = {
      description,
      price,
      title,
    };

    // **this POST request doesn't actually post anything to any database**
    try {
      const createProduct = await fetch(DATA_URL, {
        method: 'POST',
        body: JSON.stringify(product),
      });

      if (createProduct) {
        this.setState({
          prodCount: products.length + 1,
          products: [...products, product],
        });

        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  render() {
    const {
      numFavorites,
      prodCount,
      products,
    } = this.state;

    return (
      <Shop
        favorites={numFavorites}
        onFavClick={this.onFavClick}
        onSubmit={this.onSubmit}
        prodCount={prodCount}
        products={products}
      />
    )
  }
}

export default ShopApp;
