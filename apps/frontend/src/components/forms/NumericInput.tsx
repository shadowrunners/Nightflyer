'use client';

import { Form, FormField, FormItem, Input } from '@UI';
import type { ControlledInput } from '@Types';
import type { Props } from 'react-select';
import { useForm } from 'react-hook-form';

export const NumericTextForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
	control,
	controller,
}) => {
	const form = useForm();

	return (
		<div className='grid gap-3'>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow black2 rounded-3xl">
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">{control.label}</h2>
					<p className="text-gray-500">{control.description}</p>
				</label>
				<div className='flex-1 self-stretch mt-2' />
				<Form {...form}>
					<FormField
						control={controller.control}
						name={controller.name}
						render={({ field }) => (
							<FormItem>
								<Input
									placeholder='Input a number. ✨'
									type='text'
									onKeyDown={(event) => {
										if (!(event.key === 'Backspace' || /[0-9]/.test(event.key))) {
											event.preventDefault();
										}
									}}
									maxLength={3}
									{...field}
								/>
							</FormItem>
						)}
					/>
				</Form>
			</div>
		</div>
	);
};