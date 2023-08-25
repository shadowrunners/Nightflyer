import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { GoodbyeFeature, UseFormRender } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';
import Embed from '@/components/forms/Embed';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import React from 'react';

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
			<>
				<SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
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
						placeholder="Type some text here..."
						{...register('embed.content')}
					/>
				</SimpleGrid>

				<div>
					<div>
						<Embed fullData={fullData} register={register} control={control} />
					</div>
				</div>
			</>
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

