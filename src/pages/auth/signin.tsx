import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { FaDiscord } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';
import React from 'react';

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			{Object.values(providers).map((provider) => (
				<section key='discord_section' id='signin' className='flex md:flex-row flex-col h-screen text-center bg-black'>
					<div
						key='div_1_discord'
						className='flex-1 flex justify-center flex-col relative text-center'
					>
						<h1
							key='h1_discord'
							className={'font-poppins font-semibold text-[50px]'}
						>
							All adventures <span className='text-gradient'>start somewhere</span>.
						</h1>
						<div key={provider.name}>
							<Button
								key='discord_button_1'
								size='lg'
								variant='outline'
								className='mt-2'
								leftIcon={<FaDiscord /> }
								onClick={() => signIn(provider.id)}
							>
								Sign in with {provider.name}
							</Button>
							<p
								key='p_discord_1'
								className='font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] mt-2'
							>
								It just happens <span className='text-gradient'>that yours starts here</span>.
							</p>
						</div>
					</div>
				</section>
			))}
		</>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) return { redirect: { destination: '/' } };
	const providers = await getProviders();

	return {
		props: { providers: providers ?? [] },
	};
}