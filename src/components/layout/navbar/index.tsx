import { Flex, useColorModeValue } from '@chakra-ui/react';
import { navbarBreakpoint } from '@/theme/breakpoints';
import { Fragment, ReactNode } from 'react';
import { SidebarTrigger } from '@/components/SidebarTrigger';

export function Navbar({ links, children }: { links?: ReactNode; children: ReactNode }) {
	return (
		<div className='flex flex-row mx-auto black2 backdrop-blur-[20px] rounded-[16px] px-[24px] py-3 lg:py-8 gap-2 justify-between items-stretch'>
			{children}
			<NavbarLinksBox>{links}</NavbarLinksBox>
		</div>
	);
}

function NavbarLinksBox({ children }: { children?: ReactNode }) {
	return (
		<Flex
			justify="end"
			align="center"
			direction="row"
			bg="CardBackground"
			p="10px"
			borderRadius="30px"
			boxShadow="normal"
		>
			{children ?? (
				<Fragment>
					<SidebarTrigger />
				</Fragment>
			)}
		</Flex>
	);
}
