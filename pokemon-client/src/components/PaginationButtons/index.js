import React from 'react';
import styled from 'styled-components';

import skipIcon from '../../assets/skip.svg';

const Button = styled.button`
  background: #ed5564;

  padding: 11px 18px;
  margin-right: 6px;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  color: #fff;

  strong {
    font-size: 14px;
  }
`;

const PreviousButton = styled(Button)`
  border-radius: 22.5px 0px 0px 22.5px;

  span {
    font-size: 19px;
    margin-right: 9px;
  }
`;

const NextButton = styled(Button)`
  border-radius: 0px 22.5px 22.5px 0px;

  span {
    font-size: 19px;
    margin-left: 9px;
  }
`;

const CurrentButton = styled(Button)`
  border-radius: 50%;

  padding: 11px 16px;

  span {
    font-size: 19px;
  }
`;

const SkipButton = styled(Button)`
  border-radius: 50%;

  background: #b72735;

  padding: 0px 12px;
  margin-left: 14px;

  span {
    font-size: 19px;
  }
`;

export default props => {
  const { previousText, currentText, nextText } = props;

  const { previous, current, next, skip } = props;

  return (
    <>
      <div style={{ display: 'flex' }}>
        {previous && (
          <PreviousButton onClick={previous}>
            <span>{previousText}</span>
            <strong>voltar</strong>
          </PreviousButton>
        )}
        {current && (
          <CurrentButton onClick={current}>
            <span>{currentText}</span>
          </CurrentButton>
        )}
        {next && (
          <NextButton onClick={next}>
            <strong>avancar</strong>
            <span>{nextText}</span>
          </NextButton>
        )}
        {skip && (
          <SkipButton onClick={skip}>
            <img src={skipIcon} alt="Skip" />
          </SkipButton>
        )}
      </div>
    </>
  );
};
