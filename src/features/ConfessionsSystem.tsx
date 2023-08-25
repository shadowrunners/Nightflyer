import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { ConfessionsFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';

export const useConfessionSystem: UseFormRender<ConfessionsFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<ConfessionsFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
		},
	});

	return {
		component: (
			<><SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
				<ChannelSelectForm
					control={{
						label: 'Channel',
						description: 'The channel where confessions will sent in.',
					}}
					controller={{ control, name: 'channel' }} />
			</SimpleGrid>
			</>
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

