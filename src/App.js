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
      {({ signOut }) => (
        <div className="App">
          <ThemeProvider theme={theme}>
            <Router>
              <NavBar />
              <TopBar />
              <div className="main">
                <Main />
                {/* <button onClick={signOut}>Sign out</button> */}
              </div>
            </Router>
          </ThemeProvider>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
