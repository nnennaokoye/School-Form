import { Box, Button, FormControl, FormLabel, Input, Select, Flex, Heading, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmergencyContact } from '../store/formSlice'; 
import * as Yup from 'yup';
import { RootState } from '../store/store';

interface EmergencyContactFormProps {
  nextStep: () => void;
  prevStep: () => void; 
}

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({ nextStep, prevStep }) => { 
  const dispatch = useDispatch();
  const emergencyContact = useSelector((state: RootState) => state.form.emergencyContact); 

  const validationSchema = Yup.object({
    contactPerson: Yup.string().required('Contact person is required'),
    relationship: Yup.string().required('Relationship is required'),
    emergencyNumber: Yup.string().required('Emergency number is required'),
    address: Yup.string().required('Address is required'),
    contactMethod: Yup.string().required('Contact method is required'),
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
      >
        <Heading as="h2" size="md" textAlign="center" mb={4} color="#0047AB">
          Emergency Contact
        </Heading>
        <Formik
          initialValues={emergencyContact} 
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateEmergencyContact(values)); 
            nextStep(); 
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormControl>
                <FormLabel color="#0047AB">Contact Person</FormLabel>
                <Field
                  name="contactPerson"
                  as={Input}
                  placeholder="Enter Full Name"
                  isInvalid={touched.contactPerson && !!errors.contactPerson}
                />
                {touched.contactPerson && errors.contactPerson && <Box color="red">{errors.contactPerson}</Box>}
              </FormControl>

              <FormControl>
                <FormLabel color="#0047AB">Relationship</FormLabel>
                <Field
                  name="relationship"
                  as={Input}
                  placeholder="Enter relationship with person"
                  isInvalid={touched.relationship && !!errors.relationship}
                />
                {touched.relationship && errors.relationship && <Box color="red">{errors.relationship}</Box>}
              </FormControl>

              <FormControl>
                <FormLabel color="#0047AB">Emergency Number</FormLabel>
                <Stack spacing={4}>
                  <InputGroup>
                    <InputLeftAddon children="+234" />
                    <Field
                      name="emergencyNumber"
                      as={Input}
                      type="tel"
                      placeholder="8123456789"
                      isInvalid={touched.emergencyNumber && !!errors.emergencyNumber}
                    />
                  </InputGroup>
                </Stack>
                <Box color="red">{touched.emergencyNumber && errors.emergencyNumber}</Box>
              </FormControl>

              <FormControl>
                <FormLabel color="#0047AB">Address</FormLabel>
                <Field
                  name="address"
                  as={Input}
                  placeholder="Enter contact address"
                  isInvalid={touched.address && !!errors.address}
                />
                {touched.address && errors.address && <Box color="red">{errors.address}</Box>}
              </FormControl>

              <FormControl>
                <FormLabel color="#0047AB">Preferred Contact Method</FormLabel>
                <Field name="contactMethod" as={Select} placeholder="Select contact method">
                  <option style={{ color: '#0047AB' }} value="Phone">Phone</option>
                  <option style={{ color: '#0047AB' }} value="Email">Email</option>
                </Field>
                {touched.contactMethod && errors.contactMethod && <Box color="red">{errors.contactMethod}</Box>}
              </FormControl>

              <Flex mt="30px" justify="flex-end" align="center" gap="16px">
                <Button
                  mt={6}
                  color="white"
                  bg="#0047AB"
                  size="lg"
                  width="200px"
                  height="50px"
                  onClick={prevStep}
                  sx={{
                    _hover: { bg: '#0047AB' }, 
                  }} 
                >
                  Previous
                </Button>
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

export default EmergencyContactForm;
