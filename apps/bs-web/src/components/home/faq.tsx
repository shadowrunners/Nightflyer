import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

// TODO: include the questions

export function FAQ() {
	return (
		<section id="faq" className='mb-20 max-w-[1350px] mx-auto sm:px-16 px-6'>
			<div className=''>
				<h2 className="text-left font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
                    FAQ.
				</h2>
				<p className='mt-5 text-[18px] leading-[30.8px] max-w-2xl text-neutral-400'>
					these questions aren't frequently asked but they're here in case of anything.
				</p>
			</div>
			<Accordion type='single' collapsible className='w-full mt-12' defaultValue='item-1'>
				<AccordionItem value="item-1">
					<AccordionTrigger className="font-semibold font-sans text-white text-xl ml-auto hover:cursor-pointer">
						what is OpenEve, what is Evelyn and what do they do?
					</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                       Evelyn is the multi-purpose Discord bot built around you and what you need with all its features being provided free of charge for you to break beyond the paywall of other bots.
					   OpenEve is the project the Evelyn bot is under with it consisting of three projects: Evelyn (the Discord bot), Blackspace Control Center (the website you're on right now) and Blackspace API (the data layer behind the control center).
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger className="font-semibold font-mono text-white text-xl">
						is this bot really completely free to use?
					</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                        yes, every feature of the bot is entirely free to use. I initially started building this project for myself to break free of bots that were heavily paywalled (+ I also wanted to add my own customizations and stuff) and I eventually thought to put it out there for anyone to host, use and enjoy.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger className="font-semibold font-mono text-white text-xl">
						is there any way I can support the project?
					</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                        yes! you can do this by donating to my Buy Me a Coffee page which not only motivates me to work even harder to bring you good stuff but also helps keep the lights on around here. you can also support the project through other ways such as contributing to the bot with new ideas, new features (if you're experienced with coding in TS) & fixes or by spreading the word about our bot and recommending us to your friends!
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger className="font-semibold font-mono text-white text-xl">
						PLACEHOLDER
					</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6">
					<AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
					<AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
}