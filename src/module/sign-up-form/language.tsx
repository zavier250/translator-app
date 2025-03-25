'use client';
import React from 'react';
import {
  Input,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import {
FormControl,
FormLabel,
FormErrorMessage,
} from '@chakra-ui/form-control'
import { FiChevronRight } from 'react-icons/fi';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from './sign-up-form';
import { inputStyles } from '../components';

interface LanguageFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
}

export function LanguageField({ register, errors }: LanguageFieldProps) {
return (
<FormControl isInvalid={!!errors.language} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.300" mb={4} width="100%">
    Language
    <Text as="span" color="red.500"> *</Text>
    </FormLabel>
    <Flex position="relative" alignItems="center">
    <Input
        placeholder="Language"
        {...inputStyles}
        {...register('language')}
        readOnly
        cursor="pointer"
        onClick={() => console.log("Navigate to language selection")}
        borderColor={errors.language ? 'red.500' : 'gray.300'}
        _focusVisible={{
        borderColor: errors.language ? 'red.500' : 'blue.500',
        boxShadow: 'none',
        }}
        color="gray.800"
    />
    <Box position="absolute" right="3" color="gray.400">
        <FiChevronRight />
    </Box>
    </Flex>
    <FormErrorMessage>
    {errors.language && errors.language.message}
    </FormErrorMessage>
</FormControl>
);
}
