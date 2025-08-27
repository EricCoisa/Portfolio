import styled from 'wrapper-styled-components';

export const OptionsContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const OptionButton = styled.button<{ $selected?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: ${({ $selected }) => $selected ? '#6c63ff' : '#eee'};
  color: ${({ $selected }) => $selected ? '#fff' : '#333'};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
`;
