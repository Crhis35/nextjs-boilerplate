---
to: src/libs/common/components/ui/<%= directory %>/<%= h.changeCase.kebabCase(name) %>/<%= h.changeCase.kebabCase(name) %>.stories.tsx
---
import { Meta, StoryObj } from '@storybook/react';
import <%= h.changeCase.pascal(name) %> from './<%= h.changeCase.kebabCase(name) %>';

const meta = {
  title: '<%= h.changeCase.pascal(directory) %>/CTP<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
  tags: ['autodocs'],
  args: {
  },
} satisfies Meta<typeof <%= h.changeCase.pascal(name) %>>;

export default meta;

type Story = StoryObj<typeof <%= h.changeCase.pascal(name) %>>;

export const CTP<%= h.changeCase.pascal(name) %> = {} satisfies Story;


