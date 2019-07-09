import React from 'react';
import styled from 'styled-components';

import plusIcon from '../../assets/plus.svg';

const CreateButton = styled.button`
  background: #a5f691;
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
  <CreateButton>
    <Icon src={plusIcon} alt="Plus" />
    <strong>Crie seu pokémon!</strong>
  </CreateButton>
);
