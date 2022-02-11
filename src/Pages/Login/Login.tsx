import {
  Box, Button,
  Flex, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement, Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Dict } from '../../Types/Utils.Types';
import varcodeLogo from '../../Assets/varcode-logo.png';
import { initialValues, onSubmit, validationSchema } from './Login.Logic';
import Card from '../../Components/Card/Card';
import { AuthStatus } from '../../hooks/useAuth/useAuth.hook';

const Login = ({ setAuthStatus } : {setAuthStatus : React.Dispatch<React.SetStateAction<AuthStatus>>}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Flex justifyContent="center" mt="5rem" w="100%">
      <Card>
        <Image
          src={varcodeLogo}
          alt="Barcode"
          htmlHeight="200px"
          htmlWidth="400px"
        />
        <Flex w="100%" justifyContent="center" align="center" flexDir="column">
          <Heading m="5" mb="0" as="h4" size="md">VarCode Flow</Heading>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values, dispatch, navigate, setAuthStatus)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Box
                as="form"
                onSubmit={handleSubmit as any}
                w="90%"
              >
                <Field name="email">
                  {({ field, meta }: { meta: Dict<string>, field: Dict<any> }) => (
                    <>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <RiUserLine />
                        </InputLeftElement>
                        <Input
                          {...field}
                          errorBorderColor="crimson"
                                  // @ts-ignore
                          isInvalid={meta.touched && meta.error}
                          placeholder="User Name"
                          id="email"
                        />
                      </InputGroup>
                      {meta.touched && meta.error && (
                        <Text fontSize="xl" color="red">{meta.error}</Text>
                      )}
                    </>
                  )}
                </Field>
                <Field name="password">
                  {({
                    field,
                    meta,
                  }: { meta: Dict<string>, field: Dict<any> }) => (
                    <>
                      <FormLabel mt="15px" htmlFor="password">Password</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                        >
                          <RiLockPasswordLine />
                        </InputLeftElement>
                        <Input
                          errorBorderColor="crimson"
                          // @ts-ignore
                          isInvalid={meta.touched && meta.error}
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </InputGroup>
                      {meta.touched && meta.error && (
                        <Text fontSize="xl" color="red">{meta.error}</Text>
                      )}
                    </>
                  )}
                </Field>
                <Flex w="100%" justify="flex-end" mt="20px">
                  <Button variant="outline" type="submit" colorScheme="blue" isLoading={isSubmitting}>Login</Button>
                </Flex>
              </Box>
            )}
          </Formik>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Login;
