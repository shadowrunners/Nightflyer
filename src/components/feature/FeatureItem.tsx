import { Button, ButtonGroup, Card, CardBody, CardFooter } from '@chakra-ui/react';
import { guild as view } from '@/config/translations/guild';
import { useEnableFeatureMutation } from '@/api/hooks';
import { IoOpen, IoOptions } from 'react-icons/io5';
import { Center, Text } from '@chakra-ui/layout';
import { IdFeature } from '@/utils/common';
import Router from 'next/router';
import { useMemo } from 'react';

export function FeatureItem({ guild, feature, enabled }: Props) {
	const t = view.useTranslations();
	const mutation = useEnableFeatureMutation();

	const buttonProps = useMemo(() => {
		if (enabled) {
			return {
				variant: 'action',
				rounded: '2xl',
				leftIcon: <IoOptions />,
				onClick: () => Router.push(`/guilds/${guild}/features/${feature.id}`),
				children: t.bn['config feature'],
			};
		}
		else {
			return {
				leftIcon: <IoOpen />,
				onClick: () => mutation.mutate({ enabled: true, guild, feature: feature.id }),
				children: t.bn['enable feature'],
			};
		}
	}, [enabled, guild, feature, t.bn, mutation]);

	return (
		<Card variant='primary'>
			<CardBody className='flex flex-row gap-3'>
				<Center
					className={`rounded-xl w-[50px] h-[50px] text-3xl ${enabled ? 'bg-Brand text-white' : 'bg-brandAlpha-100 text-brand-500'}`}
					_dark={{
						color: enabled ? 'white' : 'brand.200',
					}}
				>
					{feature.icon}
				</Center>
				<div className='flex-1'>
					<Text className='font-semibold text-base md:text-lg'>{feature.name}</Text>
					<Text className='text-sm md:text-md text-TextSecondary'>{feature.description}</Text>
				</div>
			</CardBody>
			<CardFooter className='mt-3'>
				<ButtonGroup>
					<Button size={{ base: 'sm', md: 'md' }} disabled={mutation.isLoading} {...buttonProps} />
				</ButtonGroup>
			</CardFooter>
		</Card>
	);
}

interface Props {
  guild: string;
  feature: IdFeature;
  enabled: boolean | undefined;
}
