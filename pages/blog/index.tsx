/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react"
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Container, FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, Box, Heading, Center } from '@chakra-ui/react'

import { isLoadingState } from '~/store';
import { SignInData } from '~/types/auth';
import Fallback from '~/components/features/Fallback';

const BlogPage = () => {
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


    return (
        <>
            <Container>
                <Box mt={'20'} p='10' borderWidth='1px' borderRadius='lg' overflow='hidden' textAlign={'center'}>
                    This is blog page.
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </Box>
            </Container>
            {isLoading && <Fallback />}
        </>
    );
};

BlogPage.authEnabled = true;


export default BlogPage;
