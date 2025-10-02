'use client';
import React from 'react';

import { Card, Button, Badge, Image } from '@mantine/core';
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconMaximize,
  IconMinimize,
} from '@tabler/icons-react';

import { DroneVideoFeedProps } from './drone-video-feed.model';
import { ObjectDetectionOverlay, StatusIndicator } from '@atoms';

export default function DroneVideoFeed(props: DroneVideoFeedProps) {
  const { drone, isEnlarged, onTogglePause, onEnlarge, isSelected, onSelect } =
    props;
  const [detectionBoxes, setDetectionBoxes] = React.useState<any[]>([]);

  React.useEffect(() => {
    const generateDetectionBoxes = () => {
      const boxes = [];
      // Generate boxes for people
      for (let i = 0; i < drone.detections.people; i++) {
        boxes.push({
          id: `person-${i}`,
          type: 'person',
          x: Math.random() * 70 + 10,
          y: Math.random() * 60 + 20,
          width: Math.random() * 8 + 4,
          height: Math.random() * 10 + 6,
        });
      }

      // Generate boxes for vehicles
      for (let i = 0; i < drone.detections.vehicles; i++) {
        boxes.push({
          id: `vehicle-${i}`,
          type: 'vehicle',
          x: Math.random() * 60 + 15,
          y: Math.random() * 50 + 25,
          width: Math.random() * 12 + 8,
          height: Math.random() * 8 + 6,
        });
      }

      // Generate boxes for animals
      for (let i = 0; i < drone.detections.animals; i++) {
        boxes.push({
          id: `animal-${i}`,
          type: 'animal',
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          width: Math.random() * 6 + 3,
          height: Math.random() * 6 + 3,
        });
      }

      setDetectionBoxes(boxes);
    };

    generateDetectionBoxes();

    // Update detection boxes periodically to simulate movement
    const interval = setInterval(generateDetectionBoxes, 3000);
    return () => clearInterval(interval);
  }, [drone.detections]);

  return (
    <Card
      shadow="md"
      radius="md"
      style={{
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: isSelected
          ? '2px solid var(--mantine-color-blue-6)'
          : '1px solid var(--mantine-color-dark-4)',
        background: 'var(--mantine-color-dark-6)',
      }}
      onClick={onSelect}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
          padding: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'white',
                margin: 0,
              }}
            >
              {drone.name}
            </h3>
            <StatusIndicator status={drone.status} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              size="xs"
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                onTogglePause();
              }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            >
              {drone.isPaused ? (
                <IconPlayerPlay size={16} />
              ) : (
                <IconPlayerPause size={16} />
              )}
            </Button>
            <Button
              size="xs"
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                onEnlarge();
              }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
            >
              {isEnlarged ? (
                <IconMinimize size={16} />
              ) : (
                <IconMaximize size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Video Feed */}
      <div style={{ position: 'relative', height: '100%' }}>
        <Image
          src={drone.videoFeed}
          alt={`${drone.name} feed`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: drone.isPaused ? 'grayscale(1) opacity(0.5)' : 'none',
          }}
        />

        {/* Paused Overlay */}
        {drone.isPaused && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.3)',
            }}
          >
            <Badge color="gray" size="lg">
              PAUSED
            </Badge>
          </div>
        )}

        {/* Offline Overlay */}
        {drone.status === 'disconnected' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(139, 69, 19, 0.3)',
            }}
          >
            <Badge color="red" size="lg">
              DISCONNECTED
            </Badge>
          </div>
        )}

        {/* Object Detection Overlay */}
        {!drone.isPaused && drone.status !== 'disconnected' && (
          <ObjectDetectionOverlay detections={detectionBoxes} />
        )}
      </div>

      {/* Status Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          padding: '0.75rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.8)',
          }}
        >
          <span>Alt: {drone.altitude}m</span>
          <span>Bat: {drone.battery}%</span>
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {drone.location}
          </span>
        </div>
      </div>
    </Card>
  );
}
