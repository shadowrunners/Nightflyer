'use client';

import type {
	ControlledInput,
	SelectMenuProps,
	SelectMenuOptionArray,
} from '@Types';
import {
	ChannelTypes,
} from '@Types';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	SelectMenu,
	Spacer,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@UI';
import { useGuildChannelsQuery } from '@Hooks';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

export const ChannelSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = usePathname().split('/')[3];

	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const finalChannels = useMemo(() => {
		return channelsQuery.data?.filter((channel) => channel.type !== ChannelTypes.GUILD_VOICE && channel.type !== ChannelTypes.GUILD_STAGE_VOICE && channel.type !== ChannelTypes.GUILD_CATEGORY)
	}, [channelsQuery]);

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

export const MultiChannelSelect = ({
	value, onChange, ...rest
}: {
	value: SelectMenuOptionArray | string[];
	onChange: (channel: SelectMenuOptionArray) => void;
}) => {
	const guild = usePathname().split('/')[3];
	const channelsQuery = useGuildChannelsQuery(guild);
	const isLoading = channelsQuery.isLoading;

	const options = useMemo(() => {
		return channelsQuery.data?.map((channel) => ({ label: channel.name, value: channel.id }));
	}, [channelsQuery.data]);

	const selected = useMemo(() => {
		// handles cases where value is an array of strings
		if (value.length > 0 && typeof value[0] === 'string') {
			return options?.filter((channel) => (value as string[]).includes(channel.value)) ?? [];
		}
		// handles cases where value is an array of labels and values. without this, you'll get empty values.
		// was a fucking pain in the ass to figure out. fuck this.
		else {
			const mappedValues = (value as SelectMenuOptionArray).map((channel) => channel.value) ?? [];
			return options?.filter((channel) => mappedValues.includes(channel.value)) ?? [];
		}
	}, [options, value]);

	return (
		<SelectMenu
			isLoading={isLoading}
			isDisabled={isLoading}
			value={selected}
			placeholder='Select a channel.'
			options={options}
			onChange={(e) => e !== null && onChange((e as SelectMenuOptionArray))}
			{...rest}
		/>
	);
};

export const MultiChannelSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
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
								<FormItem>
									<MultiChannelSelect {...field} {...props} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};