import { SidebarItemInfo } from '@/utils/router';
import { MdDashboard } from 'react-icons/md';

const items: SidebarItemInfo[] = [
    {
        name: <h1>Home</h1>,
        path: '/home',
        icon: <MdDashboard />,
    },
];

export default items;
