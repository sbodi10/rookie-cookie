import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import Button from './Button';
import SearchInput from './SearchInput';
import { ReactComponent as CloseIcon } from '../icons/x_icon.svg';

const InputTypes = {
  TITLE: 'title',
  INSTRUCTOR: 'instructor',
  DESCRIPTION: 'description',
  DURATION: 'duration',
  CLASS_TYPE: 'classType',
};

const ClassTypes = {
  ON_DEMAND: 'on-demand',
  LIVE: 'live',
};

const InitialClassValue = {
  title: '',
  instructor: '',
  description: '',
  duration: 0,
  classType: 'on-demand',
  featuredImageUrl: '',
};

export default function AddClassModal(props) {
  const { isOpen, toggleModal, onSubmit } = props;

  const [searchValue, setSearchValue] = useState('');
  const [classValue, setClassValue] = useState(InitialClassValue);
  const [images, setImages] = useState([]);

  function handleSearchInputChange(value) {
    setSearchValue(value);
  }

  function handleInputChange(inputType, e) {
    const { value } = e.target;
    setClassValue((prevState) => ({
      ...prevState,
      [inputType]: value,
    }));
  }

  function handleSubmit() {
    if (onSubmit) {
      onSubmit(classValue);
      setSearchValue('');
      setImages([]);
      setClassValue(InitialClassValue);
    }
  }

  async function getImagesForSearchValue() {
    setClassValue((prevState) => ({
      ...prevState,
      featuredImageUrl: ''
    }));

    const data = await fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f7457562363c9a893c3eb63f8106e736&text=${searchValue}&per_page=3&page=1&format=json&nojsoncallback=1`
    );
    const response = await data.json();
    if (response && response.stat === 'ok' && response.photos) {
      const photos = response.photos.photo;
      if (photos && photos.length) {
        setImages(
          photos.map((item) => {
            return {
              id: item.id,
              imageUrl: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`,
            };
          })
        );
      }
    }
  }

  function renderImages() {
    if (images && images.length) {
      return images.map((image) => {
        return (
          <StyledImage
            key={image.id}
            src={image.imageUrl}
            onClick={() => handleSelectImage(image)}
          />
        );
      });
    } else {
      return null;
    }
  }

  function handleSelectImage(image) {
    setClassValue((prevState) => ({
      ...prevState,
      featuredImageUrl: image.imageUrl,
    }));
    setImages([image]);
  }

  function closeModal() {
    if (toggleModal) {
      toggleModal();
      setSearchValue('');
      setImages([]);
      setClassValue(InitialClassValue);
    }
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <ModalContainer>
        <CloseIcon
          style={{
            cursor: 'pointer',
            position: 'absolute',
            top: '25px',
            right: '25px',
            zIndex: '2',
          }}
          height="20px"
          onClick={closeModal}
        />
        <ContentSection>
          <h3>Class Image</h3>
          <SearchInput
            placeholder={'Search for an image...'}
            onChange={handleSearchInputChange}
            onSearch={getImagesForSearchValue}
            value={searchValue}
          />
          <ImageSection>{renderImages()}</ImageSection>
          <h3>Class Name</h3>
          <StyledInput
            type='text'
            placeholder='Class name'
            onChange={(e) => handleInputChange(InputTypes.TITLE, e)}
          ></StyledInput>
          <h3>Instructor</h3>
          <StyledInput
            type='text'
            placeholder="Instructor's name"
            onChange={(e) => handleInputChange(InputTypes.INSTRUCTOR, e)}
          ></StyledInput>
          <h3>Description</h3>
          <StyledTextArea
            rows="5"
            cols="30"
            type="text"
            placeholder="Class description..."
            onChange={(e) => handleInputChange(InputTypes.DESCRIPTION, e)}
          ></StyledTextArea>
          <h3>Duration (in mins)</h3>
          <StyledInput
            type="number"
            placeholder='30'
            onChange={(e) => handleInputChange(InputTypes.DURATION, e)}
          ></StyledInput>
          <h3>Class Type</h3>
          <StyledSelect
            onChange={(e) => handleInputChange(InputTypes.CLASS_TYPE, e)}
          >
            <option value={ClassTypes.ON_DEMAND}>On-Demand</option>
            <option value={ClassTypes.LIVE}>Live</option>
          </StyledSelect>
        </ContentSection>
        <Button onClick={handleSubmit}>Add Class</Button>
      </ModalContainer>
    </StyledModal>
  );
}

const StyledModal = Modal.styled`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  overflow-y: scroll;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6rem 0 4rem 0;
  width: 80%;
  height: 100%;
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  margin: 15px;
  min-width: 150px;
  max-width: 200px;
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.85);
  }
`;

const StyledInput = styled.input`
  border-radius: 3px;
  border: 1px solid rgb(241, 241, 244);
  background: #f1f1f4;
  font-size: 16px;
  padding: 8px 12px;
`;

const StyledTextArea = styled.textarea`
  border-radius: 3px;
  border: 1px solid rgb(241, 241, 244);
  background: #f1f1f4;
  font-size: 16px;
  padding: 8px 12px;
  resize: none;
`;

const StyledSelect = styled.select`
  border-radius: 3px;
  border: 1px solid rgb(241, 241, 244);
  background: #f1f1f4;
  font-size: 16px;
  padding: 8px 12px;
`;
