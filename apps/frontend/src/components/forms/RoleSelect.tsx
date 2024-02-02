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
import { usePathname } from 'next/navigation';
import { useGuildRolesQuery } from '@Hooks';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

export const RoleSelectForm: ControlledInput<Omit<SelectMenuProps, 'value' | 'onChange'>> = ({
	control,
	controller,
	...props
}) => {
	const form = useForm();
	const guild = usePathname().split('/')[3];

	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	const selected = useMemo(() => {
		return props.defaultValue !== undefined ? rolesQuery.data?.find((r) => r.id === props.defaultValue?.toString()) : null;
	}, [props.defaultValue, rolesQuery.data]);

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
								<FormItem className='text-white'>
									<Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='placeholder' defaultValue={selected?.id} />
											</SelectTrigger>
										</FormControl>
										<SelectContent className='black2 text-white'>
											<SelectGroup className='font-poppins m-2'>
												<SelectLabel>Roles</SelectLabel>
												{rolesQuery.data?.map((role) => (
													<SelectItem className='font-poppins' value={role.id.toString()}>{role.name}</SelectItem>
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

export const MultiRoleSelect = ({
	value, onChange, ...rest
}: {
	value: SelectMenuOptionArray | string[];
	onChange: (role: SelectMenuOptionArray) => void;
}) => {
	const guild = usePathname().split('/')[3];
	const rolesQuery = useGuildRolesQuery(guild);
	const isLoading = rolesQuery.isLoading;

	const options = useMemo(() => {
		return rolesQuery.data?.map((role) => ({ label: role.name, value: role.id }));
	}, [rolesQuery.data]);

	const selected = useMemo(() => {
		// handles cases where value is an array of strings
		if (value.length > 0 && typeof value[0] === 'string') {
			return options?.filter((role) => (value as string[]).includes(role.value)) ?? [];
		}
		// handles cases where value is an array of labels and values. without this, you'll get empty values.
		// was a fucking pain in the ass to figure out. fuck this.
		else {
			const mappedValues = (value as SelectMenuOptionArray).map((role) => role.value) ?? [];
			return options?.filter((role) => mappedValues.includes(role.value)) ?? [];
		}
	}, [options, value]);

	return (
		<SelectMenu
			isLoading={isLoading}
			isDisabled={isLoading}
			value={selected}
			placeholder='Select a role.'
			options={options}
			onChange={(e) => e !== null && onChange((e as SelectMenuOptionArray))}
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