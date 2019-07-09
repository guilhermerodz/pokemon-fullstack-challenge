import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 96px;

  background: #616161;

  & > div {
    min-width: 330px;

    height: 100%;
    max-width: 1054px;

    margin: 0 auto;
    padding: 0 23px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > div.header-logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin-top: -77px;
      margin-bottom: 25px;
    }
  }
`;
