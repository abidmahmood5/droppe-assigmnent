import React, { Component } from 'react';

import findIndex from 'lodash/findIndex';

import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

import { Button } from "./components/button";
import ProductList from "./components/product-list-components";
import { Form } from "./components/form";
import logo from "./images/droppe-logo.png";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";

import styles from "./shopApp.module.css";

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

interface State {
  isOpen: boolean;
  isShowingMessage: boolean;
  message: string;
  numFavorites: number;
  prodCount: number;
  products: Product[];
}

interface SumbitPayload {
  description: string;
  price: string;
  title: string;
}

interface Props {}

export class ShopApp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isOpen: false,
      isShowingMessage: false,
      message: '',
      numFavorites: 0,
      prodCount: 0,
      products: [],
    };
  }

  componentDidMount(){
    fetch('https://fakestoreapi.com/products').then(async (response) => {
      let products = await response.json() as Product[];

      this.setState({
        products,
        prodCount: products.length
      });
    });
  }

  favClick(title: string) {
    const {
      products,
      numFavorites,
    } = this.state;

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
      products: prods,
      numFavorites: currentFavs,
    });
  }

  async onSubmit({
    description,
    price,
    title,
  }: SumbitPayload) {
    const { products } = this.state;

    const product: Product = {
      description,
      price,
      title,
    };

    this.setState({
      isOpen: false,
      isShowingMessage: true,
      message: 'Adding product...',
      prodCount: products.length + 1,
      products: [...products, product],
    });

    // **this POST request doesn't actually post anything to any database**
    const createProduct = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });

    if (createProduct) {
      this.setState({
        isShowingMessage: false,
        message: ''
      })
    }
  }

  toggleModalVisibility = () => {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  };

  render() {
    const {
      isOpen,
      isShowingMessage,
      message,
      numFavorites,
      prodCount,
      products,
    } = this.state;

    const modalContent = (
      <Modal
        isOpen={isOpen}
        className={styles.reactModalContent}
        overlayClassName={styles.reactModalOverlay}
      >
        <div className={styles.modalContentHelper}>
          <div
            className={styles.modalClose}
            onClick={this.toggleModalVisibility}
          >
            <FaTimes />
          </div>

          <Form on-submit={this.onSubmit} />
        </div>
      </Modal>
    );

    const productListContent = !!products?.length ?
      <ProductList products={products} onFav={this.favClick} /> :
      <div />;

    const messageContent = (
      <div className={styles.messageContainer}>
        <i>{message}</i>
      </div>
    );

    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>  {/* I would use classnames package instead */}
            <img src={logo} className={styles.headerImage} />
          </div>
        </div>

        <>
           <span className={`container ${styles.main} ${styles.layout}`}>
            <img src={img1} style={{maxHeight: "15em", display: 'block'}} />
            <img src={img2} style={{maxHeight: "15rem", display: 'block'}} />
           </span>
        </>

        <div className={`container ${styles.main}`}>
          <div className={styles.buttonWrapper}>
            <span role="button">
               <Button onClick={this.toggleModalVisibility}>
                  Send product proposal
              </Button>
            </span>

             {isShowingMessage && messageContent}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {prodCount}</span>
            {' - '}
            <span>Number of favorites: {numFavorites}</span>
          </div>

          {productListContent}
        </div>

        <>{modalContent}</>
      </React.Fragment>
    );
  }
}
