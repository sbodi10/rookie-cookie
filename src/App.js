import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import classList from './classes'

const App = () => {
  const [classes, setClasses] = useState([])

  useEffect(() => {
    setClasses(classList)
  }, [])

  return (
    <Wrapper>
      <h1>Hello, Rookie Cookie!</h1>
      <h2>Check out the classes you could take to learn all the skills</h2>
      {classes.map(klass => <ClassCard content={klass}/>)}
    </Wrapper>
  )
}

export default App

const ClassCard = ({content}) => (
  <ClassCardWrapper>
    <img height="50%" width="100%" src={content.featureImage} alt='' />
    <h4>{content.title}</h4>
    <h5>{content.instructor}</h5>
    <h5>{content.description}</h5>
    <h5>{content.duration} min</h5>
  </ClassCardWrapper>
)

const Wrapper = styled.div `
`

const ClassCardWrapper = styled.div`
  height: 300px;
  width: 175px;
  border-radius: 5px;
  border: solid 1px black;
  overflow: hidden;
`
