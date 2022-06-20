import React, { useState } from 'react';
import {
  Box, Button, Flex, Heading, Image, Select, Text,
} from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import varcodeLogo from '../../Assets/varcode-logo.png';
import { initialValues, onSubmit, validationSchema } from './Register.Logic';
import Card from '../../Components/Card/Card';
import OrganizationForm from './Components/OrganizationForm';
import { IOrganization } from '../../Types/User.Types';
import FetchWrapper from '../../Components/FetchWrapper/FetchWrapper';
import useFetch from '../../hooks/useFetch/useFetch.hook';
import { getAllOrganizations } from '../../services/User.services';

const Register = () => {
  const state = useFetch<IOrganization[]>('organizations-list', getAllOrganizations);
  const [organizationDetails, setOrganizationDetails] = useState<string>();
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" mt="5rem" w="100%">
      <FetchWrapper state={state}>

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
                    <Text>Organization</Text>
                    <Select
                      my="1rem"
                      name="organization"
                      placeholder="Select organization"
                      onChange={(e) => setOrganizationDetails(e.target.value)}
                    >
                      {state.data?.map((organization : IOrganization) => (
                        <option key={organization._id} value={organization._id}>
                          {organization.organizationName.toLowerCase()}
                        </option>
                      ))}
                    </Select>
                    <Button type="submit" colorScheme="blue" alignSelf="flex-end">Create User</Button>
                  </Flex>
                </Box>
              )}
            </Formik>
          </Flex>
        </Card>
      </FetchWrapper>
    </Flex>
  );
};

export default Register;
