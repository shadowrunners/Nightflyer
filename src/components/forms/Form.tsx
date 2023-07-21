import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode, useMemo, memo } from 'react';


export const Form: React.FC<FormControlProps> = memo((props) => {
  const memProps = useMemo(() => props, [props]);

  return (
    <FormControl
      as={Flex}
      direction="column"
      bg="CardBackground"
      rounded="3xl"
      p={5}
      boxShadow="normal"
      {...memProps}
    >
      {props.children}
    </FormControl>
  );
})

export const FormNoBg: React.FC<FormControlProps> = memo((props) => {
  const memProps = useMemo(() => props, [props]);

  return (
    <FormControl
      as={Flex}
      direction="column"
      rounded="3xl"
      p={5}
      boxShadow="normal"
      {...memProps}
    >
      {props.children}
    </FormControl>
  );
})

export type FormCardProps = {
  required?: boolean;
  baseControl?: FormControlProps;
  /**
   * Show an error message if not null
   */
  error?: string;
  label?: string | ReactNode;
  description?: string | ReactNode;

  children: ReactNode;
};

export function FormCard({
  label,
  description,
  required,
  baseControl,
  children,
  error,
}: FormCardProps) {
  return (
    <Form isRequired={required} isInvalid={error != null} {...baseControl}>
      <FormLabel fontSize={{ base: '16px', md: 'lg' }} fontWeight="medium" mb={0}>
        {label}
      </FormLabel>
      <Text fontSize={{ base: 'sm', md: 'md' }} color="TextSecondary">
        {description}
      </Text>
      <Spacer mt={2} />
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </Form>
  );
}

export function FormCardNoBg({
  required,
  baseControl,
  children,
  error,
}: FormCardProps) {
  return (
    <FormNoBg isRequired={required} isInvalid={error != null} {...baseControl}>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormNoBg>
  );
}

export type FormCardControllerProps<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
> = {
  control: Omit<FormCardProps, 'error' | 'children'>;
  controller: UseControllerProps<TFieldValue, TName>;
  render: ControllerProps<TFieldValue, TName>['render'];
};

export function FormCardController<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
>({ control, controller, render }: FormCardControllerProps<TFieldValue, TName>) {
  return (
    <Controller
      {...controller}
      render={(props) => (
        <FormCard {...control} error={props.fieldState.error?.message}>
          {render(props)}
        </FormCard>
      )}
    />
  );
}

