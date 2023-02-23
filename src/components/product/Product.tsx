/* 

NOTES:

 * There should be no inline-styles
 * We can replace styles with the styled-components
 * We can use the classnames package for dynamic classes (if needs to)
 * <br /> should be removed and handle through styling

*/


import React, { FunctionComponent, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import styles from './product.module.css';

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
  product: IProduct;
}

type Props = OwnProps;

const Product: FunctionComponent<Props> = ({ product, onFav }) => {
  const {
    actionBarItem,
    actionBarItemLabel,
    product: productClass,
    productBody,
  } = styles; // I would replace all of these with the Styled components

  const handleFavoriteAction = useCallback(() => {
    onFav(product.title);
  }, [product.title]);

  // Problem: Now product title can be too long, I just put overflowX as fix now
  return (
    <span className={productClass} style={{ display: 'inline-block', overflowX: 'scroll', float: 'none', clear: 'both' }}>
      <span className={styles['product-title']} style={{ overflowX: 'hidden' }}>{product.title}</span>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b>Description:</b></span>
        <br/>
        {product.description}
     </p>

      <span className={styles['action_bar']} style={{ display: 'table', width: "100%" }}>
        <span
          className={`${actionBarItem} ${
            product.isFavorite ? "active" : ""
          }`}
          role="button"
          onClick={handleFavoriteAction}
        >
          <FaStar /> <span className={actionBarItemLabel}>{!!(product.isFavorite) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </span>
      </span>
    </span>
  );
};

export default Product;
