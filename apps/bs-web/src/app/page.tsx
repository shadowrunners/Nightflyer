import { FAQ } from '~/components/home/home-faq';
import { DotBackground } from '~/components/ui/dotbackground';

import { NavigationBar } from '~/components/home/nav';
import { Features } from '~/components/home/home-features';
import { Footer } from '~/components/home/home-footer';
import { Hero } from '~/components/home/hero';

export default function Home() {
	return (
		<div className="bg-black w-full overflow-hidden font-sans font-semibold">
			<div className='relative w-full h-screen mb-10'>
				<header className='sticky top-0 z-50'>
					<NavigationBar />
				</header>
			</div>
			<div className='w-full mt-20 xl:mt-20 px-6 sm:px-0'>
				<Hero />
			</div>
			<DotBackground>
				<div className='sm:px-16 px-6 flex justify-center'>
					<div className='max-w-screen-lg w-full'>
						<Features />
					</div>
				</div>
			</DotBackground>
			<div className='sm:px-16 px-6 flex justify-center'>
				<div className='max-w-screen-lg w-full'>
					<FAQ /> <Footer />
				</div>
			</div>
		</div>
	);
}