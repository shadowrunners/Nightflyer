'use client';

import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { RoleSelectForm } from '@/components/forms/RoleSelect';
import { TicketsFeature, UseFormRender } from '@/config/types';
import Embed from '@/components/forms/Embed';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

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
			<Fragment>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
					<ChannelSelectForm
						control={{
							label: 'Transcripts Channel',
							description: 'The channel where transcripts will be sent in.',
						}}
						controller={{ control, name: 'transcriptChannel' }}
					/>
					<RoleSelectForm
						control={{
							label: 'Assistant Role',
							description: 'The role that will be pinged when new tickets come in.',
						}}
						controller={{ control, name: 'assistantRole' }}
					/>
				</div>

				<Embed fullData={fullData} register={register} control={control}/>
			</Fragment>
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

