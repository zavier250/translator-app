'use client';

import { Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Textarea,
  useBreakpointValue,
} from '@chakra-ui/react';
//Import React Hook Form and Zod for form validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// Import Google icon
import { FcGoogle } from 'react-icons/fc';
// Import password show/hide icons
//children components
import { EmailField } from './email';
import { PasswordField} from './password';
import { ConfirmPasswordField } from './confirm-password';
import { UsernameField } from './username';
import { LanguageField } from './language';
import { PhoneNumberField } from './phone-number';
import { DescriptionField } from './description';
// 1. Definite the schema for the form using Zod
const signupSchema = z
.object({
email: z.string().email('This email has been registered'),
password: z.string().min(6, 'Password must be at least 6 characters'),
confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
userName: z.string().min(1, 'Username is required'),
language: z.string().nonempty('Please select a language'),
phoneCode: z.string().nonempty('Country code is required'),
phoneNumber: z.string().min(6, 'Invalid phone number'),
description: z.string().max(300, 'Description too long').optional(),
})
.refine((data) => data.password === data.confirmPassword, {
path: ['confirmPassword'],
message: 'Passwords do not match',
});
export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Registration Page Component
 * Provides a user interface with multiple registration methods
 * @returns JSX Element - Renders the registration page
 */
export default function SignUpPage() {
// Password visibility state
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const isMobile = useBreakpointValue({ base: true, md: false });
const [countryCode, setCountryCode] = useState("+61");
// Use react-hook-form for form handling and validation
const {
register,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm <SignupFormData>({
resolver: zodResolver(signupSchema),
mode: "onChange", 
});
// Password visibility toggle
const handleClickShowPassword = () => {
setShowPassword(prevState => !prevState);
};
// Send verification code handler
const handleSendCode = () => {
console.log('Sending verification code');
// In actual implementation, should call API to send verification code
};
// add onSubmit function
const onSubmit = async (data:  SignupFormData) => {
try {
console.log("Form Data:", data);
// here can call API handling registration request
} catch (error) {
console.error('Registration error:', error);
}
};

return (
<Box maxW="md" py={8} mx="auto" px={{ base: 4, md: 8 }} width="100%">
{/* title - width responsive design */}
<Box mb={10} maxW={{ base: "70%", md: "100%" }} mx="auto">
    {/* Logo and menu */}
    <Flex justify="space-between" align="center" mb={8} width="100%">
    <Flex align="center">
        <Image
        src="/icons/logo.png"
        alt="IFA Translator Logo"
        w={10}
        h={10}
        borderRadius="full"
        mr={3}
        />
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
        IFA TRANSLATOR
        </Text>
    </Flex>
    <Text fontSize="2xl">☰</Text>
    </Flex>

    {/* Sign Up title */}
    <Heading
    fontSize="2xl"
    fontWeight="bold"
    color="black"
    lineHeight="shorter"
    mb={6}
    textAlign="left" // force align left
    width="100%" // full container width
    >
    Sign Up
    </Heading>
</Box>

{/* Form container */}
<Box maxW={{ base: "70%", md: "100%" }} mx="auto" width="100%">
    <Stack
    as="form"
    spacing={6}
    onSubmit={handleSubmit(onSubmit)}
    width="100%"
    >
    {/* Email */}
    <EmailField register={register} errors={errors} />
    {/* Password */}
    <PasswordField
        register={register}
        errors={errors}
        showPassword={showPassword}
        onToggleShowPassword={() => setShowPassword(!showPassword)}
        />
    {/* ConfirmedPassword Field */}
    <ConfirmPasswordField
        register={register}
        errors={errors}
        showConfirmPassword={showConfirmPassword}
        onToggleShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
    {/* Username */}
    <UsernameField register={register} errors={errors} />
    {/* Language */}
    <LanguageField register={register} errors={errors} />
    {/* PhoneNumber */}
    <PhoneNumberField
        register={register}
        errors={errors}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        />
    {/* Description */}
    <DescriptionField register={register} errors={errors} />
{/* Create account button */}
    <Button
        type="submit"
        colorScheme="gray"
        size="lg"
        mt={8}
        mb={4}
        py={6}
        bg="gray.300"
        color="white"
        _hover={{ bg: "black" }}
        borderRadius="full"
    >
        Create Account
    </Button>
    {/* Divider */}
    <Flex w="full" align="center" gap={3}>
        <Box flex={1} h="1px" bg="gray.200" />
        <Text color="gray.500">OR</Text>
        <Box flex={1} h="1px" bg="gray.200" />
    </Flex>
    {/* Google login button */}
    <Button
        w="full"
        variant="outline"
        borderRadius="full"
        size={{ base: "md", md: "lg" }} // responsive size
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        py={{ base: 5, md: 6 }}
        fontSize={{ base: "sm", md: "md" }}
        borderWidth="1.5px"
    >
        <FcGoogle size={18} />
        {/* icon size is responsive */}
        <Text fontWeight="bold">Sign up with Google</Text>
    </Button>
    <Text textAlign="center" mt={4} color="gray.600">
        Already have an account?{" "}
        <Link href="/signin" color="blue.500" fontWeight="bold" ml={2}>
        Sign In
        </Link>
    </Text>
    </Stack>
</Box>
</Box>
);
}

