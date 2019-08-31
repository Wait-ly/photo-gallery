import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import GalleryImage from './GalleryImage.jsx';
import ImageModal from './ImageModal.jsx';

const Gallery = styled.div`
  width: 1598px;
  height: 288px;
  justify-content: center;
  display: flex;
  background-color: #2d333f;
`;


class BannerGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      modal: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeLeftModal = this.changeLeftModal.bind(this);
    this.changeRightModal = this.changeRightModal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/L1/banner/images')
      .then((res) => {
        this.setState({
          images: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openModal(image) {
    this.setState({ modal: image });
  }

  closeModal(image) {
    this.setState({ modal: null });
  }

  changeLeftModal() {
    let images = this.state.images;
    let modal = this.state.modal;

    for (var i = 0; i < images.length; i++) {
      if (images[i].id === modal.id) {
        if (images[i - 1] !== undefined) {
          this.setState({ modal: images[i - 1] });
        }
      }
    }
  }

  changeRightModal() {
    let images = this.state.images;
    let modal = this.state.modal;

    for (var i = 0; i < images.length; i++) {
      if (images[i].id === modal.id) {
        if (images[i + 1] !== undefined) {
          this.setState({ modal: images[i + 1] });
        }
      }
    }
  }

  render() {
    return (
      <Gallery>
        {this.state.modal &&
          <ImageModal
            image={this.state.modal}
            closeModal={this.closeModal}
            changeRightModal={this.changeRightModal}
            changeLeftModal={this.changeLeftModal}
          />
        }
        <div>
          {
            this.state.images.slice(0, 2).map((image, i) =>
              <GalleryImage
                key={i}
                imageSize={'small'}
                image={image}
                openModal={this.openModal}
              />)
          }
        </div>
        {
          this.state.images.slice(2, 3).map((image, i) =>
            <GalleryImage
              key={i}
              imageSize={'large'}
              image={image}
              openModal={this.openModal}
            />)
        }
        <div>
          {
            this.state.images.slice(3, 5).map((image, i) =>
              <GalleryImage
                key={i}
                imageSize={'small'}
                image={image}
                openModal={this.openModal}
              />)
          }
        </div>
        {
          this.state.images.slice(5, 6).map((image, i) =>
            <GalleryImage
              key={i}
              imageSize={'large'}
              image={image}
              openModal={this.openModal}
            />)
        }
        <div>
          {
            this.state.images.slice(6, 8).map((image, i) =>
              <GalleryImage
                key={i}
                imageSize={'small'}
                image={image}
                openModal={this.openModal}
              />)
          }
        </div>
        {
          this.state.images.slice(8, 9).map((image, i) =>
            <GalleryImage
              key={i}
              imageSize={'large'}
              image={image}
              openModal={this.openModal}
            />)
        }
        {
          this.state.images.slice(9, 10).map((image, i) =>
            <GalleryImage
              key={i}
              imageSize={'large'}
              image={image}
              openModal={this.openModal}
            />)
        }
      </Gallery>
    );
  }
}

export default BannerGallery;