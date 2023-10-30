'use client';

import type { APIChannel, Override } from '@/types/types';
import type { ControlledInput } from '@/types/formTypes';
import { ChannelTypes } from '@/types/types';

import { Form, FormField, FormItem, SelectMenu, Spacer } from '@/components/ui';
import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { useGuildChannelsQuery } from '@/utils/API/hooks';
import { Props as SelectProps } from 'react-select';
import { MdRecordVoiceOver } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

/** Renders the options. */
const render = (channel: APIChannel | undefined) => {
	const icon = channel?.type === ChannelTypes.GUILD_STAGE_VOICE || channel?.type === ChannelTypes.GUILD_VOICE ? (
		<MdRecordVoiceOver />
	) : (<ChatIcon />);

	return {
		label: channel?.name ?? null,
		value: channel?.id ?? null,
		icon,
	};
};

/** Maps the channels. */
function mapOptions(channels: APIChannel[]) {
	const categories: { [key: string]: APIChannel[] } = {};
	const roots: APIChannel[] = [];

	for (const channel of channels) {
		if (channel.category == null) roots.push(channel);
		else if (!categories[channel.category]) categories[channel.category] = [channel];
		else categories[channel.category].push(channel);
	}

	// map channels into select menu options
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
  SelectProps<never, false>,
  {
    value?: string;
    onChange: (v: string) => void;
  }
>;

export const ChannelSelect = ({
	value, onChange, ...rest
}: {
	value: string;
	onChange: (v: string) => void;
}) => {
	const guild = usePathname().split('/')[3];
	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const selected = useMemo(() => {
		return value !== undefined ? channelsQuery.data?.find((c) => c.id === value) : null;
	}, [value, channelsQuery.data]);

	const options = useMemo(() => {
		return channelsQuery?.data !== undefined ? mapOptions(channelsQuery.data) : [];
	}, [channelsQuery.data]);

	return (
		<SelectMenu
			createAble={true}
			isLoading={isLoading}
			isDisabled={isLoading}
			placeholder='Select a channel.'
			value={selected !== null ? render(selected) : null}
			options={options}
			onChange={(e) => e !== null && onChange((e as { value: string }).value)}
			{...rest}
		/>
	);
};

ChannelSelect.displayName = 'ChannelSelect';

export const ChannelSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();

	return (
		<div className='grid gap-3'>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow black2 rounded-3xl">
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">{control.label}</h2>
					<p className="text-gray-500 mb-3">{control.description}</p>
				</label>
				<Spacer />
				<Form {...form}>
					<form className='text-white'>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<FormItem className='text-white'>
									<ChannelSelect {...field} {...props} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};