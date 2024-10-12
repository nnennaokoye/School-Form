import { Box, Button, FormControl, FormLabel, Input, Select, Flex, Heading } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateAcademicDetails } from '../store/formSlice';
import * as Yup from 'yup';
import { RootState } from '../store/store';

interface AcademicDetailsFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const AcademicDetailsForm: React.FC<AcademicDetailsFormProps> = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const academicDetails = useSelector((state: RootState) => state.form.academicDetails);

  const validationSchema = Yup.object({
    courseOfStudy: Yup.string().required('Course of study is required'),
    enrollmentYear: Yup.string().required('Enrollment year is required'),
    studentID: Yup.string()
    .length(9, 'Invalid Student ID')
    .matches(/^\d{9}$/, 'Invaid Student ID')
    .required('Student ID is required'),
    gpa: Yup.number()
      .typeError('Invalid GPA')
      .required('GPA is required')
      .min(0, 'Invalid GPA')
      .max(5, 'Invalid GPA'),
    academicAdvisor: Yup.string().required('Academic advisor name is required'),
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
          Academic Details
        </Heading>
        <Formik
          initialValues={academicDetails}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateAcademicDetails(values));
            nextStep();
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <FormControl isInvalid={touched.courseOfStudy && !!errors.courseOfStudy}>
                <FormLabel color="#0047AB">Course of Study</FormLabel>
                <Field name="courseOfStudy" as={Select} >
                  <option style={{ color: '#0047AB' }} value="">Select Course of Study</option>
                  <option style={{ color: '#0047AB' }} value="Computer Science">Computer Science</option>
                  <option style={{ color: '#0047AB' }} value="Information Technology">Information Technology</option>
                  <option style={{ color: '#0047AB' }} value="Software Engineering">Software Engineering</option>
                  <option style={{ color: '#0047AB' }} value="Business Administration">Business Administration</option>
                </Field>
                <Box color="red">{touched.courseOfStudy && errors.courseOfStudy}</Box>
              </FormControl>

              <FormControl isInvalid={touched.enrollmentYear && !!errors.enrollmentYear}>
                <FormLabel color="#0047AB">Enrollment Year</FormLabel>
                <Field name="enrollmentYear" as={Input} placeholder="2023"  />
                <Box color="red">{touched.enrollmentYear && errors.enrollmentYear}</Box>
              </FormControl>

              <FormControl isInvalid={touched.studentID && !!errors.studentID}>
  <FormLabel color="#0047AB">Student ID</FormLabel>
  <Field
    name="studentID"
    as={Input}
    type="text" 
    placeholder="123456789"
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFieldValue("studentID", value); 
    }}
  />
  <Box color="red">{touched.studentID && errors.studentID}</Box>
</FormControl>

              <FormControl isInvalid={touched.gpa && !!errors.gpa}>
                <FormLabel color="#0047AB">GPA</FormLabel>
                <Field
                  name="gpa"
                  as={Input}
                  type="number"
                  placeholder="4.5"
                  _placeholder={{ color: '#0047AB' }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setFieldValue("gpa", value);
                  }}
                />
                <Box color="red">{touched.gpa && errors.gpa}</Box>
              </FormControl>

              <FormControl isInvalid={touched.academicAdvisor && !!errors.academicAdvisor}>
                <FormLabel color="#0047AB">Academic Advisor Name</FormLabel>
                <Field name="academicAdvisor" as={Input} placeholder="Dr John Smith" _placeholder={{ color: '#0047AB' }} />
                <Box color="red">{touched.academicAdvisor && errors.academicAdvisor}</Box>
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

export default AcademicDetailsForm;