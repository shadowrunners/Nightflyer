'use client';

import { ChannelSelectForm, TextAreaForm } from '@/components/forms';
import type { LevellingFeature } from '@/types/features';
import type { UseFormRender } from '@/types/formTypes';
import { useForm } from 'react-hook-form';

export const useLevellingSystem: UseFormRender<LevellingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<LevellingFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			message: data.message,
		},
	});

	return {
		component: (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<ChannelSelectForm
					control={{
						label: 'Channel',
						description: 'The channel where level up messages will sent in.',
					}}
					controller={{ control, name: 'channel' }}
				/>
				<TextAreaForm
					control={{
						label: 'Message',
						description: 'The message that will be sent when a user levels up.',
					}}
					controller={{
						control,
						name: 'message',
					}}
				/>
			</div>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					message: e.message,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

