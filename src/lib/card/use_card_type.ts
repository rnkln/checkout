import { useMemo } from 'react';

export const isJCB = (number: string) => {
  const firstFour = Number.parseInt(number.slice(0, 4), 10);

  return firstFour >= 3528 && firstFour <= 3589;
};

export const isVisa = (number: string) => {
  const firstOne = Number.parseInt(number.slice(0, 1), 10);

  return firstOne === 4;
};

export const isAmex = (number: string) => {
  const firstTwo = Number.parseInt(number.slice(0, 2), 10);

  return firstTwo === 34 || firstTwo === 37;
};

export const isMastercard = (number: string) => {
  const firstTwo = Number.parseInt(number.slice(0, 2), 10);
  const firstFour = Number.parseInt(number.slice(0, 4), 10);

  return (
    (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720)
  );
};

export const isDiscover = (number: string) => {
  const firstTwo = Number.parseInt(number.slice(0, 2), 10);
  const firstThree = Number.parseInt(number.slice(0, 3), 10);
  const firstFour = Number.parseInt(number.slice(0, 4), 10);
  const firstSix = Number.parseInt(number.slice(0, 6), 10);

  return (
    firstTwo === 65 ||
    firstFour === 6011 ||
    (firstThree >= 644 && firstThree <= 649) ||
    (firstSix >= 622126 && firstSix <= 622925)
  );
};

export type CardType = (typeof paymentCardTypes)[number];

export const paymentCardTypes = [
  'visa',
  'mastercard',
  // 'amex',
  // 'jcb',
  // 'discover',
] as const;

export const paymentCardTesters: Record<CardType, (number: string) => boolean> =
  {
    visa: isVisa,
    mastercard: isMastercard,
    // jcb: isJCB,
    // amex: isAmex,
    // discover: isDiscover,
  };

export const useCardType = (number: string) =>
  useMemo(
    () => paymentCardTypes.find((type) => paymentCardTesters[type](number)),
    [number]
  );
