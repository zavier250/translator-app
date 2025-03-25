'use client';

import React from 'react';
import {
  Input,
  Text,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control'
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
// Import the styles for the form inputs and buttons
import { inputStyles } from '../../module/components';

import { SignupFormData } from './sign-up-form';

interface EmailFieldProps {
    register: UseFormRegister<SignupFormData>;
    errors: FieldErrorsImpl<SignupFormData>;
  }

export function EmailField({ register, errors }: EmailFieldProps) {
return (
    <FormControl isInvalid={!!errors.email} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.300" mb={4} width="100%">
        Email
        <Text as="span" color="red.500">
        *
        </Text>
    </FormLabel>
    <Input
        type="email"
        placeholder="example@domain.com"
        {...inputStyles}
        {...register('email')}
        borderColor={errors.email ? 'red.500' : 'gray.300'}
        _focusVisible={{
        borderColor: errors.email ? 'red.500' : 'blue.500',
        boxShadow: 'none',
        }}
        color="gray.800"
    />
    <FormErrorMessage mt={1}>
        {errors.email && (
        <Text as="span" color="red.500" ml={1}>
            {errors.email.message}
        </Text>
        )}
    </FormErrorMessage>
    </FormControl>
);
}