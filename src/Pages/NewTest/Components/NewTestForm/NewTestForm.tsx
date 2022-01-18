import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import {
  Box, Flex, Heading,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, NumberInputControl } from 'formik-chakra-ui';
import { CreateNewTest, initialTestValues, validationTestSchema } from './NewTestForm.Logic';
import ModalDialog from '../../../../Components/ModalDialog/ModalDialog';
import { ErrorResponse } from '../../../../Types/Errors';
import { TEST_IN_PROGRESS_COOKIE_NAME } from '../../../../Utils/Cookies/Cookies.constants';

const NewTestForm = () => {
  const formRef = useRef<any>(null);
  const setCookie = useCookies([TEST_IN_PROGRESS_COOKIE_NAME])[1];

  return (
    <ModalDialog
      rest={{ maxW: { base: '70vw', md: '50vw' } }}
      title="Set New Test Parameters"
      shouldOpen={{ isOpen: true }}
      onAction={async () => {
        if (formRef.current) {
          if (Object.keys(formRef.current.errors).length === 0) {
            formRef.current.submitForm();
          } else throw new ErrorResponse('form is not valid', 400);
        } else throw new ErrorResponse('formRef Error', 500);
      }}
      acceptButtonText="Create New Test"
      isCancelable={false}
    >
      <Flex w="100%" justifyContent="center" align="center" flexDir="column">
        <Heading size="lg">Create Test Form</Heading>
        <Formik
          innerRef={formRef}
          initialValues={initialTestValues}
          onSubmit={(values) => CreateNewTest(values, setCookie)}
          validationSchema={validationTestSchema}
        >
          {({ handleSubmit }) => (
            <Box
              as="form"
              onSubmit={handleSubmit as any}
              w="90%"
              display="flex"
            >
              <Flex padding="2%" flex="1" flexDir="column">
                <InputControl name="labelType" label="Label Type" />
                <InputControl name="batchNum" label="Batch Number" />
                <InputControl name="boxNum" label="Box Number" />
              </Flex>
              <Flex padding="2%" flex="1" flexDir="column">
                <InputControl name="testDate" label="Test Date" />
                <NumberInputControl name="IncubatorTemp" label="Incubator Temperature" />
              </Flex>
            </Box>
          )}
        </Formik>
      </Flex>
    </ModalDialog>
  );
};

export default NewTestForm;
