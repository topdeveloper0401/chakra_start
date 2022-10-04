/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { useColorMode, Container, FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, Box, Heading, Center } from '@chakra-ui/react'

import apiClient from '~/client';
import { isLoadingState } from '~/store';
import { SignUpData } from '~/types/auth';
import Fallback from '~/components/features/Fallback';

const RegisterPage = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const router = useRouter();
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [pwdShow, setPwdShow] = useState(false)
    const [pwdConShow, setPwdConShow] = useState(false)
    const handlePwdShow = () => setPwdShow(!pwdShow)
    const handlePwdConShow = () => setPwdConShow(!pwdConShow)
    const { handleSubmit, register } = useForm<SignUpData>({
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
            name: '',
        },
    });
    const onSubmit = async ({ email, password, name, confirm }: SignUpData) => {
        setIsLoading(true);
        if(password !== confirm) {
            toast.error('Password does not match his confirm');
        }
        else {
            await apiClient
            .post(
                '/api/auth/user',
                JSON.stringify({ email, password, name })
            )
            .then((res) => {
                if(res.data.user.result === false) {
                    setIsLoading(false);
                    toast.error('The email address has taken. Try another.');
                }
                else {
                    setIsLoading(false);
                    router.push('/login');
                }
            })
            .catch((err) => {
                setIsLoading(false);
            });
        }
    };

    return (
        <>
            <Container>
                <Box mt={'20'} p='10' borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign={'center'}>
                    <form
                        className="flex justify-center flex-col w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Heading mb={'5'} textAlign={'center'}>Register</Heading>
                        <FormControl mb={'5'} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input  type="email"
                                placeholder="Email"
                                {...register('email', { required: true })}
                            required/>
                        </FormControl>
                        <FormControl mb={'5'} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={pwdShow ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    {...register('password', { required: true })}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handlePwdShow}>
                                    {pwdShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={'5'} isRequired>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={pwdConShow ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    {...register('confirm', { required: true })}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handlePwdConShow}>
                                    {pwdConShow ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    
                        <FormControl mb={'5'} isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input type="text"
                                placeholder="Name"
                                {...register('name', { required: true })}
                                required
                            />
                        </FormControl>
                        <Box>
                            <Button
                                mt={4}
                                mr={4}
                                colorScheme='teal'
                                type='submit'
                            >
                                Submit
                            </Button>
                            <Button onClick={toggleColorMode} mt={4}>
                                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
            {isLoading && <Fallback />}
        </>
    );
};



export default RegisterPage;
