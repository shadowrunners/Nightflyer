import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { RoleSelectForm } from '@/components/forms/RoleSelect';
import { TicketsFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import Embed from '@/components/forms/Embed';
import { useForm } from 'react-hook-form';

export const useTicketSystem: UseFormRender<TicketsFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, register, watch, formState, control } = useForm<TicketsFeature>({
		shouldUnregister: false,
		defaultValues: {
			transcriptChannel: data.transcriptChannel,
			assistantRole: data.assistantRole,
			embed: data.embed,
		},
	});

	const fullData = watch();

	return {
		component: (
			<><SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
				<ChannelSelectForm
					control={{
						label: 'Transcripts Channel',
						description: 'The channel where transcripts will be sent in.',
					}}
					controller={{ control, name: 'transcriptChannel' }} />
				<RoleSelectForm
					control={{
						label: 'Assistant Role',
						description: 'The role that will be pinged when new tickets come in.',
					}}
					controller={{ control, name: 'assistantRole' }}
				/>
			</SimpleGrid>

			<div>
				<div>
					<Embed fullData={fullData} register={register} control={control}/>
				</div>
			</div>
			</>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					transcriptChannel: e.transcriptChannel,
					assistantRole: e.assistantRole,
					embed: e.embed,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

