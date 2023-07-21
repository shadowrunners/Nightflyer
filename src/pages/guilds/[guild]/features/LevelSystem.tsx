import { ChannelSelectForm } from '@/components/forms/ChannelSelect';
import { LevellingFeature, UseFormRender } from '@/config/types';
import { TextAreaForm } from '@/components/forms/TextAreaForm';
import { SimpleGrid } from '@chakra-ui/layout';
import { useForm } from 'react-hook-form';

export const useLevellingSystem: UseFormRender<LevellingFeature> = (data, onSubmit) => {
  const { reset, handleSubmit, formState, control, register } = useForm<LevellingFeature>({
    shouldUnregister: false,
    defaultValues: {
      channel: data.channel,
      message: data.message,
    },
  });

  return {
    component: (
      <><SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
        <ChannelSelectForm
          control={{
            label: 'Channel',
            description: 'The channel where level up messages will sent in.',
          }}
          controller={{ control, name: 'channel' }} />
        <TextAreaForm
          control={{
            label: 'Message',
            description: 'The message that will be sent when a user levels up.'
          }}
          {...register('message')}
        />
      </SimpleGrid>
      </>
    ),
    onSubmit: handleSubmit(async (e) => {
      await onSubmit(
        JSON.stringify({
          channel: e.channel,
          message: e.message,
        })
      );

      reset(e);
    }),
    canSave: formState.isDirty,
    reset: () => reset(control._defaultValues),
  };
};


