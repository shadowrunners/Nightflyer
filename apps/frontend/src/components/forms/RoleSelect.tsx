'use client';

import type {
	ControlledInput,
	SelectMenuProps,
	SelectMenuOptionArray,
} from '@Types';

import {
	Form,
	FormField,
	FormControl,
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
import { useGuildRolesQuery } from '@Hooks';
import { useForm } from 'react-hook-form';
import { useGuildId } from '@Utils';
import { useMemo } from 'react';

export const RoleSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = useGuildId();
	const { data, isLoading } = useGuildRolesQuery(guild);

	const selected = useMemo(() => {
		return props.defaultValue ? data?.find((r) => r.id === props.defaultValue?.toString()) : null;
	}, [props.defaultValue, data]);

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
							<FormItem className='text-white'>
								<Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='placeholder' defaultValue={selected?.id} key={selected?.id} />
										</SelectTrigger>
									</FormControl>
									<SelectContent className='black2 text-white'>
										<SelectGroup className='font-poppins m-2'>
											<SelectLabel>Roles</SelectLabel>
											{data?.map((role) => (
												<SelectItem className='font-poppins' value={role.id.toString()} key={role.id.toString()}>{role.name}</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</Form>
			</div>
		</div>
	);
};

export const MultiRoleSelect = ({
	value, onChange, ...rest
}: {
	value: SelectMenuOptionArray | string[];
	onChange: (role: SelectMenuOptionArray) => void;
}) => {
	const guild = useGuildId();
	const { data, isLoading } = useGuildRolesQuery(guild);

	const options = useMemo(() => {
		return data?.map((role) => ({ label: role.name, value: role.id }));
	}, [data]);

	const selected = useMemo(() => {
		const selectedValues = new Set(value.map((role) => typeof role === 'string' ? role : role?.value));
		return options?.filter((role) => selectedValues.has(role?.value));
	}, [options, value]);

	return (
		<SelectMenu
			isLoading={isLoading}
			isDisabled={isLoading}
			value={selected}
			placeholder='Select a role.'
			options={options}
			onChange={(e) => onChange((e as SelectMenuOptionArray))}
			{...rest}
		/>
	);
};

// this'll carry on like this, I genuinely do not want to write this implementation ever again.
// ported this shit over from role select, if it breaks, it breaks
export const MultiRoleSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
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
					<form>
						<FormField
							control={controller.control}
							name={controller.name}
							render={({ field }) => (
								<MultiRoleSelect {...field} {...props} />
							)}
						/>
					</form>
				</Form>
			</div>
		</div>
	);
};