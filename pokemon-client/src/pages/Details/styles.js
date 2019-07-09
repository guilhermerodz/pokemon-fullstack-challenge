import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 980px;

  background: #fff;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  padding: 46px 38px 46px 46px;
  margin: 84px auto 0;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }

  div.container-footer {
    display: flex;
    width: 100%;

    justify-content: center;

    margin-bottom: 12px;

    div.page-count {
      color: #737373;

      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      font-size: 19px;
      font-weight: normal;
    }
  }
`;

export const Cards = styled.div`
  display: flex;

  justify-content: flex-start;
  align-items: flex-start;
`;

export const Card = styled.div`
  width: 450px;

  flex-shrink: 0;

  margin-right: 25px;

  flex: 1 0 5; /* fg, fs, fb */

  & div.pokemon-image {
    background: #f2f2f2;
    border-radius: 15px;

    width: 100%;
    height: 450px;

    margin-bottom: 23px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const Stats = styled.div`
  width: 100%;
  height: 100%;

  padding: 29px;

  background: #f2f2f2;
  border-radius: 15px;

  div.stat-container {
    strong {
      font-size: 34px;
      font-weight: bold;
    }

    div.stat {
      margin-top: 10px;
      width: 100%;

      display: flex;
      flex-direction: column;

      span {
        margin-top: 4px;
        text-align: center;

        font-size: 20px;
      }

      .bar {
        background: #fff;
        height: 17px;
        border-radius: 20px;
      }
    }
  }

  div.info {
    margin-top: 10px;

    font-size: 18px;

    display: flex;
    justify-content: space-between;

    div.attribute {
      display: flex;
      flex-direction: column;
    }
  }

  div.evolutions {
    margin-top: 20px;

    display: flex;
    justify-content: space-between;

    div {
      height: 107px;
      width: 107px;

      border-radius: 40px;
      background: #dadada;

      img {
        height: 100%;
        width: 100%;
      }

      img:hover {
        cursor: pointer;
      }
    }
  }
`;

export const StatBar = styled.div`
  border-radius: 20px 0 0 20px;
  background: #5a5a5a;
  width: ${props => (props.amount / 250) * 100}%;
  height: 100%;
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

  font-size: 22px;
  color: #eee;
  background: #6e6e6e;
  border-radius: 5px;

  width: min-content;

  ${props =>
    props.typeColor &&
    css`
      background: ${props.typeColor};
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
