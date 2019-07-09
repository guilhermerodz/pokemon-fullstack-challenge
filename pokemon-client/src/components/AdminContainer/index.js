import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import CreateButton from '../CreateButton';

import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

const AdminContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;

  margin-top: 46px;
  margin-bottom: 12px;

  div {
    display: flex;
  }

  a {
    text-decoration: none;
  }
`;

export default props => {
  const { editLink, deleteLink } = props;

  return (
    <AdminContainer>
      <div className="left-container">
        {editLink && (
          <Link to={editLink}>
            <EditButton />
          </Link>
        )}
        {deleteLink && (
          <Link to={deleteLink}>
            <DeleteButton />
          </Link>
        )}
      </div>
      <div className="right-container">
        <Link to="/create">
          <CreateButton />
        </Link>
      </div>
    </AdminContainer>
  );
};
