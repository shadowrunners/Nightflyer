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
import { useGuildId } from '@/utils/util';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

export const ChannelSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = useGuildId();

	const { data, isLoading } = useGuildChannelsQuery(guild);

	const options = useMemo(() => {
		return data?.filter((channel) => channel.type === ChannelTypes.GUILD_TEXT);
	}, [data]);

	return (
		<div className={`grid gap-3 ${props}`}>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow black2 rounded-3xl">
				<label className="block text-start mr-3 transition-all duration-300 opacity-100 text-base font-medium mb-0">
					<h2 className="text-2xl font-semibold">{control.label}</h2>
					<p className="text-gray-500 mb-3">{control.description}</p>
				</label>
				<Spacer />
				<Form {...form}>
					<FormField
						control={controller.control}
						name={controller.name}
						render={({ field }) => {
							const selected = options?.find((c) => c.id === field.value);

							return (
								<FormItem className='text-white'>
									<Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a channel.' defaultValue={selected?.id} key={selected?.id} />
											</SelectTrigger>
										</FormControl>
										<SelectContent className='black2 text-white'>
											<SelectGroup className='font-poppins m-2'>
												<SelectLabel>Text Channels</SelectLabel>
												{options?.map((channel) => (
													<SelectItem className='font-poppins' value={channel.id} key={channel.id}>{channel.name}</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormItem>
							);
						}}
					/>
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
	const guild = useGuildId();
	const { data, isLoading } = useGuildChannelsQuery(guild);

	const options = useMemo(() => {
		const channels = data?.filter((channel) => channel.type === ChannelTypes.GUILD_TEXT);
		return channels?.map((channel) => ({ label: channel.name, value: channel.id }));
	}, [data]);

	const selected = useMemo(() => {
		const selectedValues = new Set(value.map((channel) => typeof channel === 'string' ? channel : channel?.value));
		return options?.filter((channel) => selectedValues.has(channel?.value));
	}, [options, value]);

	return (
		<SelectMenu
			isLoading={isLoading}
			isDisabled={isLoading}
			value={selected}
			placeholder='Select a channel.'
			options={options}
			onChange={(e) => onChange((e as SelectMenuOptionArray))}
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
					<FormField
						control={controller.control}
						name={controller.name}
						render={({ field }) => (
							<FormItem>
								<MultiChannelSelect {...field} {...props} />
							</FormItem>
						)}
					/>
				</Form>
			</div>
		</div>
	);
};
