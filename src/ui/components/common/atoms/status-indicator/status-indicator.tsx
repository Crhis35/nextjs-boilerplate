import React from 'react';

import { Badge } from '@mantine/core';
import { IconCircle } from '@tabler/icons-react';

import { StatusIndicatorProps } from './status-indicator.model';

export default function StatusIndicator(props: StatusIndicatorProps) {
  const { status } = props;
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'green';
      case 'mission':
        return 'dark-blue';
      case 'disconnected':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = () => {
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
    <Badge
      color={getStatusColor()}
      size="sm"
      leftSection={<IconCircle size={8} />}
    >
      {getStatusLabel()}
    </Badge>
  );
}
