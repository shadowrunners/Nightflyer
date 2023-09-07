import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { AntiPhishingFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

export const useAntiPhishFeature: UseFormRender<AntiPhishingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<AntiPhishingFeature>({
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
						description: 'The channel where the anti-phishing module will send alerts.',
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

			reset(data);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

