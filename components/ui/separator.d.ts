import * as React from 'react';

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

export declare const Separator: React.ForwardRefExoticComponent<
  SeparatorProps & React.RefAttributes<HTMLDivElement>
>;
