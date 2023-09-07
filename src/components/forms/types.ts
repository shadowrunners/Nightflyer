import type { Override } from '@/types/types';
import type { ReactElement } from 'react';
import type { FieldValues, Path, UseControllerProps, FieldPathByValue } from 'react-hook-form';
import { ReactNode } from 'react';

type FormProps = {
    required?: boolean;
    error?: string;
    label?: string | ReactNode;
    description?: string | ReactNode;
    children: ReactNode;
};

type ControlledInputProps<
  T,
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
> = Override<
  T,
  {
    control: Omit<FormProps, 'error' | 'children'>;
    controller: UseControllerProps<TFieldValue, TName>;
  }
>;

export type ControlledInput<Props, V = unknown> = <
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, V>
>(
  props: ControlledInputProps<Props, TFieldValues, TName>
) => ReactElement;

export type WithControl<T> = T & {
  control: Omit<FormProps, 'children'>;
};
