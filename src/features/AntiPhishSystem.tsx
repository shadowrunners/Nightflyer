import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { AntiPhishingFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import {Fragment} from "react";

export const useAntiPhishFeature: UseFormRender<AntiPhishingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<AntiPhishingFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
		},
	});

	return {
		component: (
			<Fragment>
				<SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
					<ChannelSelectForm
						control={{
							label: 'Channel',
							description: 'The channel where the anti-phishing module will send alerts.',
						}}
						controller={{ control, name: 'channel' }} />
				</SimpleGrid>
			</Fragment>
		),
		onSubmit: handleSubmit(async (e) => {
			// eslint-disable-next-line no-shadow
			const data = await onSubmit(
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

