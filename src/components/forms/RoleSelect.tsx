'use client';

import { Form, FormField, FormItem, SelectMenu } from '@/components/ui';
import { Props as SelectProps } from 'react-select';
import { useGuildRolesQuery } from '@/utils/API/hooks';
import { useForm } from 'react-hook-form';
import { BsPeopleFill } from 'react-icons/bs';
import { ControlledInput } from '@/types/formTypes';
import { Override } from '@/types/types';
import { usePathname } from 'next/navigation';
import { toRGB } from '@/utils/util';
import { APIRole } from '@/types/types';
import { useMemo } from 'react';
import Image from 'next/image';


type Props = Override<
  SelectProps<never, false>,
  {
    value?: string;
    onChange: (role: string) => void;
  }
>;

function render(role: APIRole) {
	const iconColor = toRGB(role.color);
	const icon = role.icon?.iconUrl ? (<Image alt="icon" src={role.icon.iconUrl} className={`bg-${iconColor} w-[25px] h-[25px]`} />) : (<BsPeopleFill color={iconColor} className='w-[20px] h-[20px]' />);

	return {
		value: role.id,
		label: role.name,
		icon,
	};
}

export const RoleSelect = (props: Props) => {
	const { value, onChange, ...rest } = props;
	const guild = usePathname().split('/')[3];

	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	const selected = useMemo(() => rolesQuery.data?.find((role) => role.id === value) ?? null, [
		rolesQuery.data,
		value,
	]);

	const options = useMemo(() => rolesQuery.data?.map(render) ?? [], [rolesQuery.data]);

	return (
		<SelectMenu
			createAble={true}
			isLoading={isLoading}
			isDisabled={isLoading}
			isClearable={true}
			/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
			// @ts-ignore
			placeholder='Select a role.'
			value={selected !== null ? render(selected) : null}
			options={options}
			onChange={(e) => e !== null && onChange((e as { value: string }).value)}
			{...rest}
		/>
	);
};

RoleSelect.displayName = 'RolesSelect';

export const RoleSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
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
				<div className='flex-1 self-stretch mt-2' />
				<Form {...form}>
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<FormItem>
									<RoleSelect {...field} {...props} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};
