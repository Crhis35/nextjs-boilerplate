import { DroneData } from '@organisms';

export interface ControlPanelProps {
  drones: DroneData[];
  selectedDrone: DroneData | undefined;
  onSelectDrone: (droneId: string) => void;
}
