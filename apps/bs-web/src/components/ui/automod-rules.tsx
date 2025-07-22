import { useForm } from 'react-hook-form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Form, FormField, FormControl, FormItem, Switch, FormLabel, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, FormMessage, Input } from '~/components/ui';
import { AutoModerationActionType, ChannelType } from 'discord-api-types/v10';
import { MultiSelect } from './multi-select';
import { useGuild } from '../contexts/guildcontext';
import { FormParams } from '~/types';

const rules = [
	{ id: 'mentionspam', name: 'Mention Spam', icon: <></> },
	{ id: 'profanity', name: 'Profanity' },
	{ id: 'nsfwinvitelinks', name: 'NSFW Invite Links' },
	{ id: 'sexualcontent', name: 'Sexual Content' },
	{ id: 'invitelinks', name: 'Invite Links' },
	{ id: 'spam', name: 'Spam' },
	{ id: 'zalgo', name: 'Zalgo' },
	{ id: 'emojispam', name: 'Emoji Spam' },
	{ id: 'customkeyword', name: 'Custom Keyword' },
];

const actions = [
	{ key: 'am_blockmessage', id: AutoModerationActionType.BlockMessage.toString(), name: 'Block Message' },
	{ key: 'am_sendalert', id: AutoModerationActionType.SendAlertMessage.toString(), name: 'Send Alert Message' },
	{ key: 'am_timeout', id: AutoModerationActionType.Timeout.toString(), name: 'Timeout' },
	{ key: 'am_blockmemberint', id: AutoModerationActionType.BlockMemberInteraction.toString(), name: 'Block Member Interaction' },
];

// v1
export function AutoModRules({ form }: FormParams) {
	const [openRules, setOpenRules] = useState<string[]>([]);
	const guild = useGuild();

	const channels = guild?.data.channels.filter((channel) => channel.type === ChannelType.GuildText);
	const filteredChannels = channels?.map((channel) => ({ label: channel.name, value: channel.id }));
	const roles = guild?.data.roles.map((role) => ({ label: role.name, value: role.id }));

	const toggleRule = (id: string) => (
		setOpenRules((prev) => prev.includes(id) ? prev.filter((ruleId) => ruleId !== id) : [...prev, id])
	);

	console.log(form.getValues());

	return (
		<div className='flex flex-col bg-primary p-5 rounded-xl mt-4 shadow-md'>
			<h1 className='text-xl font-semibold text-white mb-6'>Rules</h1>
			<Form {...form}>
				<form className='space-y-8'>
					{rules.map((rule) => (
						<Collapsible
							open={openRules.includes(rule.id)}
							onOpenChange={() => toggleRule(rule.id)}
							className='w-full flex flex-col bg-secondary rounded-lg p-4'
						>
							<CollapsibleTrigger asChild>
								<div className='flex justify-between items-center cursor-pointer'>
									<h2 className='text-lg font-medium'>{rule.name}</h2>
						    		<ChevronDown className={`h-5 w-5 transform transition-transform ${openRules.includes(rule.id) ? 'rotate-180' : ''}`} />
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent className='mt-2'>
								<div className='space-y-6'>
									<FormField
										control={form.control}
										name={`${rule.id}.enabled`}
										render={({ field }) => (
											<FormItem className='flex justify-between items-center'>
												<FormLabel className='text-white font-medium'>
                                                	Enable Rule
												</FormLabel>
												<FormControl>
													<Switch
														className='bg-gray-700'
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`${rule.id}.action`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Actions
												</FormLabel>
												<MultiSelect
													{...field}
													placeholder='Select an action that will be performed.'
													options={actions.map((action) => ({ label: action.name, value: action.id }))}
													onValueChange={field.onChange}
												/>
											</FormItem>
										)}
									/>
									{(Number(form.watch(`${rule.id}.action`)) === AutoModerationActionType.Timeout) && (
										<FormField
											control={form.control}
											name={`${rule.id}.timeoutDuration`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
													Timeout Duration
													</FormLabel>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Select the action that will be performed when the rule gets triggered.' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{actions.map((action) => (
																<SelectItem key={action.key} value={action.id}>
																	{action.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormItem>
											)}
										/>
									)}
									{rule.id === 'customkeyword' && (
										<FormField
											control={form.control}
											name={`${rule.id}.keyword`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Keyword
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="The keyword you'd like to block."
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									)}
									<FormField
										control={form.control}
										name={`${rule.id}.exemptChannels`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Exempted Channels
												</FormLabel>
												<MultiSelect
													{...field}
													placeholder='Select an action that will be performed.'
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													// @ts-expect-error
													options={filteredChannels}
													onValueChange={field.onChange}
												/>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`${rule.id}.exemptRoles`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Exempted Roles
												</FormLabel>
												<MultiSelect
													{...field}
													placeholder='Select an action that will be performed.'
													// eslint-disable-next-line @typescript-eslint/ban-ts-comment
													// @ts-expect-error
													options={roles}
													onValueChange={field.onChange}
												/>
											</FormItem>
										)}
									/>
								</div>

							</CollapsibleContent>
						</Collapsible>
					))}
				</form>
			</Form>
		</div>
	);
}