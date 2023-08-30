import { useMutation } from '@tanstack/react-query';
import { callDefault } from '@/utils/fetch/core';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

export async function logout() {
	await callDefault('/api/auth/signout', {
		request: {
			method: 'POST',
		},
	});

	await Router.push('/landing');
}

export function useAccessToken() {
	const { data: session } = useSession();
	return session?.accessToken;
}

export function useLogoutMutation() {
	return useMutation(['logout'], () => logout());
}
