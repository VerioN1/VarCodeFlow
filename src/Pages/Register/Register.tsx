import React, { useEffect } from 'react';
import {
  Box, Button, Flex, Heading, Image, Link, Select,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { InputControl } from 'formik-chakra-ui';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/store';
import varcodeLogo from '../../Assets/varcode-logo.png';
import { initialValues, onSubmit, validationSchema } from '../Register/Register.Logic';
import Card from '../../Components/Card/Card';

const Register = () => {
  const userData = useSelector((state:RootState) => state.userData);
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
            onSubmit={(values) => onSubmit(values, navigate)}
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
                  <InputControl name="email" label="Email" />
                </Flex>
                <Flex padding="2%" flex="1" flexDir="column">
                  <InputControl name="userName" label="User Name" />
                  <InputControl name="password" label="Password" />
                  <Select mt="2rem" placeholder="Select Organization">
                    <option value="option1">Option 1</option>
                  </Select>
                  <Link href="/Register"> Or Create New Orgnaization </Link>
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
