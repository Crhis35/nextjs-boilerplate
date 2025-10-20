'use client';
import React from 'react';

import {
  IconAdjustments,
  IconCalendarStats,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
  IconBell,
  IconSettings,
  IconLogout,
  IconChevronDown,
} from '@tabler/icons-react';
import {
  AppShell,
  Burger,
  Code,
  Group,
  ScrollArea,
  Text,
  rem,
  Indicator,
  Avatar,
  Menu,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
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

  const theme = useMantineTheme();

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
      <AppShell.Header
        px="md"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: rem(60),
        }}
      >
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text fw={600} size="lg" c={theme.primaryColor}>
            Logo
          </Text>
        </Group>

        <Group gap="md">
          <Indicator
            color={theme.primaryColor}
            size={10}
            offset={4}
            position="top-end"
          >
            <ActionIcon variant="subtle" radius="xl" aria-label="Notifications">
              <IconBell size={20} />
            </ActionIcon>
          </Indicator>

          {/* User popover menu */}
          <Menu shadow="md" width={180}>
            <Menu.Target>
              <Group gap={6}>
                <Avatar radius="xl" size={30} src={null} alt="User" />
                <Text size="sm" fw={500}>
                  John Doe
                </Text>
                <IconChevronDown size={16} />
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Cuenta</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} />}>
                Ajustes
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconLogout size={16} />}
                onClick={() => console.log('Logout clicked')}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

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
