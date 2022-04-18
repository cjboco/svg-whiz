// /stories/pages/home.stories.jsx
import ButtonIcon from '../../components/ButtonIcon';
import { FaRegSmile } from 'react-icons/fa';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  argTypes: {
    handleClick: { action: 'handleClick' },
    icon: { defaultValue: <FaRegSmile /> },
  },
};

const Template = (args) => <ButtonIcon{...args} />

export const IconStartSmall = Template.bind({});
IconStartSmall.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'start',
  size: 'small'
}

export const IconStartMedium = Template.bind({});
IconStartMedium.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'start',
  size: 'medium'
}

export const IconStartLarge = Template.bind({});
IconStartLarge.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'start',
  size: 'large'
}

export const IconEndSmall = Template.bind({});
IconEndSmall.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'end',
  size: 'small'
}

export const IconEndMedium = Template.bind({});
IconEndMedium.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'end',
  size: 'medium'
}

export const IconEndLarge = Template.bind({});
IconEndLarge.args = {
  label: 'Button',
  icon: <FaRegSmile />,
  iconPosition: 'end',
  size: 'large'
}