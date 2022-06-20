import React, { FC, useRef } from 'react';
import {
  Box, Flex, Heading, Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import ModalDialog from '../../../Components/ModalDialog/ModalDialog';
import { ErrorResponse } from '../../../Types/Errors.Types';
import {
  CreateOrganization,
  initialOrganizationValues,
  validationCreateOrgSchema,
} from './OrganizationForm.logic';

type props = {
    setOrganizationDetails: React.Dispatch<React.SetStateAction<any>>;
}
const OrganizationForm : FC<props> = ({ setOrganizationDetails }) => {
  const formRef = useRef<any>(null);

  return (
    <ModalDialog
      rest={{ maxW: { base: '70vw', md: '50vw' } }}
      title="New Organization Form"
      shouldOpen={{
        isOpen: false,
        buttonText: 'Create new Organization',
        toolTipText: 'New Organization Form',
        buttonProps: { variant: 'ghost', w: 'min-content' },
      }}
      onAction={async () => {
        if (formRef.current) {
          if (Object.keys(formRef.current.errors).length === 0) {
            formRef.current.submitForm();
          } else throw new ErrorResponse("you haven't filled the form properly", 400);
        } else throw new ErrorResponse('formRef Error', 500);
      }}
      acceptButtonText="Create New Organization"
      isCancelable
    >
      <Flex w="100%" justifyContent="center" align="center" flexDir="column">
        <Heading size="lg">Create New Organization</Heading>
        <Text>After you finish, this organization will be set to the created account automatically </Text>
        <Formik
          innerRef={formRef}
          initialValues={initialOrganizationValues}
          onSubmit={(values) => CreateOrganization(values)}
          validationSchema={validationCreateOrgSchema}
        >
          {({ handleSubmit }) => (
            <Box
              as="form"
              onSubmit={handleSubmit as any}
              w="90%"
              display="flex"
            >
              <Flex padding="2%" flex="1" flexDir="column">
                <InputControl name="contactName" label="Organization Contact Name" />
                <InputControl name="contactEmail" label="Contact Email" />
                <InputControl name="organizationName" label="Organization Name" />
              </Flex>
              <Flex padding="2%" flex="1" flexDir="column">
                <InputControl name="country" label="Country of origin" />
                <InputControl name="city" label="City" />
                <InputControl name="phoneNumber" label="Contact Phone number" />
              </Flex>
            </Box>
          )}
        </Formik>
      </Flex>
    </ModalDialog>
  );
};

export default OrganizationForm;
