import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import { GoodbyeFeature, UseFormRender } from '@/config/types';
import Embed from '@/components/forms/Embed';
import { useForm } from 'react-hook-form';
import { Fragment } from 'react';

export const useGoodbyeSystem: UseFormRender<GoodbyeFeature> = (data, onSubmit) => {
	const { register, reset, handleSubmit, formState, control, watch } = useForm<GoodbyeFeature>({
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

