import { useTranslations } from 'next-intl';
import Link from 'next/link';

const footerItems = {
	legal: [
		{ key: 'footer.legal.privacy', href: '/privacy' },
		{ key: 'footer.legal.tos', href: '/tos' },
	],
	support: [
		{ key: 'footer.support.server', href: 'placeholder' },
	],
	links: [
		{ key: 'footer.links.github', href: 'https://github.com/(bfplaceholder)/evelyn' },
		{ key: 'footer.links.documentation', href: 'PLACEHOLDER' },
		{ key: 'footer.links.donations', href: 'https://buymeacoffee.com/scr3ppie' },
	],
};

export function Footer() {
	const t = useTranslations('home');

	return (
		<footer className='text-white py-12'>
			<div className='container mx-auto px-4 max-w-[1248px]'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='md:col-span-1'>
						<h3 className='text-2xl font-bold mb-2'>OpenEve</h3>
						<p className="text-slate-300 text-sm leading-relaxed">
							{t('footer.main.paragraph')}
						</p>
					</div>
					<div className='md:col-span-1'>
						<h4 className='font-semibold mb-4 text-slate-200'>{t('footer.legal.name')}</h4>
						<ul className='space-y-2'>
							{footerItems.legal.map((item) => (
								<Link href={item.href} key={item.key} className='block text-slate-300 hover:text-white transition-colors text-sm'>
									{t(item.key)}
								</Link>
							))}
						</ul>
					</div>
					<div className='md:col-span-1'>
						<h4 className='font-semibold mb-4 text-slate-200'>{t('footer.support.name')}</h4>
						<ul className='space-y-2'>
							{footerItems.support.map((item) => (
								<Link href={item.href} key={item.key} className='block text-slate-300 hover:text-white transition-colors text-sm'>
									{t(item.key)}
								</Link>
							))}
						</ul>
					</div>
					<div className='md:col-span-1'>
						<h4 className='font-semibold mb-4 text-slate-200'>{t('footer.links.name')}</h4>
						<ul className='space-y-2'>
							{footerItems.links.map((item) => (
								<Link href={item.href} key={item.key} className='block text-slate-300 hover:text-white transition-colors text-sm'>
									{t(item.key)}
								</Link>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-slate-700 mt-8 pt-6">
				<p className="text-slate-400 text-sm text-center">
					{t('footer.copyright').replace('DATE_PLACEHOLDER_DO_NOT_CHANGE_IN_TRANSLATION', `${new Date().getFullYear()}`)}
				</p>
			</div>
		</footer>
	);
};