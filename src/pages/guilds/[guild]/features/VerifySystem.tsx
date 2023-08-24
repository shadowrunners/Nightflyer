import { RoleSelectForm } from '@/components/forms/RoleSelect';
import { UseFormRender, VerifyFeature } from '@/config/types';
import { SimpleGrid } from '@chakra-ui/layout';
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
			<><SimpleGrid columns={{ base: 1, lg: 2 }} gap={3}>
				<RoleSelectForm
					control={{
						label: 'Verified Role',
						description: 'The role that will be assigned when the user passes verification.',
					}}
					controller={{ control, name: 'role' }}
				/>
			</SimpleGrid>
			</>
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

