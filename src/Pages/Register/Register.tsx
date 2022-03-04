import React, { useEffect, useState } from 'react';
import {
  Box, Button, Flex, Heading, Image, Select,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { InputControl } from 'formik-chakra-ui';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import varcodeLogo from '../../Assets/varcode-logo.png';
import { initialValues, onSubmit, validationSchema } from './Register.Logic';
import Card from '../../Components/Card/Card';
import OrganizationForm from './Components/OrganizationForm';
import { IOrganization } from '../../Types/User.Types';

const Register = () => {
  const userData = useSelector((state:RootState) => state.userData);
  const [organizationDetails, setOrganizationDetails] = useState<IOrganization>();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData?.organization) {
      console.log('userData', userData);
    }
  }, []);

  return (
    <Flex justifyContent="center" mt="5rem" w="100%">
      <Card w="70vw">
        <Image
          src={varcodeLogo}
          alt="Barcode"
          htmlHeight="200px"
          htmlWidth="400px"
        />
        <Flex w="100%" justifyContent="center" align="center" flexDir="column">
          <Heading size="lg">Create new user</Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values, navigate, organizationDetails)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Box
                as="form"
                onSubmit={handleSubmit as any}
                w="90%"
                display="flex"
              >
                <Flex padding="2%" flex="1" flexDir="column">
                  <InputControl name="firstName" label="First Name" />
                  <InputControl name="lastName" label="Last Name" />
                  <InputControl name="phoneNumber" label="Phone" />
                </Flex>
                <Flex padding="2%" flex="1" flexDir="column">
                  <InputControl name="email" label="Email" />
                  <InputControl name="password" label="Password" />
                  <OrganizationForm setOrganizationDetails={setOrganizationDetails} />
                  <Button type="submit" colorScheme="blue" alignSelf="flex-end">Create User</Button>
                </Flex>
              </Box>
            )}
          </Formik>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Register;
