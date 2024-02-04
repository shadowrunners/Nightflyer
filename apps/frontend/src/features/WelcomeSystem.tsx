'use client';

import { ChannelSelectForm, TextAreaForm, Embed } from '@Forms';
import type { WelcomeFeature } from '@Features';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

export const useWelcomeFeature: UseFormRender<WelcomeFeature> = (data, onSubmit) => {
	const { register, reset, handleSubmit, formState, control, watch } = useForm<WelcomeFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			embed: data.embed,
		},
	});

	const fullData = watch();

	return {
		component: (
			<Fragment>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
					<ChannelSelectForm
						control={{
							label: 'Channel',
							description: 'The channel where the welcome message will be sent.',
						}}
						controller={{ control, name: 'channel' }}
					/>
					<TextAreaForm
						control={{
							label: 'Message',
							description: 'The message that will be sent alongside the embed.',
						}}
						controller={{
							control,
							name: 'embed.content',
						}}
					/>
				</div>

				<Embed fullData={fullData} register={register} control={control} />
			</Fragment>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					embed: e.embed,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

