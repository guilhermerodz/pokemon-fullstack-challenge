import React from 'react';
import styled from 'styled-components';

import deleteIcon from '../../../assets/delete.svg';

const DeleteButton = styled.button`
  background: #34a684;
  padding: 15px 20px;
  border-radius: 25px;

  color: #313131;
  font-weight: bold;
  font-size: 17px;

  display: flex;
  flex-direction: row;

  justify-content: baseline;
  align-items: flex-end;
`;

const Icon = styled.img`
  margin-right: 7px;
`;

export default () => (
  <DeleteButton>
    <Icon src={deleteIcon} alt="Delete" />
    <strong>Remover</strong>
  </DeleteButton>
);
