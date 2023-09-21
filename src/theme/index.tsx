import React, { useMemo } from 'react';
import { transparentize } from 'polished';
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
} from 'styled-components';
import { useIsDarkMode } from '../state/user/hooks';
import { Text } from 'rebass';
import { Colors } from './styled';

export * from './components';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const MEDIA_WIDTHS = {
  upToExtraSmall: 540,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    (accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
  },
  {}
) as any;

const white = '#FFFFFF';
const black = '#000000';

export function colors(darkMode: boolean): Colors {
  return {
    white,
    black,
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',
    bg1: darkMode ? '#1d1f24' : '#fafafa',
    bg2: darkMode ? '#27292e' : '#ededed',
    bg3: darkMode ? '#3a3d47' : '#e6e6e8',
    bg4: darkMode ? '#4c4f5c' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
    primary1: '#2792d6',
    primary2: '#3099db',
    primary3: '#389fe0',
    primary4: '#54afe8',
    primary5: '#5fb3e8',
    primaryText1: darkMode ? '#fff' : '#000',
    secondary1: '#3B6A9C',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',
    red1: '#FD4040',
    red2: '#F82D3A',
    red3: '#D60000',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#3B6A9C',
  };
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),
    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },
    shadow1: darkMode ? '#000' : '#2F80ED',
    mediaWidth: mediaWidthTemplates,
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const darkMode = useIsDarkMode();
  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
}

interface TextWrapperProps {
  color: keyof Colors;
  fontWeight?: string | number;
  fontSize?: string | number;
  fontStyle?: string;
}

const TextWrapper = styled(Text)<TextWrapperProps>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

export const TYPE = {
  main(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />;
  },
  link(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />;
  },
  black(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />;
  },
  white(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />;
  },
  body(props: TextWrapperProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />;
  },
  largeHeader(props: TextWrapperProps) {
    return <TextWrapper fontWeight={600} fontSize={24} color={'text1'} {...props} />;
  },
  mediumHeader(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} fontSize={20} color={'text1'} {...props} />;
  },
  subHeader(props: TextWrapperProps) {
    return <TextWrapper fontWeight={400} fontSize={14} color={'text1'} {...props} />;
  },
  small(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} fontSize={11} color={'text1'} {...props} />;
  },
  blue(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'blue1'} {...props} />;
  },
  yellow(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />;
  },
  darkGray(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />;
  },
  gray(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />;
  },
  italic(props: TextWrapperProps) {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />;
  },
  error(props: TextWrapperProps & { error: boolean }) {
    return <TextWrapper fontWeight={500} color={props.error ? 'red1' : 'text2'} {...props} />;
  },
};
