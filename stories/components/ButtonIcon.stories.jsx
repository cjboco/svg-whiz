// /stories/pages/home.stories.jsx
import ButtonIcon from '../../components/ButtonIcon';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  argTypes: {
    icon: {
      name: 'Icon',
      description:
        'The icon. Can be a simple string, html or react element (i.e. react-icons).',
    },
    iconPosition: {
      name: 'Icon Position',
      description:
        'The position of the icon. Can be either left/start (default) or right/end.',
      control: {
        type: 'select',
      },
      options: ['left', 'start', 'right', 'end'],
    },
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
    handleClick: { name: 'Click Handler', action: 'handleClick' },
  },
};

const Template = (args) => <ButtonIcon {...args} />;

export const IconStartSmall = Template.bind({});
IconStartSmall.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'start',
  size: 'small',
};

export const IconStartMedium = Template.bind({});
IconStartMedium.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'start',
  size: 'medium',
};

export const IconStartLarge = Template.bind({});
IconStartLarge.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'start',
  size: 'large',
};

export const IconEndSmall = Template.bind({});
IconEndSmall.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'end',
  size: 'small',
};

export const IconEndMedium = Template.bind({});
IconEndMedium.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'end',
  size: 'medium',
};

export const IconEndLarge = Template.bind({});
IconEndLarge.args = {
  label: 'Click Me',
  icon: '∆',
  iconPosition: 'end',
  size: 'large',
};
