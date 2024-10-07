import { Box, Card, Stack, CardBody } from '@chakra-ui/react';
import SideProgressBar from './SideProgressBar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; 
}

const FormLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      position="fixed"          
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="auto"       
      bg="white"
      minheight="100vh"           
    >
      <Card
        direction={{ base: 'column', md: 'row' }} 
        boxShadow="md"
        width="full"
        height="100%"         
        overflow="auto"
      >
        <Box
          width={{ base: '100%', md: '250px' }}    
          bg="#0047AB"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <SideProgressBar />
        </Box>

        <Stack
          flex="1"
          height="100%"         
        >
          <CardBody style={{ height: '100%', overflowY: 'auto' }}>
            {children}
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

export default FormLayout;
