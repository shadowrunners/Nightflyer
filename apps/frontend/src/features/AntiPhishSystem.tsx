'use client';

import type { AntiPhishingFeature } from '@Features';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';

export const useAntiPhishFeature: UseFormRender<AntiPhishingFeature> = (data) => {
	const { reset, handleSubmit, formState, control } = useForm<AntiPhishingFeature>({
		shouldUnregister: false,
		defaultValues: {},
	});

	return {
		component: (
			<div className='flex items-center justify-center w-full h-full'>
				<h1 className='font-poppins font-bold'>This feature doesn't have any configurable options. In order to receive alerts regarding Anti-Phishing, please enable Logs.</h1>
			</div>
		),
		onSubmit: handleSubmit(async () => {
			reset(data);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

