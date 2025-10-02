'use client';

import React from 'react';

import { Box, Text, useMantineTheme } from '@mantine/core';

import { ObjectDetectionOverlayProps } from './object-detection-overlay.model';
import classes from './object-detection-overlay.module.css';

const getDetectionColors = (type: string, theme: any) => {
  switch (type) {
    case 'person':
      return { borderColor: theme.colors.blue[5], color: theme.colors.blue[5] };
    case 'vehicle':
      return { borderColor: theme.colors.red[5], color: theme.colors.red[5] };
    case 'animal':
      return {
        borderColor: theme.colors.green[5],
        color: theme.colors.green[5],
      };
    default:
      return { borderColor: theme.colors.gray[5], color: theme.colors.gray[5] };
  }
};

const getDetectionLabel = (type: string) => {
  switch (type) {
    case 'person':
      return 'Person';
    case 'vehicle':
      return 'Vehicle';
    case 'animal':
      return 'Animal';
    default:
      return 'Object';
  }
};

export default function ObjectDetectionOverlay(
  props: ObjectDetectionOverlayProps,
) {
  const { detections } = props;
  const theme = useMantineTheme();

  return (
    <Box className={classes.container}>
      {detections.map(detection => {
        const colors = getDetectionColors(detection.type, theme);
        return (
          <Box
            key={detection.id}
            className={classes.box}
            style={{
              left: `${detection.x}%`,
              top: `${detection.y}%`,
              width: `${detection.width}%`,
              height: `${detection.height}%`,
              borderColor: colors.borderColor,
            }}
          >
            <Text className={classes.label} style={{ color: colors.color }}>
              {getDetectionLabel(detection.type)}
            </Text>
          </Box>
        );
      })}
    </Box>
  );
}
