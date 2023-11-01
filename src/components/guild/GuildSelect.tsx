import { Avatar, AvatarImage, AvatarFallback, Card, CardHeader, Button } from '@/components/ui';
import { getGuildImg } from '@/utils/API/fetch';
import { useGuilds } from '@/utils/API/hooks';
import { filterGuilds } from '@/utils/util';

export function GuildSelect() {
	const { status, data, refetch } = useGuilds();

	switch (status) {
	case 'success':
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 text-white">
				{data
					?.filter((guild) => filterGuilds(guild))
					.map((guild) => (
						<Card key={guild.id} className='black2 font-oppins font-semibold'>
							<a href={`/guilds/${guild.id}`}>
								<CardHeader className='flex flex-row gap-3'>
									<Avatar>
										<AvatarImage src={getGuildImg(guild.id, guild.icon)}/>
										<AvatarFallback className='text-black'>SW</AvatarFallback>
									</Avatar>
									<h1>{guild.name}</h1>
								</CardHeader>
							</a>
						</Card>
					))}
			</div>
		);
	case 'error':
		return (
			<Button className='w-fit' variant="destructive" onClick={() => refetch()}>
					Try Again
			</Button>
		);
	}
}