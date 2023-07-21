import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { Option, SelectField } from '@/components/forms/SelectField';
import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { common } from '@/config/translations/common';
import { useGuildChannelsQuery } from '@/api/hooks';
import { MdRecordVoiceOver } from 'react-icons/md';
import { useController } from 'react-hook-form';
import { ChannelTypes } from '@/api/discord';
import { forwardRef, useMemo } from 'react';
import { ControlledInput } from './types';
import { GuildChannel } from '@/api/bot';
import { Override } from '@/utils/types';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormCard } from './Form';

/** Renders the options. */
const render = (channel: GuildChannel | undefined): Option => {
  const icon = channel?.type === ChannelTypes.GUILD_STAGE_VOICE || channel?.type === ChannelTypes.GUILD_VOICE ? (
    <Icon as={MdRecordVoiceOver} />
  ) : ( <ChatIcon /> );

  return {
    label: channel?.name ?? null,
    value: channel?.id ?? null,
    icon,
  };
};

/** Maps the channels. */
function mapOptions(channels: GuildChannel[]) {
  const categories: { [key: string]: GuildChannel[] } = {};
  const roots: GuildChannel[] = [];

  for (const channel of channels) {
    if (channel.category == null) roots.push(channel);
    else {
      if (!categories[channel.category]) categories[channel.category] = [channel];
      else categories[channel.category].push(channel);
    }
  }

  //map channels into select menu options
  return roots.map((channel) => {
    const renderedChannel = render(channel);

    if (channel.type === ChannelTypes.GUILD_CATEGORY) {
      const options = categories[channel.id]?.map(render) || [];
      return { ...renderedChannel, options };
    }
    
    return renderedChannel;
  });
}

type Props = Override<
  SelectProps<Option, false>,
  {
    value?: string;
    onChange: (v: string) => void;
  }
>;

export const ChannelSelect = forwardRef<SelectInstance<Option, false>, Props>(
  ({ value, onChange, ...rest }, ref) => {
    const guild = useRouter().query.guild as string;
    const channelsQuery = useGuildChannelsQuery(guild);
    const isLoading = channelsQuery.isLoading;

    const selected = useMemo(() => {
      return value !== undefined ? channelsQuery.data?.find((c) => c.id === value) : null;
    }, [value, channelsQuery.data])
 
    const options = useMemo(() => {
      return channelsQuery?.data !== undefined ? mapOptions(channelsQuery.data) : [];
    }, [channelsQuery.data]);

    return (
      <SelectField<Option>
        isDisabled={isLoading}
        isLoading={isLoading}
        placeholder={<common.T text="select channel" />}
        value={selected !== null ? render(selected) : null}
        options={options}
        onChange={(e) => e !== null && onChange(e.value as string)}
        ref={ref}
        {...rest}
      />
    );
  }
);

ChannelSelect.displayName = 'ChannelSelect';

export const ChannelSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
  control,
  controller,
  ...props
}) => {
  const { field, fieldState } = useController(controller);

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <ChannelSelect {...field} {...props} />
    </FormCard>
  );
};
