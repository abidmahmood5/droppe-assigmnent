import React, { Component } from 'react';

import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

import { Button } from "../../components/button";
import ProductList from "../../components/product-list-components";
import { Form } from "../../components/form";
import logo from "../../images/droppe-logo.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";

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
  prodCount: number;
  products: Product[];
  favorites: number;
  onSubmit(payload: SumbitPayload): Promise<boolean>;
  onFavClick(title: string): void;
}

type Props = OwnProps;

class Shop extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false,
      isShowingMessage: false,
      message: '',
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
    } = this.state;

    const {
      prodCount,
      products,
      favorites,
      onFavClick,
    } = this.props;

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

          <Form on-submit={this.handleSubmit} />
        </div>
      </Modal>
    );

    const productListContent = !!products?.length ?
      <ProductList products={products} onFav={onFavClick} /> :
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
            <span>Number of favorites: {favorites}</span>
          </div>

          {productListContent}
        </div>

        <>{modalContent}</>
      </React.Fragment>
    );
  }
}

export default Shop;