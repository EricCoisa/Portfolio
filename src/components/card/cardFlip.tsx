import styled from 'styled-components';
import { useState } from 'react';

const FlipCardWrapper = styled.div`
  width: 100%;
`;

const FlipCardContainer = styled.div`
  perspective: 1000px;
  width: 100%;
  min-height: 200px;
  margin-bottom: 16px;
  cursor: pointer;
`;

const FlipCardInner = styled.div<{ $isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.$isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const FlipCardFace = styled.div`
  position: absolute;
  width: 100%;
  min-height: 200px;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const FlipCardFront = styled(FlipCardFace)`
  background: transparent;
`;

const FlipCardBack = styled(FlipCardFace)`
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.cardBackground};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius};
`;

export interface FlipCardProps {
  children: React.ReactNode;
  imageUrl: string;
  imageAlt: string;
}

export function FlipCard({ children, imageUrl, imageAlt }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <FlipCardWrapper>
      <FlipCardContainer onClick={handleFlip}>
        <FlipCardInner $isFlipped={isFlipped}>
          <FlipCardFront>
            {children}
          </FlipCardFront>
          <FlipCardBack>
            <ProjectImage src={imageUrl} alt={imageAlt} />
          </FlipCardBack>
        </FlipCardInner>
      </FlipCardContainer>
    </FlipCardWrapper>
  );
}

export default FlipCard;
