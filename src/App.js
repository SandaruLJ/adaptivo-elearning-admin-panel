import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import NavBar from "./components/Navbar/Navbar";
import TopBar from "./components/TopBar/TopBar";
import { Amplify } from "aws-amplify";
import { Authenticator, View, useTheme, Text } from "@aws-amplify/ui-react";
import awsExports from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";
import "../src/styles/authenticator.css";
import store from './store';
import { authActions } from './store/auth-slice';

Amplify.configure(awsExports);

function App() {
  const customAuthComponents = {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={tokens.space.zero} className="auth-screen-logo">
          <Text className="auth-screen-logo-text">Elearning</Text>
        </View>
      );
    },
  };

  return (
    <Authenticator className="auth" hideSignUp={true} variation="modal" components={customAuthComponents}>
      {({ signOut, user }) => {
        const userObject = JSON.parse(JSON.stringify(user))
        let role = ''
        if (userObject.pool.userPoolId === 'ap-south-1_HwrCqDg1Q') {
          role = 'admin'
        }
        userObject.role = role;
        store.dispatch(authActions.setUser(userObject));

        return (
          <div className="App">
            <ThemeProvider theme={theme}>
              <Router>
                <NavBar />
                <TopBar signOut={signOut} />
                <div className="main">
                  <Main />
                </div>
              </Router>
            </ThemeProvider>
          </div>
        )
      }}
    </Authenticator>
  );
}

export default App;
