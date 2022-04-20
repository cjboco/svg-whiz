import { SpinnerCircular } from 'spinners-react';
import { Primary } from '../components/Colors.jsx';
import styled from 'styled-components';

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 1;
`;

const Label = styled.h2`
  color: ${Primary()};
`;

const Loading = ({ visible = false }) => {
  return (
    <>
      {visible ? (
        <Page>
          <SpinnerCircular
            size={70}
            thickness={180}
            speed={100}
            color={Primary('default')}
            secondaryColor={Primary('default', 0.1)}
          />
          <Label>Processing</Label>
        </Page>
      ) : (
        ''
      )}
    </>
  );
};

export default Loading;
