import Head from 'next/head';
import { AppProps } from 'next/app';
import { theme } from '@setup/theme.css';
import { Query } from '@setup/Query';
import { Routing } from '@setup/Routing';
import { SharpGrotesk } from '@setup/fonts';
import { Localization } from '@setup/Localization';
import clsx from 'clsx';

export const appIconSizes = [16, 32];

export default ({ Component, pageProps }: AppProps) => {
  const className = clsx(theme, SharpGrotesk.variable);

  return (
    <div id="__app" className={className}>
      <Head>
        <title>Lunar</title>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1"
        />

        {appIconSizes.map((size) => (
          <link
            key={size}
            rel="icon"
            type="image/png"
            href={`/icon/${size}x${size}.png`}
            sizes={`${size}x${size}`}
          />
        ))}
      </Head>

      <Routing>
        <Query>
          <Localization>
            <Component {...pageProps} />
          </Localization>
        </Query>
      </Routing>
    </div>
  );
};
