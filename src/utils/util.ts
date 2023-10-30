/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, Dispatch, SetStateAction, ReactNode, ReactElement } from 'react';
import { type APIGuild, PermissionFlags, type Styles } from '@/types/types';
import { Features, type IdFeature } from '@/types/features';
import { usePathname } from 'next/navigation';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** The styles used by the homepage. */
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

/** Shows the correct navigation / sidebars based on the current URL. Used for different navs and sides on feature / guild pages. */
export function showCorrectShit({ thing }: { thing: ReactElement }) {
	const path = usePathname().split('/')[4];
	let renderedThing: ReactNode;

	if (path) renderedThing = thing;
	else renderedThing = null;

	return renderedThing;
}

/** Filters the guilds where the user doesn't have the Administrator permission. */
export function filterGuilds(guild: APIGuild) {
	return (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0;
}

/** The function used by all @shadcn/ui elements. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Converts the given number to a Hex value. */
export function toRGB(num: number) {
	num >>>= 0;
	const b = num & 0xff,
		g = (num & 0xff00) >>> 8,
		r = (num & 0xff0000) >>> 16;
	return 'rgb(' + [r, g, b].join(',') + ')';
}

export function getFeatures(): IdFeature<any>[] {
	return Object.entries(Features).map(([k, v]) => {
		return {
			id: k,
			...v,
		};
	});
}
