import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PersonalInformationForm from './Pages/PersonalInformationForm';
import AcademicDetailsForm from './Pages/AcademicDetailsForm';
import EmergencyContactForm from './Pages/EmergencyContactForm';
import DocumentsUploadForm from './Pages/DocumentsUploadForm';
import { ChakraProvider } from '@chakra-ui/react';
import FormLayout from './Pages/FormLayout';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <FormLayout>
          <Routes>
            <Route path="/" element={<PersonalInformationForm nextStep={() => window.location.href = '/academic-details'} />} />
            <Route path="/academic-details" element={<AcademicDetailsForm nextStep={() => window.location.href = '/emergency-contact'} prevStep={() => window.location.href = '/'} />} />
            <Route path="/emergency-contact" element={<EmergencyContactForm nextStep={() => window.location.href = '/documents-upload'} prevStep={() => window.location.href = '/academic-details'} />} />
            <Route path="/documents-upload" element={<DocumentsUploadForm prevStep={() => window.location.href = '/emergency-contact'} goToFirstStep={() => window.location.href = '/'}/>} />
          </Routes>
        </FormLayout>
      </Router>
    </ChakraProvider>
  );
};

export default App;
