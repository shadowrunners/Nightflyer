import { Fragment, JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { LevellingFeature } from '@/types/features';
import {
	Controller,
	ControllerFieldState,
	ControllerRenderProps,
	FieldValues,
	UseControllerProps,
	useFieldArray,
	UseFormRegister,
} from 'react-hook-form';
import { FormProps } from '@/types/formTypes';
import { SMRoleSelect, SMSelectForm, TestRoleForm } from './RoleSelect';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { DialogHeader } from '../ui/dialog';
import { Button, Input } from '@UI';

interface Props {
    control: Omit<FormProps, 'children' | 'error'>;
    controller: UseControllerProps<LevellingFeature, 'roleRewards'>
    initialData: {
        level: number;
        roleId: string;
    }[] | undefined[];
    register: UseFormRegister<LevellingFeature>;
}

type Data = {
	level: number;
	roleId: string;
};

function Modal() {
	return (
		<Dialog>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure absolutely sure?</DialogTitle>
					<DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export const LevelTable = ({ control, controller, register }: Props) => {
	const [level, setLevel] = useState('');
	const [data, setData] = useState<Data[]>();

	const blockLettersAndSpaces = (event: { target: { value: string; }; }) => {
		const result = event.target.value.replace(/\D/g, '');
		setLevel(result);
	};

	const handleSubmit = (newData) => {
		setData([data, newData]);
		console.log(data);
	};

	return (
		<Fragment>
			<div className='black2 p-5 border-3 rounded-3xl'>
				<div className="flex-1 relative">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Level</TableHead>
								<TableHead>Role</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								{data?.map((levelData, index) => (
									<Fragment>
										<TableCell key={index}>{levelData.level}</TableCell>
										<TableCell key={index}>{levelData.roleId}</TableCell>
									</Fragment>
								))}
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<Dialog>
					<DialogTrigger><Button>Add New Entry</Button></DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add a New Level Reward</DialogTitle>
							<DialogDescription>

								<Input
									onChange={blockLettersAndSpaces}
									value={level}
									inputMode='numeric'
								/>

								<TestRoleForm control={control} controller={controller} {...register('roleRewards.0.roleId')} />
							</DialogDescription>
							<DialogFooter>
								<DialogClose asChild>
									<Button type="button" variant="secondary" onSubmit={handleSubmit}>
														Add
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</Fragment>
	);
};