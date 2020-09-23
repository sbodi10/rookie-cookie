import React from 'react';
import styled from 'styled-components';
import { ReactComponent as UnLikeSvg } from '../icons/like_clear.svg';
import { ReactComponent as LikeSvg } from '../icons/like_red.svg';
import { ReactComponent as TrashSvg } from '../icons/trash.svg';

export default function ClassCard(props) {
  const { content, onDelete, onLike } = props;

  function toggleLike(content) {
    if (onLike) {
      onLike(content);
    }
  }

  return (
    <ClassCardWrapper>
      <img
        height="50%"
        width="100%"
        src={content.featuredImageUrl}
        alt={content.title}
      />
      <h4>{content.title}</h4>
      <h5>{content.instructor}</h5>
      <h5>{content.description}</h5>
      <h5>{content.duration} min</h5>
      <ClassCardFooter>
        <FooterSection>
          {content.liked ? (
            <LikeSvg
              fill="#d62533"
              style={{ cursor: 'pointer' }}
              height="20px"
              onClick={() => toggleLike(content)}
            />
          ) : (
            <UnLikeSvg
              fill="#d62533"
              style={{ cursor: 'pointer' }}
              height="20px"
              onClick={() => toggleLike(content)}
            />
          )}
          <TrashSvg
            fill="#d62533"
            style={{ cursor: 'pointer' }}
            height="20px"
            onClick={() => onDelete(content)}
          />
        </FooterSection>
      </ClassCardFooter>
    </ClassCardWrapper>
  );
}

const ClassCardWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(3, 27, 78, 0.06);
  margin: 25px;
  min-width: 250px;
  max-width: 350px;
  position: relative;
`;

const ClassCardFooter = styled.footer`
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

const FooterSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
