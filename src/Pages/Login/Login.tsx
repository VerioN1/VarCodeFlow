import {
  Box, Button,
  Flex, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement, Text,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Dict } from '../../Types/Utils.Types';
import varcodeLogo from '../../Assets/varcode-logo.png';
import { initialValues, onSubmit, validationSchema } from './Login.Logic';
import { USER_TOKEN_COOKIE_NAME } from '../../Utils/Cookies/Cookies.constants';
import Card from '../../Components/Card/Card';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCookie, setUserCookie] = useCookies([USER_TOKEN_COOKIE_NAME]);

  useEffect(() => {
    if (Object.keys(userCookie).length !== 0) if (userCookie[USER_TOKEN_COOKIE_NAME]) navigate('/');
  }, [userCookie]);

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
            onSubmit={(values) => onSubmit(values, dispatch, navigate, setUserCookie)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Box
                as="form"
                onSubmit={handleSubmit as any}
                w="90%"
              >
                <Field name="userName">
                  {({ field, meta }: { meta: Dict<string>, field: Dict<any> }) => (
                    <>
                      <FormLabel htmlFor="password">User Name</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                        >
                          <RiUserLine />
                        </InputLeftElement>
                        <Input
                          {...field}
                          errorBorderColor="crimson"
                                  // @ts-ignore
                          isInvalid={meta.touched && meta.error}
                          placeholder="User Name"
                          id="userName"
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
                  <Button variant="outline" type="submit" colorScheme="blue">Login</Button>
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
