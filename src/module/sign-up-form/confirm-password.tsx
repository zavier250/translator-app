'use client';

import React from 'react';
import {
  Input,
  Text,
  Flex,
  Button,
  Image,
} from '@chakra-ui/react';
import { FiEye } from 'react-icons/fi';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from './sign-up-form';
import { inputStyles } from '../components';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from '@chakra-ui/form-control'
interface ConfirmPasswordFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrorsImpl<SignupFormData>;
  showConfirmPassword: boolean;
  onToggleShowConfirmPassword: () => void;
}

export function ConfirmPasswordField({
  register,
  errors,
  showConfirmPassword,
  onToggleShowConfirmPassword,
}: ConfirmPasswordFieldProps) {
  return (
    <FormControl isInvalid={!!errors.confirmPassword} width="100%" mb={8}>
      <FormLabel fontSize="sm" color="gray.300" mb={4} width="100%">
        Confirm Password
        <Text as="span" color="red.500">
          *
        </Text>
      </FormLabel>
      <Flex position="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm password"
          {...inputStyles}
          {...register('confirmPassword')}
          pr="4.5rem"
        />
        <Button
          position="absolute"
          right="2"
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
          onClick={onToggleShowConfirmPassword}
          color={errors.confirmPassword ? 'red.500' : 'gray.500'}
        >
          {showConfirmPassword ? (
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
        {errors.confirmPassword && (
          <Text as="span" color="red.500" ml={1}>
            {errors.confirmPassword.message}
          </Text>
        )}
      </FormErrorMessage>
    </FormControl>
  );
}
