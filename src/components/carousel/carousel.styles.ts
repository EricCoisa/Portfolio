import styled from 'wrapper-styled-components';

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const CarouselTrack = styled.div<{ translateX: number; velocity: number }>`
  display: flex;
  transition: transform ${({ velocity }) => velocity}ms cubic-bezier(0.4, 0.2, 0.2, 1);
  transform: translateX(${({ translateX }) => translateX}%);
`;

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: rgba(0,0,0,0.6);
  }
`;

export const PrevButton = styled(CarouselButton)`
  left: 8px;
`;
export const NextButton = styled(CarouselButton)`
  right: 8px;
`;
