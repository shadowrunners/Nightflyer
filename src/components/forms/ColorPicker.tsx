import {
	Center,
	Flex,
	Input,
	InputGroup,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { FormCardNoBg } from './Form';
import { useController } from 'react-hook-form';
import { ControlledInput } from './types';
import { useMemo } from 'react';

export type ColorPickerFormProps = Omit<ColorPickerProps, 'value' | 'onChange'>;

export const SmallColorPickerForm: ControlledInput<
  ColorPickerFormProps,
  ColorPickerProps['value']
> = ({ control, controller, ...props }) => {
	const { field, fieldState } = useController(controller);
	const { value } = field;

	const memControl = useMemo(() => control, [control]);
	const memProps = useMemo(() => props, [props]);

	return (
		<FormCardNoBg {...memControl} error={fieldState.error?.message}>
			<Popover>
				<PopoverTrigger >
					<InputGroup >
						<Input
							autoComplete="off"
							variant="main"
							placeholder={value ?? 'Select a color'}
							{...field}
							value={field.value ?? ''}
						/>
					</InputGroup>
				</PopoverTrigger>

				<PopoverContent>
					<PopoverBody>
						<ColorPicker value={value} onChange={field.onChange} {...memProps} />
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</FormCardNoBg>
	);
};

export const ColorPickerForm: ControlledInput<ColorPickerFormProps, ColorPickerProps['value']> = ({
	control,
	controller,
	...props
}) => {
	const { field, fieldState } = useController(controller);
	const { value } = field;

	return (
		<FormCardNoBg {...control} error={fieldState.error?.message}>
			<SimpleGrid columns={{ base: 1, '3sm': 2 }} gap={2}>
				<Flex direction="column" gap={3}>
					<Center
						bg='transparent'
						display={{ base: 'none', '3sm': 'flex' }}
						minH="150px"
						rounded="xl"
						border="1px solid"
						borderColor="InputBorder"
						flex={1}
					>
						{value == null && (
							<Text fontSize="sm" color="TextSecondary">
                No Color
							</Text>
						)}
					</Center>
					<Input
						placeholder={value ?? 'Select a color'}
						variant="main"
						autoComplete="off"
						{...field}
						value={field.value ?? ''}
					/>
				</Flex>
				<ColorPicker value={field.value} onChange={field.onChange} {...props} />
			</SimpleGrid>
		</FormCardNoBg>
	);
};

export type ColorPickerProps = {
  value?: string | null;
  onChange?: (color: string) => void;
  supportAlpha?: boolean;
};

export function ColorPicker({ value, onChange, supportAlpha, ...rest }: ColorPickerProps) {
	const props: Partial<ColorPickerBaseProps<string>> = {
		color: value ?? undefined,
		onChange,
		style: {
			width: '100%',
		},
		...rest,
	};

	return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
