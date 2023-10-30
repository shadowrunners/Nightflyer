import { usePathname } from 'next/navigation';
import items from './sidebar';
import { ReactNode, useMemo } from 'react';

export function useActiveSidebarItem(): SidebarItemInfo | null {
	const pathname = usePathname().replace('/en', '');

	return useMemo(() => {
		for (const item of items) {
			if (item.path === pathname) return item;
		}

		return null;
	}, [pathname]);
}

export interface SidebarItemInfo {
  name: ReactNode;
  icon?: ReactNode;
  path: string;
  hidden?: boolean;
}
