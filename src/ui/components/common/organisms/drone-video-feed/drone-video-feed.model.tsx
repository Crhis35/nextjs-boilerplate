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

export interface DroneVideoFeedProps {
  drone: DroneData;
  isEnlarged: boolean;
  onTogglePause: () => void;
  onEnlarge: () => void;
  isSelected: boolean;
  onSelect: () => void;
}
