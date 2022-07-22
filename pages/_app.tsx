import "../styles/globals.scss";
import "../styles/main.scss"
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material/styles";
import { blue, green, orange } from "@mui/material/colors";
import { ThemeProvider } from "@mui/styles";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import { dispatch, store } from "../Redux/store";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Firebase/auth";
import { useRouter } from "next/router";
import Authenticating from "../Components/Authenticating";
import { NextPage } from "next";
import Header from "../Components/Header";
import { saveUser } from "../Redux/users";
import '../TS Types/muiThem.types'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

//Type added '../TS Types/muiThem.types', which is imported above
const theme = createTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: orange[700],
        },
        tertiary: {
            main: blue[500],
            dark: blue[800]
        }
    },
});

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()
    const [authenticating, setAuthenticating] = useState<boolean>(true)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (!user) {
                router.push('/')
            } else {
                dispatch(saveUser(user.email))
                if (router.pathname === "/") {
                    router.push('/home')
                }
            }
            if (authenticating) setAuthenticating(false)
        })
    }, [])

    if (authenticating) {
        return <Authenticating />
    }

    const getLayout = Component.getLayout

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ReactNotifications />
                {
                    getLayout ? getLayout(<Component {...pageProps} />) : (
                        <>
                            <Header />
                            <Component {...pageProps} />
                        </>
                    )
                }
            </ThemeProvider>
        </Provider>
    );
}

export default MyApp;
