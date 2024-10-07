import { Box, Stepper, Step, StepIndicator, StepStatus, StepIcon, StepNumber, Text, StepSeparator } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


const steps = [
  { step: 0, title: 'First', route: "/" },
  { step: 1, title: 'Second', route: "/academic-details" },
  { step: 2, title: 'Third', route: "/emergency-contact" },
  { step: 3, title: 'Fourth', route: "/documents-upload" }
];

const SideProgressBar = () => {
  const location = useLocation();
  
  const currentStep = steps.findIndex(step => step.route === location.pathname);

  return (
    <Stepper index={currentStep} orientation="vertical" height="500px" gap="2">
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<Text as="span" color="white"><StepNumber /></Text>}   
              active={<Text as="span" color="white"><StepNumber /></Text>}        
            />
          </StepIndicator>

          <Box flexShrink="0">
            <Text color="white" fontWeight="bold">{step.title}</Text> 
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default SideProgressBar;
