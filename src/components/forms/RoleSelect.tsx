import { SelectInstance, Props as SelectProps } from 'chakra-react-select';
import { Option, SelectField } from '@/components/forms/SelectField';
import { common } from '@/config/translations/common';
import { useGuildRolesQuery } from '@/api/hooks';
import { useController } from 'react-hook-form';
import { Icon, Image } from '@chakra-ui/react';
import { BsPeopleFill } from 'react-icons/bs';
import { forwardRef, useMemo } from 'react';
import { ControlledInput } from './types';
import { Override } from '@/utils/types';
import { useRouter } from 'next/router';
import { toRGB } from '@/utils/common';
import { FormCard } from './Form';
import { Role } from '@/api/bot';

type Props = Override<
  SelectProps<Option, false>,
  {
    value?: string;
    onChange: (role: string) => void;
  }
>;

function render(role: Role): Option {
  const iconColor = toRGB(role.color);
  const icon = 
    role.icon?.iconUrl 
    ? (  <Image alt="icon" src={role.icon.iconUrl} bg={iconColor} w="25px" h="25px" /> ) 
    : ( <Icon as={BsPeopleFill} color={iconColor} w="20px" h="20px" /> )

  return {
    value: role.id,
    label: role.name,
    icon,
  };
}

export const RoleSelect = forwardRef<SelectInstance<Option, false>, Props>((props, ref) => {
  const { value, onChange, ...rest } = props;
  const guild = useMemo(() => (useRouter().query.guild as string), []);

  const rolesQuery = useGuildRolesQuery(guild);
  const isLoading = rolesQuery.isLoading;

  const selected = useMemo(() => rolesQuery.data?.find((role) => role.id === value) ?? null, [
    rolesQuery.data,
    value,
  ]);

  const options = useMemo(() => rolesQuery.data?.map(render) ?? [], [rolesQuery.data]);

  return (
    <SelectField<Option>
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder={<common.T text="select role" />}
      value={selected !== null ? render(selected) : null}
      onChange={(e) => e?.value !== null && onChange(e?.value as string)}
      options={options}
      ref={ref}
      {...rest}
    />
  );
});

RoleSelect.displayName = 'RolesSelect';

export const RoleSelectForm: ControlledInput<Omit<Props, 'value' | 'onChange'>> = ({
  control,
  controller,
  ...props
}) => {
  const { fieldState, field } = useController(controller);

  return (
    <FormCard {...control} error={fieldState?.error?.message}>
      <RoleSelect {...field} {...props} />
    </FormCard>
  );
};
