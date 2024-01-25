'use client';

import clsx from 'clsx';
import Select, {
	Props,
	components,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Fragment } from 'react';

const controlStyles = {
	base: 'border border-gray-800 rounded-lg black2 hover:cursor-pointer',
	focus: 'ring-ring ring-primary-500',
	nonFocus: 'border-gray-800',
};
const placeholderStyles = 'text-muted-foreground text-sm ml-1';
const selectInputStyles = 'text-foreground text-sm ml-3';
const valueContainerStyles = 'text-foreground text-white text-sm ml-3';
const singleValueStyles = 'ml-1';
const multiValueStyles =
    'mt-0.5 ml-1 mb-0.5 bg-background border border-gray-800 rounded items-center py-0.5 pl-2 pr-1 gap-1.5 bg-transparent';
const multiValueLabelStyles = 'font-poppins text-white';
const multiValueRemoveStyles =
    'border border-gray-800 text-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-transparent';
const indicatorsContainerStyles = 'p-1 gap-1 rounded-lg';
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:text-red-800';
const indicatorSeparatorStyles = 'bg-mutated';
const dropdownIndicatorStyles = 'p-1 hover:text-foreground text-gray-500';
// const menuStyles = 'mt-2 p-2 border border-gray-800 black2 text-sm rounded-lg border-gray-200';
const menuStyles = 'absolute mt-2 p-2 border border-gray-800 black2 text-sm rounded-lg border-gray-200 left-0';
const optionsStyle = 'black2 p-2 border-0 text-base hover:cursor-pointer';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background';
const noOptionsMessageStyles = 'text-muted-foreground bg-background';

interface SelectComponentProps extends Props {
    value?: unknown;
    isMulti?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    createAble: boolean;
    placeholder?: string;
}

const { Option } = components;

const customComponents = {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	SingleValue: ({ children, ...props }: any) => {
		return (
			<components.SingleValue {...props}>
				<div className='relative flex min-w-0 mx-0 border-r-0 items-center'>
					<span className='mr-1.5'>{props.data.icon}</span> {children}
				</div>
			</components.SingleValue>
		);
	},
	/* eslint-disable @typescript-eslint/no-explicit-any */
	MultiValue: ({ children, ...props }: any) => {
		return (
			<components.MultiValue {...props}>
				<div className='relative flex min-w-0 mx-0 border-r-0 items-center'>
					<span className='mr-1.5'>{props.data.icon}</span> {children}
				</div>
			</components.MultiValue>
		);
	},
	/* eslint-disable @typescript-eslint/no-explicit-any */
	Option: ({ children, ...props }: any) => {
		return (
			<Option {...props}>
				<div className='relative flex min-w-0 mx-0 border-r-0 items-center'>
					<span className='mr-1.5'>{props.data.icon}</span> {children}
				</div>
			</Option>
		);
	},
};

export const SelectMenu = ({
	options,
	value,
	onChange,
	isMulti,
	isDisabled,
	isLoading,
	createAble,
	placeholder,
	...props
}: SelectComponentProps) => {
	const Comp = createAble ? CreatableSelect : Select;
	return (
		<Fragment>
			<Comp
				unstyled
				isSearchable
				value={value}
				isDisabled={isDisabled}
				isMulti={isMulti}
				isLoading={isLoading}
				isClearable={false}
				placeholder={placeholder}
				components={customComponents}
				// defaultInputValue={defaultValue}
				options={options}
				noOptionsMessage={() => 'Empty'}
				onChange={onChange}
				classNames={{
					control: ({ isFocused }) =>
						clsx(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
					placeholder: () => placeholderStyles,
					input: () => selectInputStyles,
					option: () => optionsStyle,
					menu: () => menuStyles,
					valueContainer: () => valueContainerStyles,
					singleValue: () => singleValueStyles,
					multiValue: () => multiValueStyles,
					multiValueLabel: () => multiValueLabelStyles,
					multiValueRemove: () => multiValueRemoveStyles,
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					indicatorSeparator: () => indicatorSeparatorStyles,
					dropdownIndicator: () => dropdownIndicatorStyles,
					groupHeading: () => groupHeadingStyles,
					noOptionsMessage: () => noOptionsMessageStyles,
				}}
				className='bg-transparent z-auto'
				{...props}
			/>
		</Fragment>
	);
};