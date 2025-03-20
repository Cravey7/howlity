import * as React from 'react';

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delayDuration?: number;
};

export declare const Tooltip: React.ForwardRefExoticComponent<
  TooltipProps & React.RefAttributes<HTMLDivElement>
>;
