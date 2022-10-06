import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { Container, FormControl, FormLabel, InputGroup, InputRightElement, Flex, Input, Button, Box, Heading, Link } from '@chakra-ui/react'

import apiClient from '~/client';
import { isLoadingState } from '~/store';
import { toast } from 'react-toastify';

const PwdRecoveryPage = () => {
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

    const { handleSubmit, register } = useForm({
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async ({ email }: { email: string }) => {
        setIsLoading(true);

        await apiClient
            .get(`/api/auth/reset-password?email=${email}`)
            .then((res) => {
                toast.success(
                    'Reset password link is sent to your email account.'
                );
                setIsLoading(false);
            })
            .catch((err) => {
                const msg = err.response.data.message;
                if (msg === 'UserNotFound') {
                    setIsLoading(false);
                    toast.error(
                        'User not found, please check the email address.'
                    );
                } else if (msg === 'EmailSendError') {
                    toast.error('Error sending email');
                }
                setIsLoading(false);
            });
    };

    return (
        <Container>
            <Box mt={'20'} p='10' borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign={'center'}>
                <form
                    className="flex justify-center flex-col w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Heading mb={'5'} textAlign={'center'}>Reset Password</Heading>
                    <Heading size={'1'} mb={'8'} color="gray.600" textAlign={'center'}>
                        Enter your email address and we&apos;ll send you reset password
                        instructions.
                    </Heading>
                    <Input  type="email"
                        placeholder="Enter your Email"
                        {...register('email', { required: true })}
                    required/>
                    <Button
                        py={4}
                        my={4}
                        fontWeight={'bold'}
                        size={"md"}
                        colorScheme='teal'
                        type='submit'
                    >
                        Submit
                    </Button>
                    <Flex gap={3} color={'gray.600'} mb={4} alignItems={'center'} fontSize="sm">
                        <Box height={'1px'} bg={'gray.300'} flex={1}></Box> 
                        <Heading size={"md"}>Remember your password?</Heading>
                        <Box height={'1px'} bg={'gray.300'} flex={1}></Box> 
                    </Flex>
                    <Link
                        href="/login"
                        className="rounded-full py-4 border-black border-2 text-sm font-bold mb-8 text-center"
                    >
                        Log In
                    </Link>
                </form>
            </Box>
        </Container>
    );
};


export default PwdRecoveryPage;
