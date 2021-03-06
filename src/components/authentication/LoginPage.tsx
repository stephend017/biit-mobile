import React, { useEffect } from "react";
import { Image, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getAccount, useAccount } from "../../contexts/accountContext";
import {
  requestTokens,
  requestUserInfo,
  useAzure,
} from "../../contexts/azureContext";
import { useToken } from "../../contexts/tokenContext";
import { useAzureAuth } from "../../hooks";
import {
  CompletedAzureAuthResponse,
  UseAzureAuthReturnType,
} from "../../hooks/useAzureAuth";
import { AuthRoutes, StackNavigationProps } from "../../routes";
import Box from "../themed/Box";
import MicrosoftButton from "../themed/MicrosoftButton";
import Text from "../themed/Text";

// Page Options

export const LoginPageOptions = {
  title: "",
  headerTransparent: true,
};

// Page Styles

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Page Definition

export default function LoginPage({
  navigation,
}: StackNavigationProps<AuthRoutes, "Login">) {
  const [, response, promptAsync]: UseAzureAuthReturnType = useAzureAuth();
  const [azureState, azureDispatch] = useAzure();
  const [tokenState, tokenDispatch] = useToken();
  const [accountState, accountDispatch] = useAccount();

  useEffect(() => {
    if (
      (response as CompletedAzureAuthResponse)?.params?.code &&
      !azureState.grantToken
    ) {
      const grantToken = (response as CompletedAzureAuthResponse)?.params?.code;
      azureDispatch({
        type: "set grant token",
        ...azureState,
        grantToken: grantToken,
      });
    } else {
      // user cancelled
      // NO-OP
      // console.log(response)
    }
  }, [response, azureDispatch, azureState]);

  useEffect(() => {
    if (
      azureState.grantToken &&
      !azureState.accessToken &&
      !azureState.refreshToken
    ) {
      requestTokens(azureDispatch, azureState);
    }
  }, [azureDispatch, azureState]);

  useEffect(() => {
    if (azureState.accessToken && azureState.refreshToken) {
      tokenDispatch({
        type: "set",
        refreshToken: azureState.refreshToken,
        accessToken: azureState.accessToken,
      });
      requestUserInfo(azureDispatch, azureState);
    } else {
      // console.log(azureState)
    }
  }, [azureDispatch, tokenDispatch, azureState]);

  useEffect(() => {
    if (
      azureState.userInfo.email !== "" &&
      tokenState.refreshToken &&
      (accountState.status === "logged out" || accountState.status === "error")
    ) {
      //console.log(azureState);
      getAccount(
        accountDispatch,
        tokenDispatch,
        tokenState.refreshToken,
        azureState.userInfo.email
      );
    }
  }, [
    azureState.userInfo,
    accountDispatch,
    accountState.status,
    navigation,
    tokenState.refreshToken,
    tokenDispatch,
  ]);

  // useEffect(() => {
  //   if (accountState.status === "logged in") {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "DevelopmentLinks" }],
  //     });
  //   }
  // }, [accountState.status, navigation]);

  function onPress() {
    if (!azureState.grantToken) {
      promptAsync({ useProxy: true });
    }
  }

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Image source={require("../../../assets/logo_200px.png")} />
      <Text variant="header">Welcome to biit</Text>
      <Text variant="body" mb="xl">
        Login and get started!
      </Text>
      <MicrosoftButton title="Sign in with Microsoft" onPress={onPress} />
      <Box marginTop="lg">
        <TouchableOpacity onPress={() => navigation.push("CreateAccount")}>
          <Text variant="link">Need to Create an Account?</Text>
        </TouchableOpacity>
      </Box>
      <Box marginTop="lg">
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://account.live.com/password/reset")
          }
        >
          <Text variant="link">Forgot your password?</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
