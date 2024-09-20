import unzipper from 'unzip-stream';
import { Readable } from 'stream';
import { LokaliseApi } from '@lokalise/node-api';

export const sync = async () => {
  const lokalise = new LokaliseApi({ apiKey: process.env.LOKALISE_TOKEN });
  const response = await lokalise
    .files()
    .download('573753646401c545031640.21906048', {
      format: 'json',
      original_filenames: true,
      indentation: '2sp',
      json_unescaped_slashes: true,
      add_newline_eof: true,
      bundle_structure: 'i18n/%LANG_ISO%/translation.%FORMAT%',
    });

  const zip = await fetch(response.bundle_url);
  const zipSteam = Readable.fromWeb(zip.body);

  zipSteam.pipe(unzipper.Extract({ path: 'public/i18n' }));
};
