// /stories/pages/home.stories.jsx
import Button from '../../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      name: 'Size',
      description:
        'The size of the button. Can be either left/start (default) or right/end.',
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
    isPrimary: {
      name: 'Is Primary',
      description: 'Changing to true set as a primary button.',
      control: {
        type: 'boolean',
      },
    },
    handleClick: { action: 'handleClick' },
  },
};

const Template = (args) => <Button {...args} />;

export const Small = Template.bind({});
Small.args = {
  label: 'Click Me',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  label: 'Click Me',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Click Me',
  size: 'large',
};
