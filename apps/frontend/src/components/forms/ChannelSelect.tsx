'use client';

import type { APIChannel, OnChangeProps, Override } from '@/types/types';
import type { ControlledInput } from '@/types/formTypes';
import { ChannelTypes } from '@/types/types';

import { Form, FormControl, FormField, FormItem, SelectMenu, Spacer } from '@UI';
import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { useGuildChannelsQuery } from '@/utils/API/hooks';
import { Props as SelectProps } from 'react-select';
import { MdRecordVoiceOver } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import MultipleSelector, { Option } from '@/components/ui/multiselecttest';

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
	const finalChannels = channels.filter((channel) => channel.type !== ChannelTypes.GUILD_VOICE && channel.type !== ChannelTypes.GUILD_STAGE_VOICE);
	const categories: { [key: string]: APIChannel[] } = {};
	const roots: APIChannel[] = [];

	for (const channel of finalChannels) {
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
    onChange: (v: string | string[]) => void;
  }
>;

export const MultiChannelSelect = ({
	value, onChange, ...rest
}: {
	value: { label: string, value: string }[] | string[];
	onChange: (v: string | OnChangeProps) => void;
}) => {
	const guild = usePathname().split('/')[3];
	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const selected = useMemo(() => {
		if (Array.isArray(value)) {
			if (value.length > 0 && typeof value[0] === 'string') return channelsQuery.data?.filter((channel) => (value as string[]).includes(channel.id)) ?? [];
		}
		else return null;
	}, [channelsQuery.data, value]);

	const options = useMemo(() => {
		return channelsQuery.data?.map((channel) => ({ label: channel.name, value: channel.id }));
	}, [channelsQuery.data]);

	return (
		<SelectMenu
			createAble={true}
			isLoading={isLoading}
			isDisabled={isLoading}
			isMulti={true}
			isClearable={true}
			value={(selected as APIChannel[])?.map(render).map((option) => ({ label: option.label, value: option.value, icon: option.icon }))}
			placeholder='Select a channel.'
			options={options}
			onChange={(e) => e !== null && onChange((e as OnChangeProps).map((option) => ({ label: option.label, value: option.value })))}
			{...rest}
		/>
	);
};

MultiChannelSelect.displayName = 'MultiChannelSelect';

export const ChannelSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = usePathname().split('/')[3];

	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const finalChannels = channelsQuery.data?.filter((channel) => channel.type !== ChannelTypes.GUILD_VOICE && channel.type !== ChannelTypes.GUILD_STAGE_VOICE && channel.type !== ChannelTypes.GUILD_CATEGORY);

	const selected = useMemo(() => {
		return props.defaultValue !== undefined ? finalChannels?.find((c) => c.id === props.defaultValue?.toString()) : null;
	}, [props.defaultValue, finalChannels]);

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
									<Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='placeholder' defaultValue={selected?.id} />
											</SelectTrigger>
										</FormControl>
										<SelectContent className='black2 text-white'>
											<SelectGroup className='font-poppins m-2'>
												<SelectLabel>Text Channels</SelectLabel>
												{finalChannels?.map((channel) => (
													<SelectItem className='font-poppins' value={channel.id.toString()}>{channel.name}</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};

export const MultiChannelSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();

	const guild = usePathname().split('/')[3];
	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const selected = useMemo(() => {
		if (Array.isArray(props.defaultValue)) {
			if (props.defaultValue.length > 0 && typeof props.defaultValue[0] === 'string') return channelsQuery.data?.filter((channel) => (props.defaultValue as unknown as string[]).includes(channel.id)) ?? [];
		}
		else return null;
	}, [channelsQuery.data, props.defaultValue]);

	const options = useMemo(() => {
		return channelsQuery.data?.map((channel) => ({ label: channel.name, value: channel.id })) as Option[];
	}, [channelsQuery.data]);
	console.log(options);

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
								<FormItem>
									<MultipleSelector
										options={options}
										disabled={isLoading}
										className='text-white'
										{...field}
									/>
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};