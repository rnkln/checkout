import { ReactNode } from 'react';
import { Flex } from '@matter/flex';

import * as classes from './Layout.css';

export type LayoutProps = {
  children?: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    className={classes.root}
  >
    {children}
  </Flex>
);
