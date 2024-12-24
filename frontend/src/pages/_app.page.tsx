import React from 'react';
import {App} from '@/Types';
import ErrorBoundary from '@/Containers/ErrorBoundary/ErrorBoundary';
import CheckUser from '@/Containers/CheckUser/CheckUser';
import GetUser from '@/Containers/GetUser/GetUser';
import { Roboto } from 'next/font/google'
import ReactQueryProvider from '@/Providers/ReactQueryProvider';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {ChakraProvider} from '@chakra-ui/react'
import 'sanitize.css';
import './global.scss';

dayjs.extend(quarterOfYear);

const font = Roboto({ 
    subsets: ['cyrillic'],
    weight: ['300', '400', '500','700']
})

function MyApp (props: App.Next.AppProps) {
    const {Component} = props;
    const {dehydratedState, ...pageProps} = props.pageProps;
    
    return (
        <main className={font.className}>
            <ErrorBoundary>
                <ChakraProvider>
                        <ReactQueryProvider>
                            <GetUser>
                                <CheckUser
                                    Role={Component.Role}
                                    getLayout={Component.getLayout}>
                                    <Component
                                        {...pageProps}
                                    />

                                </CheckUser>
                            </GetUser>
                        </ReactQueryProvider>
                </ChakraProvider>
            </ErrorBoundary>
        </main>
    );
}


export default MyApp;