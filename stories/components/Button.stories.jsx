// /stories/pages/home.stories.jsx
import Button from '../../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    handleClick: { action: 'handleClick' }
  }
};

const Template = (args) => <Button{...args} />

export const Small = Template.bind({});
Small.args = {
  label: 'Button',
  size: 'small'
}

export const Medium = Template.bind({});
Medium.args = {
  label: 'Button',
  size: 'medium'
}

export const Large = Template.bind({});
Large.args = {
  label: 'Button',
  size: 'large'
}