import { Text, TextProps } from './Text';

export type ParagraphProps = Omit<TextProps<'p'>, 'as'>;

export const Paragraph = ({ ...otherProps }: ParagraphProps) => (
  <Text as="p" {...otherProps} />
);
