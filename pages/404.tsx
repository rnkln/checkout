import { Flex } from '@matter/flex';
import { Heading } from '@matter/typography';
import { Layout } from '@lib/layout/Layout';

export default () => (
  <Layout>
    <Flex gap={2} alignItems="center">
      <Heading type="h1">404</Heading>

      <Flex style={{ width: 1, background: 'black', alignSelf: 'stretch' }} />

      <Heading type="h2">This page could not be found.</Heading>
    </Flex>
  </Layout>
);
