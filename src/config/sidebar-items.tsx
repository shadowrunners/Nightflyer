import { common } from '@/config/translations/common';
import { SidebarItemInfo } from '@/utils/router';
import { MdDashboard } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';

const items: SidebarItemInfo[] = [
	{
		name: <common.T text="dashboard" />,
		path: '/dash/user/home',
		icon: <Icon as={MdDashboard} />,
	},
];

export default items;
