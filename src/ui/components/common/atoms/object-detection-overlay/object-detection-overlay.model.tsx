interface Detection {
  id: string;
  type: 'person' | 'vehicle' | 'animal';
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
}

export interface ObjectDetectionOverlayProps {
  detections: Detection[];
}
