'use client';

import { ChannelSelectForm, TextAreaForm } from '@/components/forms';
import { MultiChannelSelectForm } from '@/components/forms/ChannelSelect';
import { LevelTable } from '@/components/forms/LevelTable';
import { MultiRoleSelectForm } from '@/components/forms/RoleSelect';
import type { LevellingFeature } from '@/types/features';
import type { UseFormRender } from '@/types/formTypes';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

export const useLevellingSystem: UseFormRender<LevellingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control, register } = useForm<LevellingFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			message: data.message,
			restrictedChannels: data.restrictedChannels,
			restrictedRoles: data.restrictedRoles,
			roleRewards: data.roleRewards,
		},
	});

	return {
		component: (
			<Fragment>
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
						controller={{ control, name: 'message' }}
					/>
					<MultiRoleSelectForm
						control={{
							label: 'Unlevelable Roles',
							description: 'This controls what roles will not receive any XP.',
						}}
						controller={{ control, name: 'restrictedRoles' }}
					/>
					<MultiChannelSelectForm
						control={{
							label: 'Unlevelable Channels',
							description: 'The controls what channels XP can\'t be received in.',
						}}
						controller={{ control, name: 'restrictedChannels' }}
					/>
				</div>


				<div><LevelTable control={{
					label: 'Role Rewards',
					description: 'PLACEHOLDER',
				}}
				controller={{
					control,
					name: 'roleRewards',
				}}
				initialData={[]}
				register={register} /></div>
			</Fragment>
		),
		onSubmit: handleSubmit(async (e) => {
			console.log(e);
			const mappedChannel = e.restrictedChannels?.map((channel) => channel.value);
			const mappedRoles = e.restrictedRoles?.map((role) => role.value);

			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					message: e.message,
					restrictedChannels: mappedChannel,
					restrictedRoles: mappedRoles,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};
