// @ts-nocheck
import { FieldHookConfig, useField, useFormikContext } from 'formik';
import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Text } from '@chakra-ui/react';

const DatePickerField : FC<string | FieldHookConfig<any>> = (props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <>
      <Text fontSize="xl">Enter Manufacturing date</Text>
      <DatePicker
        className="date-picker"
        {...field}
        {...props}
        maxDate={new Date()}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    </>
  );
};

export default DatePickerField;
