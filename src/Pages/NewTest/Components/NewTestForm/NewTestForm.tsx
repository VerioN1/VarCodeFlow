import React, { useRef } from 'react';
import {
  Box, Flex, Heading,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, NumberInputControl } from 'formik-chakra-ui';
import { useSelector } from 'react-redux';
import { CreateNewTest, initialTestValues, validationTestSchema } from './NewTestForm.Logic';
import ModalDialog from '../../../../Components/ModalDialog/ModalDialog';
import { ErrorResponse } from '../../../../Types/Errors.Types';
import DatePickerField from './DatePickerField';
import { RootState } from '../../../../Redux/store';
import { IOrganization, IUser } from '../../../../Types/User.Types';
import useFetch from '../../../../hooks/useFetch/useFetch.hook';
import { getOrganizationById } from '../../../../services/User.services';
import FetchWrapper from '../../../../Components/FetchWrapper/FetchWrapper';

const NewTestForm = () => {
  const formRef = useRef<any>(null);
  const userData = useSelector((state: RootState) => state.userData) as unknown as IUser;
  const state = useFetch<IOrganization>('get-org-details', () => getOrganizationById(userData.organizationID));
  // debugger;
  return (
    <ModalDialog
      rest={{ maxW: { base: '70vw', md: '50vw' } }}
      title="Set New Test Parameters"
      shouldOpen={{ isOpen: true }}
      onAction={async () => {
        if (formRef.current) {
          if (Object.keys(formRef.current.errors).length === 0) {
            formRef.current.submitForm();
          } else throw new ErrorResponse('Please Finish Filling The Form Properly', 400);
        } else throw new ErrorResponse('form Error', 500);
      }}
      acceptButtonText="Create New Test"
      isCancelable
    >
      <Flex w="100%" justifyContent="center" align="center" flexDir="column">
        <FetchWrapper state={state}>
          <Heading size="lg">Create Test Form</Heading>
          <Formik
            innerRef={formRef}
            initialValues={initialTestValues}
            onSubmit={(values) => CreateNewTest(values, userData, state.data?.organizationName)}
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
                  <NumberInputControl name="drumInterval" label="last BarCode Interval in seconds" />
                </Flex>
                <Flex padding="2%" flex="1" flexDir="column">
                  {userData.tier === 'owner' && (
                  <>
                    <NumberInputControl name="volume" label="volume" />
                    <InputControl name="machineNum" label="machine Number" />
                  </>
                  )}
                  <InputControl name="experimentName" label="Test Name" />
                  <DatePickerField name="manufacturingDate" />
                  <NumberInputControl name="incubatorTemp" label="Incubator Temperature In Celsius " />
                </Flex>
              </Box>
            )}
          </Formik>
        </FetchWrapper>
      </Flex>
    </ModalDialog>
  );
};

export default NewTestForm;
