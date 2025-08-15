// Local Fonts
import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [
    {
      path: './satoshi/Satoshi-Regular.otf',
      weight: '400',
    },
  ],
  variable: '--font-satoshi',
});

export const dante = localFont({
  src: [
    {
      path: './dante/DanteMTStd-Regular.ttf',
      weight: '400',
    },
  ],
  variable: '--font-dante',
});
