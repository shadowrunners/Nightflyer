'use client';

import { Popover, PopoverTrigger, PopoverContent, Input } from '@/components/ui';
import type { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ControlledInput } from '@/types/formTypes';
import { useController } from 'react-hook-form';
import { useMemo } from 'react';

type ColorPickerFormProps = Omit<ColorPickerProps, 'value' | 'onChange'>;

export const SmallColorPickerForm: ControlledInput<
    ColorPickerFormProps,
    ColorPickerProps['value']
> = ({ controller, ...props }) => {
	const { field } = useController(controller);
	const { value } = field;

	const memProps = useMemo(() => props, [props]);

	return (
		<Popover>
			<div className='flex flex-col width-[100%] relative shadow text-white'>
				<PopoverTrigger>
					<Input
						className='text-white'
						autoComplete="off"
						placeholder={value ?? 'Select a color'}
						{...field}
						value={field.value ?? ''}
					/>
				</PopoverTrigger>

				<PopoverContent>
					<ColorPicker value={value} onChange={field.onChange} {...memProps} />
				</PopoverContent>
			</div>
		</Popover>
	);
};

type ColorPickerProps = {
    value?: string | null;
    onChange?: (color: string) => void;
    supportAlpha?: boolean;
};

function ColorPicker({ value, onChange, supportAlpha, ...rest }: ColorPickerProps) {
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