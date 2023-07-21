import { InGuildSidebar } from './guild-sidebar';
import GuildNavbar from './guild-navbar';
import { ReactNode } from 'react';
import AppLayout from '../app';

export default function getGuildLayout({
  back,
  children,
}: {
  back?: boolean;
  children: ReactNode;
}) {
  return (
    <AppLayout navbar={<GuildNavbar back={back} />} sidebar={back ? <InGuildSidebar /> : undefined}>
      {children}
    </AppLayout>
  );
}
