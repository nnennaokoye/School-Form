import { Box, Button, FormControl, FormLabel, Input, Select, Flex, Heading, Stack, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../store/formSlice';
import * as Yup from 'yup';
import { RootState } from '../store/store';

interface PersonalInformationFormProps {
  nextStep: () => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({ nextStep }) => {
  const dispatch = useDispatch();
  const personalInfo = useSelector((state: RootState) => state.form.personalInfo);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string().required('Contact number is required'),
  });

  return (
    <Flex
      justify="center"
      align="center"
      minHeight="100px"
    >
      <Box
        p={6}
        maxW="700px" 
        width="430px" 
        mx="auto"
        mt={10}
        overflow="hidden"
      >
        <Heading as="h2" size="md" textAlign="center" mb={4} color="#0047AB">
          Personal Information
        </Heading>
        <Formik
          initialValues={personalInfo}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updatePersonalInfo(values));
            nextStep();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl isInvalid={touched.firstName && !!errors.firstName}>
                <FormLabel color="#0047AB">First Name</FormLabel>
                <Field name="firstName" as={Input} placeholder="John"  />
                <Box color="red">{touched.firstName && errors.firstName}</Box>
              </FormControl>

              <FormControl mt={4} isInvalid={touched.lastName && !!errors.lastName}>
                <FormLabel color="#0047AB">Last Name</FormLabel>
                <Field name="lastName" as={Input} placeholder="Doe" _placeholder={{ color: '#0047AB' }} />
                <Box color="red">{touched.lastName && errors.lastName}</Box>
              </FormControl>

              <FormControl mt={4} isInvalid={touched.gender && !!errors.gender}>
                <FormLabel color="#0047AB">Gender</FormLabel>
                <Field name="gender" as={Select}>
                  <option style={{ color: '#0047AB' }} value="">Select Gender</option>
                  <option style={{ color: '#0047AB' }} value="Male">Male</option>
                  <option style={{ color: '#0047AB' }} value="Female">Female</option>
                </Field>
                <Box color="red">{touched.gender && errors.gender}</Box>
              </FormControl>

              <FormControl mt={4} isInvalid={touched.email && !!errors.email}>
                <FormLabel color="#0047AB">Email Address</FormLabel>
                <Field name="email" as={Input} placeholder="John@gmail.com"  />
                <Box color="red">{touched.email && errors.email}</Box>
              </FormControl>

              <FormControl mt={4} isInvalid={touched.contactNumber && !!errors.contactNumber}>
                <FormLabel color="#0047AB">Contact Number</FormLabel>
                <Stack>
                <InputGroup>
                <InputLeftAddon children="+234" />
                <Field name="contactNumber" as={Input} placeholder="8123456789"  />
                </InputGroup>
                </Stack>
                <Box color="red">{touched.contactNumber && errors.contactNumber}</Box>
              </FormControl>

              <Flex mt="30px" justify="flex-end" align="center" gap="16px">
                <Button
                  mt={6}
                  color="white"
                  bg="#0047AB"
                  size="lg" 
                  width="200px" 
                  height="50px" 
                  type="submit"
                  sx={{
                    _hover: { bg: '#0047AB' }, 
                  }}
                >
                  Next
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default PersonalInformationForm;
