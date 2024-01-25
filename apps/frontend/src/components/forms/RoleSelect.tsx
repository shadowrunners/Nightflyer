'use client';

import { Form, FormField, FormItem, SelectMenu, Spacer } from '@/components/ui';
import { Props as SelectProps } from 'react-select';
import { useGuildRolesQuery } from '@/utils/API/hooks';
import { useForm } from 'react-hook-form';
import { BsPeopleFill } from 'react-icons/bs';
import { ControlledInput } from '@/types/formTypes';
import { OnChangeProps, Override } from '@/types/types';
import { usePathname } from 'next/navigation';
import { toRGB } from '@/utils/util';
import { APIRole } from '@/types/types';
import { useMemo } from 'react';
import Image from 'next/image';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MultipleSelector from '../ui/multiselecttest';

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

	return role;
}

export const RoleSelect = ({
	value, onChange, ...rest
}: {
	value: string;
	onChange: (role: string | OnChangeProps) => void;
}) => {
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
			placeholder='Select a role.'
			value={selected !== null ? render(selected) : null}
			options={options}
			onChange={(e) => e !== null && onChange((e as unknown as { value: string }).value)}
			{...rest}
		/>
	);
};

export const SMRoleSelect = ({
	value, onChange, ...rest
}: {
	value: string;
	onChange: (role: string | OnChangeProps) => void;
}) => {
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
			placeholder='Select a role.'
			value={selected !== null ? render(selected) : null}
			options={options}
			onChange={(e) => e !== null && onChange((e as unknown as { value: string }).value)}
			{...rest}
		/>
	);
};

export const TestRoleSelect = ({
	value, onChange, ...rest
}: {
	value: string;
	onChange: (role: string | OnChangeProps) => void;
}) => {
	const guild = usePathname().split('/')[3];

	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	const selected = useMemo(() => rolesQuery.data?.find((role) => role.id === value) ?? null, [
		rolesQuery.data,
		value,
	]);

	console.log(selected);

	return (
		<Select disabled={isLoading}>
			<SelectTrigger>
				<SelectValue placeholder="Select a role." defaultValue={selected?.name} />
				<SelectContent className='black2 text-white'>
					<SelectGroup className='font-poppins m-2'>Server Roles</SelectGroup>
					{rolesQuery.data?.map((role) => (
						<SelectItem className='font-poppins' value={role.id}>{role.name}</SelectItem>
					))}
				</SelectContent>
			</SelectTrigger>
		</Select>
	);
};

export const MultiRoleSelect = ({
	value, onChange, ...rest
}: {
	value: { label: string, value: string }[] | string[];
	onChange: (role: string | OnChangeProps) => void;
}) => {
	const guild = usePathname().split('/')[3];
	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	const selected = useMemo(() => {
		if (Array.isArray(value)) {
			if (value.length > 0 && typeof value[0] === 'string') return rolesQuery.data?.filter((role) => (value as string[]).includes(role.id)) ?? [];
		}
		else return null;
	}, [rolesQuery.data, value]);

	const options = useMemo(() => rolesQuery.data?.map(render) ?? [], [rolesQuery.data]);

	return (
		<SelectMenu
			createAble={true}
			isLoading={isLoading}
			isDisabled={isLoading}
			isMulti={true}
			value={(selected as APIRole[])?.map(render).map((option) => ({ label: option.label, value: option.value, icon: option.icon }))}
			placeholder='Select a role.'
			options={options}
			onChange={(e) => e !== null && onChange((e as OnChangeProps).map((option) => ({ label: option.label, value: option.value })))}
			{...rest}
		/>
	);
};

RoleSelect.displayName = 'RolesSelect';
MultiRoleSelect.displayName = 'MultiRoleSelect';

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

export const TestRoleForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
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
									<TestRoleSelect {...field} {...props} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};

export const SMSelectForm: ControlledInput<Omit<Props, 'onChange'>> = ({
	control,
	controller,
	value,
	...props
}) => {
	const form = useForm();

	return (
		<div className='grid gap-3'>
			<div className="flex flex-col width-[100%] relative border-r-3xl p-5 shadow black2 rounded-3xl">
				<Form {...form}>
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<FormItem>
									<SMRoleSelect {...field} {...props} />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};

export const MultiRoleSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm(); 

	const guild = usePathname().split('/')[3];
	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	// TODO: Values retrieved from the database are currently borked.
	// Essentially what needs to happen is to fetch the roles, then from the role array get and display the role's label and assign the ID to it.
	// That's it.

	const selected = useMemo(() => {
		console.log('selected value!')
		console.log(props.defaultValue)
	}, [rolesQuery.data, props.defaultValue]);

	const options = useMemo(() => {
		return rolesQuery.data?.map((role) => ({ label: role.name, value: role.id }));
	}, [rolesQuery.data])

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
										defaultOptions={options}
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

/**
 * export const MultiRoleSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
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
							render={({ field }) => {
								return (
									<FormItem>
										<MultiRoleSelect {...field} {...props} />
									</FormItem>
								);
							}}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};
 */