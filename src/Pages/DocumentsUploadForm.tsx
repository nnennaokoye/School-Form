import { Box, Button, FormControl, FormLabel, Input, Flex, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalFooter, Heading } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateDocuments, resetForm as resetFormAction } from '../store/formSlice'; 
import * as Yup from 'yup';
import { RootState } from '../store/store';
import { useState } from 'react';

interface DocumentsUploadFormProps {
  prevStep: () => void;
  goToFirstStep: () => void; 
}

const DocumentsUploadForm: React.FC<DocumentsUploadFormProps> = ({ prevStep, goToFirstStep }) => {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.form.documents);
  
  const [isModalOpen, setModalOpen] = useState(false);

  const validationSchema = Yup.object({
    profilePicture: Yup.mixed()
      .test('fileRequired', 'Profile picture is required', value => value instanceof File),
    idCard: Yup.mixed()
      .test('fileRequired', 'ID card is required', value => value instanceof File),
    transcript: Yup.mixed()
      .test('fileRequired', 'Transcript is required', value => value instanceof File),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <>
      <Flex justify="center" align="center" minHeight="100px">
        <Box p={6} maxW="500px" width="430px" mx="auto" mt={10}>
          <Heading as="h2" size="md" textAlign="center" mb={4} color="#0047AB">
            Document
          </Heading>
          <Formik
            initialValues={documents} 
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              // Dispatch the form values to the Redux store
              dispatch(updateDocuments(values)); 
              setModalOpen(true);  // Open success modal
              
              // Reset the Formik form state
              resetForm();  
              
              // Reset the form data in Redux after submission
              dispatch(resetFormAction());
            }}
          >
            {({ setFieldValue, errors, touched, values }) => (
              <Form>
                <FormControl isInvalid={touched.profilePicture && !!errors.profilePicture}>
                  <FormLabel color="#0047AB">Profile Picture</FormLabel>
                  <Input
                    name="profilePicture"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('profilePicture', file);
                    }}
                  />
                  {touched.profilePicture && errors.profilePicture && (
                    <Box color="red">{errors.profilePicture as string}</Box>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.idCard && !!errors.idCard}>
                  <FormLabel color="#0047AB">ID Card</FormLabel>
                  <Input
                    name="idCard"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('idCard', file);
                    }}
                  />
                  {touched.idCard && errors.idCard && (
                    <Box color="red">{errors.idCard as string}</Box>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.transcript && !!errors.transcript}>
                  <FormLabel color="#0047AB">Transcript</FormLabel>
                  <Input
                    name="transcript"
                    type="file"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('transcript', file);
                    }}
                  />
                  {touched.transcript && errors.transcript && (
                    <Box color="red">{errors.transcript as string}</Box>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.password && !!errors.password}>
                  <FormLabel color="#0047AB">Password</FormLabel>
                  <Field name="password" as={Input} type="password" placeholder="Enter password" />
                  {touched.password && errors.password && (
                    <Box color="red">{errors.password}</Box>
                  )}
                </FormControl>

                <FormControl isInvalid={touched.confirmPassword && !!errors.confirmPassword}>
                  <FormLabel color="#0047AB">Confirm Password</FormLabel>
                  <Field 
                    name="confirmPassword" 
                    as={Input} 
                    type="password" 
                    placeholder="Confirm your password" 
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Box color="red">{errors.confirmPassword}</Box>
                  )}
                </FormControl>

                <Flex mt="30px" justify="flex-end" align="center" gap="16px">
                  <Button
                    mt={6}
                    color="white"
                    bg="#0047AB"
                    size="lg"
                    width="200px"
                    height="50px"
                    onClick={() => {
                      dispatch(updateDocuments(values)); 
                      prevStep();
                    }}
                    sx={{ _hover: { bg: '#0047AB' }}}
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
                    sx={{ _hover: { bg: '#0047AB' }}}
                  >
                    Submit
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box color="black">Form Submitted Successfully.</Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => {
              setModalOpen(false);
              dispatch(resetFormAction()); 
              goToFirstStep();  // Navigate back to the first step
            }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentsUploadForm;
