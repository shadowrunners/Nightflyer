'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { UseFormRender } from '@Types';
import { useForm } from 'react-hook-form';
import { RoleSelectForm } from '@Forms';
import * as z from 'zod';

const schema = z.object({
	role: z.string(),
});
type VerifyFeature = z.infer<typeof schema>;

export const useVerifySystem: UseFormRender<VerifyFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<VerifyFeature>({
		resolver: zodResolver(schema),
		shouldUnregister: false,
		defaultValues: {
			role: data.role,
		},
	});

	return {
		component: (
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
				<RoleSelectForm
					control={{
						label: 'Verified Role',
						description: 'The role that will be assigned when the user passes verification.',
					}}
					controller={{ control, name: 'role' }}
				/>
			</div>
		),
		onSubmit: handleSubmit(async (e) => {
			await onSubmit(
				JSON.stringify({
					role: e.role,
				}),
			);

			reset(e);
		}),
		canSave: formState.isDirty,
		reset: () => reset(control._defaultValues),
	};
};

