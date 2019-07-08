import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 980px;

  background: #fff;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  padding: 46px 38px 46px 46px;
  margin: 84px auto 0;

  display: flex;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Cards = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  flex-wrap: wrap;
`;

export const Card = styled.div`
  max-width: 215px;

  flex-shrink: 0;

  margin-right: 9px;
  margin-bottom: 35px;

  flex: 1 0 5; /* fg, fs, fb */

  & div.pokemon-image {
    background: #f2f2f2;
    border-radius: 15px;

    width: 100%;
    max-height: 215px;

    margin-bottom: 11px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Tags = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;

    & + div {
      margin-left: 3px;
    }
  }
`;

export const Tag = styled.div`
  padding: 2px 9px;

  font-size: 15px;
  color: #eee;
  background: #6e6e6e;
  border-radius: 5px;

  width: min-content;

  ${props =>
    props.typeColor &&
    css`
      background: #${props.typeColor};
    `}
`;

export const Title = styled.div`
  padding: 10px 50px;

  margin-top: 11px;

  font-size: 21px;
  color: #313131;
  background: #f4f4f4;
  border-radius: 6px;

  width: 100%;

  text-align: center;
`;
