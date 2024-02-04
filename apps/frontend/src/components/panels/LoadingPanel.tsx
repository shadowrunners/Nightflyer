import { useTranslations } from 'next-intl';
import { LuLoader2 } from 'react-icons/lu';

export const LoadingPanel = () => {
	const t = useTranslations();

	return (
		<div className='flex items-center justify-center flex-col w-full h-full'>
			<div className='flex items-center flex-col gap-2.5'>
				<LuLoader2 className='animate-spin w-[45px] h-[45px] text-white' />
				<h1 className='text-white'>{t('loading')}</h1>
			</div>
		</div>
	);
};
