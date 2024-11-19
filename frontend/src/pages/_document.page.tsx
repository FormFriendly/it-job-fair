import {Html, Head, Main, NextScript} from 'next/document'


const Document = () =>  {
    return (
        <Html lang="ru">
            <Head>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff" />
                <title>
                    Ярмарка вакансий
                </title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document; 