'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormRender } from '@Types';
import { ChannelSelectForm } from '@Forms';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
	channel: z.string(),
});
type LogsFeature = z.infer<typeof schema>;

export const useLogsSystem: UseFormRender<LogsFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<LogsFeature>({
		resolver: zodResolver(schema),
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
		},
	});

	return {
		component: (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<ChannelSelectForm
					control={{
						label: 'Channel',
						description: 'The channel where logs will be sent in.',
					}}
					controller={{ control, name: 'channel' }} />
			</div>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					channel: e.channel,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

