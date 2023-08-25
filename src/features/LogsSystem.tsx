import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { LogsFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';

export const useLogsSystem: UseFormRender<LogsFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<LogsFeature>({
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
						description: 'The channel where logs will be sent in.',
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

