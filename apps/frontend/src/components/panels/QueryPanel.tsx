import { UseQueryResult } from '@tanstack/react-query';
import { ErrorPanel } from './ErrorPanel';
import { Fragment, ReactNode } from 'react';

export const QueryStatus = ({
	query,
	error,
	loading,
	children,
}: {
  query: UseQueryResult;
  error: string;
  /**
   * element to display when loading
   */
  loading: ReactNode;
  children: ReactNode;
}) => {
	if (query.isError) return <ErrorPanel retry={() => query.refetch()}>{error}</ErrorPanel>;
	if (query.isLoading) return <Fragment>{loading}</Fragment>;
	if (query.isSuccess) return <Fragment>{children}</Fragment>;

	return <></>;
};
