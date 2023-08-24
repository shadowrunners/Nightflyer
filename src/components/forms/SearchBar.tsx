import {
	Icon,
	Input,
	InputGroup,
	InputGroupProps,
	InputLeftElement,
	InputProps,
} from '@chakra-ui/react';
import { AiOutlineSearch as SearchIcon } from 'react-icons/ai';
import { common } from '@/config/translations/common';
import { useCallback } from 'react';

export function SearchBar(
	props: {
    input?: InputProps;
    onSearch?: () => void;
  } & InputGroupProps,
) {
	const t = common.useTranslations();
	const { input, onSearch, ...rest } = props;

	const handleSearch = useCallback(() => {
		onSearch?.();
	}, [onSearch]);

	return (
		<InputGroup {...rest}>
			<InputLeftElement>
				<Icon as={SearchIcon} color="TextPrimary" width="15px" height="15px" />
			</InputLeftElement>
			<Input
				variant="search"
				fontSize="sm"
				bg="secondaryGray.300"
				color="TextPrimary"
				fontWeight="500"
				_placeholder={{ color: 'gray.400', fontSize: '14px' }}
				borderRadius="30px"
				placeholder={`${t.search}...`}
				onKeyDown={(e) => {
					if (e.key === 'Enter') handleSearch();
				}}
				_dark={{
					bg: 'navy.900',
				}}
				{...input}
			/>
		</InputGroup>
	);
}
