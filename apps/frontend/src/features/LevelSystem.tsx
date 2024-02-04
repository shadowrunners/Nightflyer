'use client';

import { ChannelSelectForm, MultiChannelSelectForm, MultiRoleSelectForm, TextAreaForm } from '@Forms';
import type { LevellingFeature } from '@Features';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

export const useLevellingSystem: UseFormRender<LevellingFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<LevellingFeature>({
		shouldUnregister: false,
		defaultValues: {
			channel: data.channel,
			message: data.message,
			restrictedChannels: data.restrictedChannels,
			restrictedRoles: data.restrictedRoles,
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
			</Fragment>
		),
		onSubmit: handleSubmit(async (e) => {
			const mappedChannels = new Set(e.restrictedChannels?.map((c) => typeof c === 'string' ? c : c?.value));
			const mappedRoles = new Set(e.restrictedRoles?.map((r) => typeof r === 'string' ? r : r?.value));

			await onSubmit(
				JSON.stringify({
					channel: e.channel,
					message: e.message,
					restrictedChannels: Array.from(mappedChannels),
					restrictedRoles: Array.from(mappedRoles),
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};
