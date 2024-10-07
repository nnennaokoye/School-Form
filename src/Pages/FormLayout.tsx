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
      overflow="hidden"       
      bg="white"
      height="100vh"           
    >
      <Card
        direction={{ base: 'column', md: 'row' }}  // Stacks vertically on small screens, horizontally on larger screens
        boxShadow="md"
        width="full"
        height="100%"         // 100% of the viewport height
        overflow="hidden"
      >
        <Box
          width={{ base: '100%', md: '250px' }}    // Full width on mobile, fixed width on larger screens
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
          height="100%"         // Ensure content fills the remaining space
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
