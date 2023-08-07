import React, { useState } from "react"
import { Box, Button, Container, Divider } from  "@mui/material"

import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Page from '../../components/Page'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Page className="" title="Authentication">
      <Container>
        <Box
          my={5}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <Divider />
          <Box mt={5}>
            Go to{' '}
            {isLogin ? (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(false)}
              >
                Register Form
              </Button>
            ) : (
              <Button
                size={'small'}
                color={'primary'}
                variant={'text'}
                onClick={() => setIsLogin(true)}
              >
                Login Form
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default LoginPage;
