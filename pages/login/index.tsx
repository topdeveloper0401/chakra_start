/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Container, FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, Box, Heading, Link } from '@chakra-ui/react'

import { isLoadingState } from '~/store';
import { SignInData } from '~/types/auth';
import Fallback from '~/components/features/Fallback';
import ALink from '~/components/features/ALink';

interface SignInRes {
    error:
        | 'UserNotFound'
        | 'EmailSendError'
        | 'NotVerified'
        | 'WrongPassword'
        | undefined;
    status: number;
    ok: boolean;
    url: string | null;
}

const LoginPage = ({
    host,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [pwdShow, setPwdShow] = useState(false)
    const handlePwdShow = () => setPwdShow(!pwdShow)
    const { handleSubmit, register } = useForm<SignInData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const socialLogin = ()=>{

    }
    const onSubmit = async ({ email, password }: SignInData) => {
        try{
            setIsLoading(true);
            const res = (await signIn(
                'credentials',
                {
                    email,
                    password,
                    callbackUrl: '/',
                    redirect: false,
                },
                { host }
            )) as SignInRes | undefined;
            if (res) {
                if (res.error === 'NotVerified') {
                    router.push('/login/emailsent');
                }
                if (res.error === 'UserNotFound') {
                    setIsLoading(false);
                    toast.error('User not found');
                }
                if (res.error === 'EmailSendError') {
                    toast.error('Error sending email');
                }
    
                if (res.error === 'WrongPassword') {
                    setIsLoading(false);
                    toast.error('Wrong password');
                }
                if (res.url) router.push("/blog");
            }
        }
        catch(err) {
            console.log('Some error occured during signing up: ', err);
        }
        finally {
            setIsLoading(false);
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
                        <Heading mb={'5'} textAlign={'center'}>Login</Heading>
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
                        <Link href='/login/pwd-recovery'>Forgot password?</Link>
                        <Box>
                            <Button
                                mt={4}
                                mr={4}
                                colorScheme='teal'
                                type='submit'
                            >
                                Login
                            </Button>
                            <Button onClick={socialLogin} mt={4}>
                                Login with Social Account
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
            {isLoading && <Fallback />}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {
        req: {
            headers: { host },
        },
    } = context;

    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    } else {
        return { props: { host } };
    }
};

export default LoginPage;
