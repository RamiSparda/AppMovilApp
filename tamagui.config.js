const { createTamagui } = require('tamagui');

const config = createTamagui({
  themes: {
    light: {
      background: '#fff',
      color: '#111',
    },
    dark: {
      background: '#111',
      color: '#fff',
    },
  },
  tokens: {
    color: {
      background: '#fff',
      primary: '#e5d6d2',
      text: '#111',
    },
    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 32,
    },
    size: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
      4: 32,
    },
    radius: {
      0: 0,
      1: 4,
      2: 8,
      3: 16,
    },
  },
  fonts: {
    body: {
      family: 'Arial',
      size: {
        4: 16,
        5: 20,
      },
      weight: {
        4: '400',
        7: '700',
      },
    },
  },
  shorthands: {
    p: 'padding',
    m: 'margin',
    bg: 'backgroundColor',
    c: 'color',
    f: 'flex',
    w: 'width',
    h: 'height',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    ai: 'alignItems',
    jc: 'justifyContent',
    fd: 'flexDirection',
    br: 'borderRadius',
  },
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
  },
  animations: {
    fast: 'ease-in 150ms',
    slow: 'ease-in 400ms',
  },
});

module.exports = config;