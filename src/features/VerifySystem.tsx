import { RoleSelectForm } from '@/components/forms/RoleSelect';
import { UseFormRender, VerifyFeature } from '@/config/types';
import { useForm } from 'react-hook-form';

export const useVerifySystem: UseFormRender<VerifyFeature> = (data, onSubmit) => {
	const { reset, handleSubmit, formState, control } = useForm<VerifyFeature>({
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

