import React, { FunctionComponent, ReactElement } from 'react';
import reverse from 'lodash/reverse';
import Product from '../product';

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

interface OwnProps {
  onFav: (title: string) => void;
  products: IProduct[];
}
type Props = OwnProps;

const ProductList: FunctionComponent<Props> = ({ onFav, products }) => {
  const productElements: ReactElement<typeof Product>[] = products.map((product: IProduct, index: number) => (
    <Product key={index} product={product} onFav={onFav} />
  ));

  return (
    <div>
      {reverse(productElements)}
    </div>
  )
};

export default ProductList;
