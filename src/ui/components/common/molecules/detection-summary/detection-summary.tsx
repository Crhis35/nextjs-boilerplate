import React from 'react';
import { Card, Badge, Title, Grid, Text, Group, Stack } from '@mantine/core';
import { IconUsers, IconCar, IconHeart } from '@tabler/icons-react';

import { DetectionSummaryProps } from './detection-summary.model';

export default function DetectionSummary(props: DetectionSummaryProps) {
  const { drones } = props;

  const getTotalDetections = () => {
    return drones.reduce(
      (total, drone) => ({
        people: total.people + drone.detections.people,
        vehicles: total.vehicles + drone.detections.vehicles,
        animals: total.animals + drone.detections.animals,
      }),
      { people: 0, vehicles: 0, animals: 0 },
    );
  };

  const totals = getTotalDetections();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'green';
      case 'mission':
        return 'blue';
      case 'disconnected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Online';
      case 'mission':
        return 'Mission';
      case 'disconnected':
        return 'Offline';
      default:
        return status;
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      style={{ background: 'var(--mantine-color-dark-6)' }}
    >
      <Title order={4} mb="md" c="gray.0">
        Detection Summary
      </Title>

      <Stack gap="md">
        {/* Total Counts */}
        <Grid>
          <Grid.Col span={4}>
            <div style={{ textAlign: 'center' }}>
              <Group justify="center" mb="xs">
                <IconUsers size={20} color="var(--mantine-color-cyan-4)" />
              </Group>
              <Text size="xl" fw={700} c="cyan.4">
                {totals.people}
              </Text>
              <Text size="xs" c="dimmed">
                People
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div style={{ textAlign: 'center' }}>
              <Group justify="center" mb="xs">
                <IconCar size={20} color="var(--mantine-color-orange-4)" />
              </Group>
              <Text size="xl" fw={700} c="orange.4">
                {totals.vehicles}
              </Text>
              <Text size="xs" c="dimmed">
                Vehicles
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={4}>
            <div style={{ textAlign: 'center' }}>
              <Group justify="center" mb="xs">
                <IconHeart size={20} color="var(--mantine-color-pink-4)" />
              </Group>
              <Text size="xl" fw={700} c="pink.4">
                {totals.animals}
              </Text>
              <Text size="xs" c="dimmed">
                Animals
              </Text>
            </div>
          </Grid.Col>
        </Grid>

        {/* Per Drone Breakdown */}
        <div>
          <Text size="sm" fw={600} mb="xs" c="gray.0">
            Per Drone
          </Text>
          <Stack gap="xs">
            {drones.map(drone => (
              <div
                key={drone.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  background: 'var(--mantine-color-dark-5)',
                  borderRadius: '0.5rem',
                }}
              >
                <Group gap="xs">
                  <Text size="sm" fw={500} c="gray.0">
                    {drone.name}
                  </Text>
                  <Badge
                    variant="outline"
                    color={getStatusColor(drone.status)}
                    size="xs"
                  >
                    {getStatusLabel(drone.status)}
                  </Badge>
                </Group>
                <Group gap="md">
                  <Group gap="xs">
                    <IconUsers size={12} color="var(--mantine-color-cyan-4)" />
                    <Text size="xs" c="gray.2">
                      {drone.detections.people}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconCar size={12} color="var(--mantine-color-orange-4)" />
                    <Text size="xs" c="gray.2">
                      {drone.detections.vehicles}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconHeart size={12} color="var(--mantine-color-pink-4)" />
                    <Text size="xs" c="gray.2">
                      {drone.detections.animals}
                    </Text>
                  </Group>
                </Group>
              </div>
            ))}
          </Stack>
        </div>
      </Stack>
    </Card>
  );
}
