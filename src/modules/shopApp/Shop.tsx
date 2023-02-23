import React, { Component } from 'react';

import Button from "../../components/button";
import Modal from "../../components/modal";
import ProductList from "../../components/productList";

import logo from "../../assets/images/droppe-logo.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";

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
}

interface SumbitPayload {
  description: string;
  price: string;
  title: string;
}

interface OwnProps {
  favorites: number;
  onFavClick(title: string): void;
  onSubmit(payload: SumbitPayload): Promise<boolean>;
  prodCount: number;
  products: Product[];
}

type Props = OwnProps;

class Shop extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isShowingMessage: false,
      message: '',
      isOpen: false,
    };
  }

  handleSubmit = async ({
    description,
    price,
    title,
  }: SumbitPayload) => {
    const { onSubmit } = this.props;

    const hasFormSubmitted: boolean = await onSubmit({ description, price, title });

    if (hasFormSubmitted) {
      this.setState({
        isOpen: false,
        isShowingMessage: false,
        message: '',
      })
    }
  }

  toggleModalVisibility = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const {
      isOpen,
      isShowingMessage,
      message,
    } = this.state;

    const {
      favorites,
      prodCount,
      products,
      onFavClick,
    } = this.props;

    const productListContent = !!products?.length ?
      <ProductList products={products} onFav={onFavClick} /> :
      <div />;

    const messageContent = (
      <div className={styles.messageContainer}>
        <i>{message}</i>
      </div>
    );

    const modalContent = (
      <Modal
        handleSubmit={this.handleSubmit}
        isOpen={isOpen}
        onToggle={this.toggleModalVisibility}
      />
    );

    return (
      <React.Fragment>
        <div className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>  {/* I would use classnames package instead or styled-components */}
            <img src={logo} className={styles.headerImage} />
          </div>
        </div>

        <div>
          <span className={`container ${styles.main} ${styles.layout}`}>
          <img src={img1} style={{maxHeight: "15em", display: 'block'}} />
          <img src={img2} style={{maxHeight: "15rem", display: 'block'}} />
          </span>
        </div>

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
            <span>Number of favorites: {favorites}</span>
          </div>

          {productListContent}
        </div>

        <div>{modalContent}</div>
      </React.Fragment>
    );
  }
}

export default Shop;