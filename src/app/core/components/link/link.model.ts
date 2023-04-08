import {ComponentProps, PropsWithChildren} from 'react';

export interface ILinkProps extends PropsWithChildren {
  url: string;
  label: string;
  target?: ComponentProps<'a'>['target'] | '_route';
}
