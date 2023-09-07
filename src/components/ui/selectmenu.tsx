'use client';

import clsx from 'clsx';
import Select, {
	Props,
} from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';
import { Fragment } from 'react';

const controlStyles = {
	base: 'border rounded-lg black2 hover:cursor-pointer',
	focus: 'border-border ring-ring ring-primary-500',
	nonFocus: 'border-border',
};
const placeholderStyles = 'text-muted-foreground text-sm ml-1';
const selectInputStyles = 'text-foreground text-sm ml-3';
const valueContainerStyles = 'text-foreground text-sm ml-3';
const singleValueStyles = 'ml-1';
const multiValueStyles =
    'ml-1 bg-background border border-border rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 py-0.5';
const multiValueRemoveStyles =
    'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md bg-background';
const indicatorsContainerStyles = 'p-1 gap-1 rounded-lg';
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:text-red-800';
const indicatorSeparatorStyles = 'bg-mutated';
const dropdownIndicatorStyles = 'p-1 hover:text-foreground text-gray-500';
const menuStyles = 'mt-2 p-2 border border-border black2 text-sm rounded-lg border-gray-200';
const optionsStyle = 'black2 p-2 border-0 text-base hover:cursor-pointer';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background';
const noOptionsMessageStyles = 'text-muted-foreground bg-background';

interface SelectComponentProps extends Props {
    value?: unknown;
    isMulti?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isClearable?: boolean;
    createAble: boolean;
    placeholder?: string;
}

export const SelectComponent = ({
	options,
	value,
	onChange,
	isMulti,
	isDisabled,
	isLoading,
	isClearable,
	createAble,
	placeholder,
	...props
}: SelectComponentProps) => {
	const animatedComponents = makeAnimated();
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
				isClearable={isClearable}
				placeholder={placeholder}
				components={animatedComponents}
				// defaultInputValue={defaultValue}
				defaultValue={value}
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
				className='width-[100%] min-w-0'
				{...props}
			/>
		</Fragment>
	);
};