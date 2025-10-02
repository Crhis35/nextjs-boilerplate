import React from 'react';

import { IconChevronRight } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';

import { LinksGroupProps } from './links-group.model';
import classes from './links-group.module.css';

export default function LinksGroup(props: LinksGroupProps) {
  const { icon: Icon, label, initiallyOpened, links } = props;
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = React.useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map(link => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={event => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened(o => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
