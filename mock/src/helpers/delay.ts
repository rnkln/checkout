import { NextFunction, Request, Response } from 'express';
import timers from 'timers';

const delay = (min: number, max?: number) => {
  const useRandomDelay = max !== undefined;

  return function (req: Request, res: Response, next: NextFunction) {
    const send = res.send;
    const sendFile = res.sendFile;

    const time = useRandomDelay
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : min;

    res.send = function () {
      var args = arguments;

      timers.setTimeout(function () {
        send.apply(res, args as any);
      }, time);
    } as any;

    res.sendFile = function () {
      var args = arguments;

      timers.setTimeout(function () {
        sendFile.apply(res, args as any);
      }, time);
    } as any;

    next();
  };
};

export default delay;
