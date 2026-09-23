import { formatLabel, type ButtonProps } from '@my-org/package-1';

export interface CardProps {
  title: string;
  buttonOptions: ButtonProps;
}

export const renderCardHeader = (title: string, button: ButtonProps): string => {
  return `${title} - ${formatLabel(button.label)}`;
};
