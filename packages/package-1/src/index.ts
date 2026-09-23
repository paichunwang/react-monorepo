export interface ButtonProps {
  label: string;
  disabled?: boolean;
}

export const formatLabel = (label: string): string => {
  return label.trim().toUpperCase();
};
