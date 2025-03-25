'use client';
import { Image } from '@chakra-ui/react';
import React from 'react';
import {
Input,
Text,
Button,
Flex,
} from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import {
FormControl,
FormLabel,
FormErrorMessage,
} from '@chakra-ui/form-control'

import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';

// Import the styles for the form inputs and buttons
import { inputStyles } from '../../module/components';

import { SignupFormData } from './sign-up-form';

interface PasswordFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
showPassword: boolean;
onToggleShowPassword: () => void;
}

export function PasswordField({
register,
errors,
showPassword,
onToggleShowPassword,
}: PasswordFieldProps) {
return (
    <FormControl isInvalid={!!errors.password} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.300" mb={4} width="100%">
        Password
        <Text as="span" color="red.500">
        *
        </Text>
    </FormLabel>
    <Flex position="relative">
        <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        {...inputStyles}
        {...register('password')}
        pr="4.5rem"
        />
        <Button
        position="absolute"
        right="2"
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        variant="ghost"
        onClick={onToggleShowPassword}
        >
        {showPassword ? (
            <FiEye />
        ) : (
            <Image
            src="/icons/eye-closed.png"
            boxSize="20px"
            alt="hidden password"
            />
        )}
        </Button>
    </Flex>
    <FormErrorMessage mt={1}>
        {errors.password && (
        <Text as="span" color="red.500" ml={1}>
            {errors.password.message}
        </Text>
        )}
    </FormErrorMessage>
    </FormControl>
);
}
