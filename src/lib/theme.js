import { css } from 'styled-components';
import Theme from './themes';
import Breakpoints from './breakpoints';

export const media = Object.keys(Breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${Breakpoints[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const theme = Theme;