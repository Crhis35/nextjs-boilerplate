import React from 'react';

import {
  Card,
  Button,
  Badge,
  Progress,
  Divider,
  Title,
  Group,
  Text,
  Stack,
} from '@mantine/core';
import {
  IconPlane,
  IconBattery,
  IconMapPin,
  IconGauge,
  IconPlayerPlay,
  IconPlayerPause,
  IconSquare,
} from '@tabler/icons-react';

import { StatusIndicator } from '@atoms';

import { ControlPanelProps } from './control-panel.model';

export default function ControlPanel(props: ControlPanelProps) {
  const { drones, selectedDrone, onSelectDrone } = props;

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'green';
    if (battery > 30) return 'yellow';
    return 'red';
  };

  return (
    <Stack gap="md">
      {/* Drone Selection */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{ background: 'var(--mantine-color-dark-6)' }}
      >
        <Group gap="xs" mb="md">
          <IconPlane size={20} color="var(--mantine-color-blue-4)" />
          <Title order={4} c="gray.0">
            Seleccionar Dron
          </Title>
        </Group>

        <Stack gap="xs">
          {drones.map(drone => (
            <Button
              key={drone.id}
              variant={selectedDrone?.id === drone.id ? 'filled' : 'outline'}
              fullWidth
              justify="space-between"
              leftSection={<IconPlane size={16} />}
              rightSection={<StatusIndicator status={drone.status} />}
              onClick={() => onSelectDrone(drone.id)}
              style={{
                background:
                  selectedDrone?.id === drone.id
                    ? 'var(--mantine-color-blue-6)'
                    : 'transparent',
                border:
                  selectedDrone?.id === drone.id
                    ? '1px solid var(--mantine-color-blue-6)'
                    : '1px solid var(--mantine-color-dark-4)',
              }}
            >
              {drone.name}
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Selected Drone Details */}
      {selectedDrone && (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          style={{ background: 'var(--mantine-color-dark-6)' }}
        >
          <Title order={4} mb="md" c="gray.0">
            {selectedDrone.name} - Details
          </Title>

          <Stack gap="md">
            {/* Battery Status */}
            <div>
              <Group justify="space-between" mb="xs">
                <Group gap="xs">
                  <IconBattery
                    size={16}
                    color={`var(--mantine-color-${getBatteryColor(selectedDrone.battery)}-4)`}
                  />
                  <Text size="sm" fw={500} c="gray.0">
                    Battery
                  </Text>
                </Group>
                <Text
                  size="sm"
                  fw={700}
                  c={getBatteryColor(selectedDrone.battery)}
                >
                  {selectedDrone.battery}%
                </Text>
              </Group>
              <Progress
                value={selectedDrone.battery}
                color={getBatteryColor(selectedDrone.battery)}
                size="sm"
              />
            </div>

            <Divider color="dark.4" />

            {/* Altitude */}
            <Group justify="space-between">
              <Group gap="xs">
                <IconGauge size={16} color="var(--mantine-color-blue-4)" />
                <Text size="sm" fw={500} c="gray.0">
                  Altitude
                </Text>
              </Group>
              <Badge variant="outline" color="blue">
                {selectedDrone.altitude}m
              </Badge>
            </Group>

            {/* Location */}
            <Group justify="space-between">
              <Group gap="xs">
                <IconMapPin size={16} color="var(--mantine-color-blue-4)" />
                <Text size="sm" fw={500} c="gray.0">
                  Location
                </Text>
              </Group>
              <Text
                size="sm"
                c="dimmed"
                style={{
                  maxWidth: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedDrone.location}
              </Text>
            </Group>

            <Divider color="dark.4" />

            {/* Controls */}
            <div>
              <Text size="sm" fw={600} mb="xs" c="gray.0">
                Controls
              </Text>
              <Group gap="xs">
                <Button
                  size="xs"
                  variant="outline"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'auto',
                    padding: '0.5rem',
                  }}
                >
                  <IconPlayerPlay size={16} />
                  <Text size="xs">Start</Text>
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'auto',
                    padding: '0.5rem',
                  }}
                >
                  <IconPlayerPause size={16} />
                  <Text size="xs">Pause</Text>
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'auto',
                    padding: '0.5rem',
                  }}
                >
                  <IconSquare size={16} />
                  <Text size="xs">Stop</Text>
                </Button>
              </Group>
            </div>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
