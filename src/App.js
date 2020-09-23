import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classList from './classes';
import NavBar from './NavBar';
import { ModalProvider } from 'styled-react-modal';
import ClassCard from './components/ClassCard';
import AddClassModal from './components/AddClassModal';
import Button from './components/Button';
import { Tabs } from './NavBar';

const App = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classTypeToFilter, setClassTypeToFilter] = useState(Tabs[0].value);

  useEffect(() => {
    document.title = 'Available Classes | Rookie Cookie';
    setClasses(classList);
  }, []);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleDeleteClass(classToDelete) {
    setClasses(classes.filter((item) => item.id !== classToDelete.id));
  }

  function handleLikeClass(classToLike) {
    setClasses((currentList) =>
      currentList.map((item) =>
        item.id === classToLike.id
          ? {
              ...classToLike,
              liked: !classToLike.liked,
            }
          : item
      )
    );
  }

  function renderClasses(classes) {
    if (classTypeToFilter === 'all') {
      return classes.map((item) => {
        return (
          <ClassCard
            key={`${item.id}-${item.title}`}
            content={item}
            onDelete={handleDeleteClass}
            onLike={handleLikeClass}
          />
        );
      });
    } else {
      return classes.filter(item => item.liked === true).map((item) => {
        return (
          <ClassCard
            key={`${item.id}-${item.title}`}
            content={item}
            onDelete={handleDeleteClass}
            onLike={handleLikeClass}
          />
        );
      });
    }
  }

  function addNewClass(classData) {
    setClasses((currentList) => [
      ...currentList,
      {
        id: Math.ceil(Math.random() * 10000),
        liked: false,
        ...classData,
      },
    ]);
    setIsModalOpen(false);
  }

  function handleNavChange(tabValue) {
    setClassTypeToFilter(tabValue);
  }

  return (
    <ModalProvider>
      <Wrapper>
        <NavBar onNavChange={handleNavChange} />
        <h1>Available Classes</h1>
        <Button onClick={toggleModal}>Create Class</Button>
        <ClassGrid>{renderClasses(classes)}</ClassGrid>
      </Wrapper>
      <AddClassModal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        onSubmit={addNewClass}
      />
    </ModalProvider>
  );
};

export default App;

const Wrapper = styled.div`
  text-align: center;
`;

const ClassGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
