'use client';
import React from 'react';

import {
  IconAdjustments,
  IconCalendarStats,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { AppShell, Code, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { LinksGroup } from '@molecules';
import { AuthAppBarProps } from './auth-app-bar.model';
import classes from './auth-app-bar.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Actualizaciones',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analíticas', icon: IconPresentationAnalytics },
  { label: 'Ajustes', icon: IconAdjustments },
  {
    label: 'Seguridad',
    icon: IconLock,
    links: [
      { label: 'Activar 2FA', link: '/' },
      { label: 'Cambiar contraseña', link: '/' },
    ],
  },
];

export default function AuthAppBar(
  props: React.PropsWithChildren<AuthAppBarProps>,
) {
  const links = mockdata.map(item => <LinksGroup {...item} key={item.label} />);
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      {/* <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <div>Logo</div>
      </AppShell.Header> */}

      <AppShell.Navbar className={classes.navbar}>
        <div className={classes.header}>
          <Group justify="space-between">
            <Code fw={700}>v1.0.1</Code>
          </Group>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <div className={classes.footer}>Usuario</div>
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
