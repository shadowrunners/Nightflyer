import { MutableRefObject, Dispatch, SetStateAction } from 'react';
import { Styles } from '@/types/types';

export const styles: Styles = {
	boxWidth: 'xl:max-w-[1280px] w-full',
	boxNav: 'xl:max-w-[1920px] w-full',

	heading2:
		'font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full',
	paragraph:
		'font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]',

	flexCenter: 'flex justify-center items-center',
	flexStart: 'flex justify-center items-start',

	paddingX: 'sm:px-16 px-6',
	paddingY: 'sm:py-16 py-6',
	padding: 'sm:px-16 px-6 sm:py-12 py-4',

	marginX: 'sm:mx-16 mx-6',
	marginY: 'sm:my-16 my-6',
};

/** The observer hook used to detect when certain components are in view. Mostly used for animations. */
export function observerHook(
	ref: MutableRefObject<HTMLDivElement | null>,
	setInView: Dispatch<SetStateAction<boolean>>,
) {
	const observer = new IntersectionObserver(([entry]) => {
		setInView(entry.isIntersecting);
	}, { threshold: 0.3 });
	if (ref.current) observer.observe(ref.current);
	return () => {
		if (ref.current) observer.unobserve(ref.current);
	};
}

/** The variants used for animations. */
export const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

/** Gets the server ID from the request URL. */
export function getGuildId(req: Request) {
	const url = new URL(req.url);
	const id = url.pathname.split('/')[4];

	return id;
}
