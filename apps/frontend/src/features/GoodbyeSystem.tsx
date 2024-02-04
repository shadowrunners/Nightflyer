'use client';

import { ChannelSelectForm, TextAreaForm, Embed } from '@Forms';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';
import * as z from 'zod';

const schema = z.object({
	channel: z.string(),
	embed: z.object({
		content: z.string(),
		author: z.object({
			name: z.string(),
			iconURL: z.string(),
		}),
		color: z.string(),
		title: z.string(),
		description: z.string(),
		thumbnail: z.string(),
		image: z.string(),
		footer: z.object({
			text: z.string(),
			iconURL: z.string(),
		}),
	}),
});
type GoodbyeFeature = z.infer<typeof schema>;

export const useGoodbyeSystem: UseFormRender<GoodbyeFeature> = (data, onSubmit) => {
	const { register, reset, handleSubmit, formState, control, watch } = useForm<GoodbyeFeature>({
		resolver: zodResolver(schema),
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
							description: 'The channel where the goodbye message will be sent.',
						}}
						controller={{ control, name: 'channel' }}
					/>
					<TextAreaForm
						control={{
							label: 'Message',
							description: 'The message that will be sent alongside the embed.',
						}}
						controller={{ control, name: 'embed.content' }}
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

