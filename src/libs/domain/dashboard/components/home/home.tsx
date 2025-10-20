'use client';
import { useState, useEffect } from 'react';

import {
  Grid,
  Container,
  Title,
  Text,
  Table,
  ScrollArea,
  Stack,
} from '@mantine/core';

import { DroneVideoFeed } from '@organisms';
import { ControlPanel, DetectionSummary } from '@molecules';

export interface DroneData {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'mission';
  battery: number;
  altitude: number;
  location: string;
  videoFeed: string;
  detections: {
    people: number;
    vehicles: number;
    animals: number;
  };
  isPaused: boolean;
}

export interface VehiclesResponse {
  datos: Vehicle[];
  exito: boolean;
  total: number;
}

export interface Vehicle {
  aseguradoraUltimaPoliza: string;
  clase: string;
  estadoUltimaPoliza: string;
  fechaVencimientoUltimaPoliza: string;
  marca: string;
  modelo: any;
  placa: string;
  reclamaciones: any;
  referencia: string;
  timestamp: number;
}

const initialDrones: DroneData[] = [
  {
    id: 'drone-1',
    name: 'Falcon-01',
    status: 'connected',
    battery: 87,
    altitude: 150,
    location: 'Centro',
    videoFeed: '/assets/drone-feed-1.webp',
    detections: { people: 3, vehicles: 2, animals: 0 },
    isPaused: false,
  },
  {
    id: 'drone-2',
    name: 'Eagle-02',
    status: 'mission',
    battery: 64,
    altitude: 200,
    location: 'Parque heredia',
    videoFeed: '/assets/drone-feed-2.webp',
    detections: { people: 1, vehicles: 4, animals: 2 },
    isPaused: false,
  },
  {
    id: 'drone-3',
    name: 'Hawk-03',
    status: 'connected',
    battery: 92,
    altitude: 180,
    location: 'Zona franca',
    videoFeed: '/assets/drone-feed-3.webp',
    detections: { people: 2, vehicles: 6, animals: 0 },
    isPaused: true,
  },
  {
    id: 'drone-4',
    name: 'Raven-04',
    status: 'disconnected',
    battery: 23,
    altitude: 0,
    location: 'Getsemani',
    videoFeed: '/assets/drone-feed-4.webp',
    detections: { people: 4, vehicles: 1, animals: 3 },
    isPaused: false,
  },
];

export default function Home() {
  const [drones, setDrones] = useState<DroneData[]>(initialDrones);
  const [detections, setDetections] = useState<Vehicle[]>([]);

  const [selectedDrone, setSelectedDrone] = useState<string>('drone-1');
  const [enlargedDrone, setEnlargedDrone] = useState<string | null>(null);

  const handleTogglePause = (droneId: string) => {
    setDrones(prev =>
      prev.map(drone =>
        drone.id === droneId ? { ...drone, isPaused: !drone.isPaused } : drone,
      ),
    );
  };

  const handleEnlargeDrone = (droneId: string) => {
    setEnlargedDrone(enlargedDrone === droneId ? null : droneId);
  };

  console.log({ enlargedDrone });

  const selectedDroneData = drones.find(drone => drone.id === selectedDrone);

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(
          'http://68.183.57.162:8000/panel-de-control/vehiculos',
        );

        const data = (await req.json()) as VehiclesResponse;

        setDetections(data.datos);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const rows = detections.map(v => (
    <Table.Tr key={v.placa}>
      <Table.Td>{v.placa}</Table.Td>
      <Table.Td>{v.marca}</Table.Td>
      <Table.Td>{v.modelo}</Table.Td>
      <Table.Td>{v.clase}</Table.Td>
      <Table.Td>{v.referencia}</Table.Td>
      <Table.Td>{v.aseguradoraUltimaPoliza}</Table.Td>
      <Table.Td>{v.estadoUltimaPoliza}</Table.Td>
      <Table.Td>{v.fechaVencimientoUltimaPoliza}</Table.Td>
      <Table.Td>{v.reclamaciones}</Table.Td>
      <Table.Td>
        {/* format the timestamp if needed */}
        <Text size="sm">{new Date(v.timestamp * 1000).toLocaleString()}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <Grid gutter="lg" style={{ height: '100vh' }}>
        {/* Main Video Grid */}
        <Grid.Col span={8}>
          <div style={{ marginBottom: '1.5rem' }}>
            <Title
              order={1}
              style={{
                color: 'var(--mantine-color-gray-0)',
                marginBottom: '0.5rem',
              }}
            >
              Monitoreo de drones
            </Title>
            <Text c="dimmed">
              Vigilancia en tiempo real y detección de objetos
            </Text>
          </div>

          {/* Video Grid */}
          <Grid style={{ height: 'calc(100vh - 160px)' }}>
            {drones.map(drone => (
              <Grid.Col
                key={drone.id}
                span={enlargedDrone === drone.id ? 12 : 6}
                style={{ height: enlargedDrone === drone.id ? '100%' : '50%' }}
              >
                <DroneVideoFeed
                  drone={drone}
                  isEnlarged={enlargedDrone === drone.id}
                  onTogglePause={() => handleTogglePause(drone.id)}
                  onEnlarge={() => handleEnlargeDrone(drone.id)}
                  isSelected={selectedDrone === drone.id}
                  onSelect={() => setSelectedDrone(drone.id)}
                />
              </Grid.Col>
            ))}
            <Grid.Col>
              <Stack gap="md">
                <Title order={2}>
                  {drones.find(d => d.id === selectedDrone)?.name}
                </Title>
                <ScrollArea>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    captionSide="top"
                  >
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Placa</Table.Th>
                        <Table.Th>Marca</Table.Th>
                        <Table.Th>Modelo</Table.Th>
                        <Table.Th>Clase</Table.Th>
                        <Table.Th>Referencia</Table.Th>
                        <Table.Th>Aseguradora Última Póliza</Table.Th>
                        <Table.Th>Estado Última Póliza</Table.Th>
                        <Table.Th>Fecha Vencimiento</Table.Th>
                        <Table.Th>Reclamaciones</Table.Th>
                        <Table.Th>Timestamp</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                  </Table>
                </ScrollArea>
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* Right Sidebar */}
        <Grid.Col span={4}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <ControlPanel
              drones={drones}
              selectedDrone={selectedDroneData}
              onSelectDrone={setSelectedDrone}
            />
            <DetectionSummary drones={drones} />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
