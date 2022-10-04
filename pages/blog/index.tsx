/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Container, FormControl, FormLabel, InputGroup, InputRightElement, Input, Button, Box, Heading, Center } from '@chakra-ui/react'

import apiClient from '~/client';
import { isLoadingState } from '~/store';
import { SignInData } from '~/types/auth';
import Fallback from '~/components/features/Fallback';
import withSession from '../lib/session'

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
                </Box>
            </Container>
            {isLoading && <Fallback />}
        </>
    );
};

BlogPage.authEnabled = true;


export default BlogPage;
