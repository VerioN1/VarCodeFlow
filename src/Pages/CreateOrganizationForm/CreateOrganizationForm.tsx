import React from 'react';
import {
  Box, Button, Flex, Heading, Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { CreateOrganization, initialOrganizationValues, validationCreateOrgSchema } from '../Register/Components/OrganizationForm.logic';

const CreateOrganizationForm = () => (
  <Flex w="100%" justifyContent="center" align="center" flexDir="column" m="5rem">
    <Heading size="lg">Create New Organization</Heading>
    <Text>After you finish, this organization will be set to the created account automatically </Text>
    <Formik
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
            <Button type="submit" mt="2rem" maxW="14rem">Create Organization</Button>
          </Flex>
        </Box>
      )}
    </Formik>
  </Flex>
);

export default CreateOrganizationForm;
