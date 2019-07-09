import React from 'react';
import styled from 'styled-components';

import editIcon from '../../../assets/edit.svg';

const CreateButton = styled.button`
  background: #2eefb5;
  padding: 15px 20px;
  border-radius: 25px;

  color: #313131;
  font-weight: bold;
  font-size: 17px;

  display: flex;
  flex-direction: row;

  justify-content: baseline;
  align-items: flex-end;

  margin-right: 14px;
`;

const Icon = styled.img`
  margin-right: 7px;
`;

export default () => (
  <CreateButton>
    <Icon src={editIcon} alt="Edit" />
    <strong>Editar</strong>
  </CreateButton>
);
