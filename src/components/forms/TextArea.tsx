'use client';

import { Form, FormField, FormItem, Textarea } from '@/components/ui';
import type { ControlledInput } from '@/types/formTypes';
import type { Props } from 'react-select';
import { useForm } from 'react-hook-form';

export const TextAreaForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
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
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<FormItem>
									<Textarea placeholder='Write a cool level up message here! ✨' {...field} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};
