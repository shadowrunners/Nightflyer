import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { BsChatLeftText as ChatIcon } from 'react-icons/bs';
import { useGuildChannelsQuery } from '@/api/hooks';
import { MdRecordVoiceOver } from 'react-icons/md';
import { ChannelTypes, GuildChannel, Override } from '@/types/types';
import { forwardRef, useMemo } from 'react';
import { ControlledInput } from './types';
import { Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Form, FormField, FormItem } from '@/components/ui/form';
import { SelectComponent } from "@/components/test";
import { useForm } from "react-hook-form";

/** Renders the options. */
const render = (channel: GuildChannel | undefined) => {
	const icon = channel?.type === ChannelTypes.GUILD_STAGE_VOICE || channel?.type === ChannelTypes.GUILD_VOICE ? (
		<Icon as={MdRecordVoiceOver} />
	) : (<ChatIcon />);

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
  SelectProps<any, false>,
  {
    value?: string;
    onChange: (v: string) => void;
  }
>;

export const ChannelSelect = forwardRef<SelectInstance<any, false>, Props>(
	({ value, onChange, ...rest }, ref) => {
		const guild = useRouter().query.guild as string;
		const channelsQuery = useGuildChannelsQuery(guild);
		const isLoading = channelsQuery.isLoading;

		const selected = useMemo(() => {
			return value !== undefined ? channelsQuery.data?.find((c) => c.id === value) : null;
		}, [value, channelsQuery.data]);

		const options = useMemo(() => {
			return channelsQuery?.data !== undefined ? mapOptions(channelsQuery.data) : [];
		}, [channelsQuery.data]);

		return (
			<SelectComponent
				createAble={true}
				isLoading={isLoading}
				isDisabled={isLoading}
				isClearable={true}
				// @ts-ignore
				// Have no idea why it errors out if this is removed.
				placeholder={'Select a channel.'}
				value={selected !== null ? render(selected) : null}
				options={options}
				onChange={(e) => e !== null && onChange(e.value as string)}
				ref={ref}
				{...rest}
			/>
		)
	},
);

/**
 * <SelectField<Option>
 *                isDisabled={isLoading}
 *                isLoading={isLoading}
 *                placeholder={<common.T text="select channel" />}
 *                value={selected !== null ? render(selected) : null}
 *                options={options}
 *                onChange={(e) => e !== null && onChange(e.value as string)}
 *                ref={ref}
 *                {...rest}
 *            />
 *
 */

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
					<p className="text-gray-500">{control.description}</p>
				</label>
				<div className='flex-1 self-stretch mt-2' />
				<Form {...form}>
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<FormItem>
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

/**
 *
 *
 *
 *
 *        NEW ONE:
 */
