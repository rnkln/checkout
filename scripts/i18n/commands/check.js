import p from 'path';
import fs from 'fs';
import ts from 'typescript';

import { log, group } from '../utils/log.js';
import { findNodesByPredicate } from '../utils/findNodesByPredicate.js';
import { isI18nCallExpression } from '../utils/isI18nCallExpression.js';

const languages = new Intl.DisplayNames(['en'], { type: 'language' });

const findTranslationKeys = () => {
  const tsConfigPath = ts.findConfigFile('./', ts.sys.fileExists);
  const tsConfigRaw = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  const tsConfig = ts.parseJsonConfigFileContent(
    tsConfigRaw.config,
    ts.sys,
    './'
  );

  const program = ts.createProgram(tsConfig.fileNames, tsConfig.options);
  const programTypeChecker = program.getTypeChecker();
  const programKeysFromTFunction = program
    .getSourceFiles()
    .filter((file) => !file.isDeclarationFile && !file.hasNoDefaultLib)
    .reduce((keys, file) => {
      findNodesByPredicate(file, isI18nCallExpression).forEach((node) => {
        const argument = node.arguments[0];
        const argumentType = programTypeChecker.getTypeAtLocation(argument);

        if (ts.isStringLiteral(argument)) {
          keys.push(argument.text);
        }

        if (ts.isIdentifier(argument)) {
          if (argumentType.isStringLiteral()) {
            keys.push(argumentType.value);
          }

          if (argumentType.isUnionOrIntersection()) {
            return argumentType.types
              .filter((type) => type.isStringLiteral())
              .forEach((type) => keys.push(type.value));
          }
        }
      });

      return keys;
    }, []);

  return programKeysFromTFunction;
};

const findTranslationDiffs = (locales, keys) =>
  locales.reduce(
    (diffs, locale) => ({
      ...diffs,
      [locale]: findTranslationDiffForLocale(locale, keys),
    }),
    []
  );

const findTranslationDiffForLocale = (locale, keys) => {
  const translation = readTranslationForLocale(locale);
  const empty = findTranslationKeysEmpty(translation, keys);
  const missing = findTranslationKeysMissing(translation, keys);
  const redundant = findTranslationKeysRedundant(translation, keys);

  return {
    empty,
    missing,
    redundant,
  };
};

const readTranslationForLocale = (locale) => {
  const config = ts.findConfigFile('./', ts.sys.fileExists);
  const dir = p.dirname(config);
  const path = p.resolve(dir, 'public', 'i18n', locale, 'translations.json');
  const contents = fs.readFileSync(path);

  return JSON.parse(contents);
};

const findTranslationKeysEmpty = (subject, keys = []) =>
  keys.filter((key) => subject[key] === '');

const findTranslationKeysMissing = (subject, keys = []) =>
  keys.filter((key) => !Object.prototype.hasOwnProperty.call(subject, key));

const findTranslationKeysRedundant = (subject, keys = []) =>
  Object.keys(subject).filter((key) => !keys.includes(key));

const findTranslationDiffsWithFailures = (
  diffs = {},
  { failOnEmpty, failOnMissing, failOnRedundant }
) =>
  Object.entries(diffs).filter(([locale, results]) => {
    if (failOnEmpty && results.empty.length > 0) {
      return true;
    }

    if (failOnMissing && results.missing.length > 0) {
      return true;
    }

    if (failOnRedundant && results.redundant.length > 0) {
      return true;
    }

    return false;
  });

const print = (diff) => {
  const [locale, { empty, missing, redundant }] = diff;
  const header = `${languages.of(locale)} (${locale})`;

  group(header, () => {
    empty.forEach((key) => log(`~ ${key}`, '#FF0000'));
    missing.forEach((key) => log(`- ${key}`, '#FF0000'));
    redundant.forEach((key) => log(`+ ${key}`, '#FF0000'));
  });
};

export const check = ({ failOnEmpty, failOnMissing, failOnRedundant }) => {
  const locales = ['en', 'da', 'no', 'sv'];
  const keys = findTranslationKeys();
  const diffs = findTranslationDiffs(locales, keys);
  const diffsWithFailures = findTranslationDiffsWithFailures(diffs, {
    failOnEmpty,
    failOnMissing,
    failOnRedundant,
  });

  if (diffsWithFailures.length > 0) {
    diffsWithFailures.forEach(print);
    process.exitCode = 1;
  }
};
