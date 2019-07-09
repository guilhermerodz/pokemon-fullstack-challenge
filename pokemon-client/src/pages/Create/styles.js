import styled from 'styled-components';

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: initial;

  div.picture {
    width: 100%;

    img {
      width: 100%;
    }
  }
  p {
    color: #ed5564;
    margin-bottom: 15px;
    border: 1px solid #ed5564;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 10px 15px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    background: #d9d9d9;
    border-radius: 15px;
    &::placeholder {
      color: #9f9f9f;
    }
  }
  select {
    margin-bottom: 15px;
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #ed5564;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin-bottom: 16px;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;
