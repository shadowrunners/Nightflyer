import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import type { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { useController } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { ControlledInput } from './types';
import { useMemo } from 'react';


export type ColorPickerFormProps = Omit<ColorPickerProps, 'value' | 'onChange'>;

export const SmallColorPickerForm: ControlledInput<
    ColorPickerFormProps,
    ColorPickerProps['value']
> = ({ control, controller, ...props }) => {
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