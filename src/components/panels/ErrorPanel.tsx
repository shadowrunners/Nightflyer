import { MdOutlineError } from 'react-icons/md';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

export const ErrorPanel = ({ children, retry }: { children: string; retry: () => void }) => {
	const t = useTranslations('dash');
	return (
		<div className='flex w-full h-full items-center justify-center'>
			<div className='flex items-center flex-col gap-2.5'>
				<MdOutlineError className='text-red-400 w-[100px] h-[100px]' />
				<h1 className='font-bold text-red-400'>{children}</h1>
				<Button variant="destructive" onClick={retry}>
					{t('button.tryagain')}
				</Button>
			</div>
		</div>
	);
};
