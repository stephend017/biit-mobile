import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { LoadAssets } from "./src/components";
import LoginPage, {
  LoginPageOptions,
} from "./src/components/authentication/LoginPage";
import CreateAccountPage, {
  CreateAccountPageOptions,
} from "./src/components/authentication/CreateAccountPage";
import CreateProfilePage, {
  CreateProfilePageOptions,
} from "./src/components/authentication/CreateProfilePage";
import ViewProfilePage, {
  ViewProfilePageOptions,
} from "./src/components/authentication/ViewProfilePage";
import EditProfilePage, {
  EditProfilePageOptions,
} from "./src/components/authentication/EditProfilePage";
import theme from "./src/theme";
import BannedUsersPage, {
  BannedUsersPageOptions,
} from "./src/components/communities/BannedUsersPage";
import JoinCommunityPage, {
  JoinCommunityPageOptions,
} from "./src/components/communities/JoinCommunityPage";
import LeaveCommunityPage, {
  LeaveCommunityPageOptions,
} from "./src/components/communities/LeaveCommunityPage";
import DevelopmentLinksPage from "./src/components/communities/DevelopmentLinksPage";
import UserSettingsPage, {
  UserSettingsPageOptions,
} from "./src/components/userUtils/userSettingsPage";
import CreateCommunityPage, {
  CreateCommunityPageOptions,
} from "./src/components/communities/CreateCommunityPage";
import CommunityAdministrationPage, {
  CommunityAdministrationPageOptions,
} from "./src/components/communities/CommunityAdministrationPage";
import MemberListPage, {
  MemberListPageOptions,
} from "./src/components/communities/MemberListPage";
import { GlobalServiceProvider } from "./src/contexts";

const fonts = {
  "SFProDisplay-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
};

const Stack = createStackNavigator();

//TODO remove "DevelopmentLinks" for release

export default function App() {
  return (
    <LoadAssets {...{ fonts }}>
      <GlobalServiceProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.headerBackground,
            },
            headerTintColor: theme.colors.primaryText,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={LoginPageOptions}
          />
          <Stack.Screen
            name="DevelopmentLinks"
            component={DevelopmentLinksPage}
          />
          <Stack.Screen
            name="CreateAccount"
            component={CreateAccountPage}
            options={CreateAccountPageOptions}
          />
          <Stack.Screen
            name="CreateProfile"
            component={CreateProfilePage}
            options={CreateProfilePageOptions}
          />
          <Stack.Screen
            name="ViewProfile"
            component={ViewProfilePage}
            options={ViewProfilePageOptions}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfilePage}
            options={EditProfilePageOptions}
          />
          <Stack.Screen
            name="BannedUsers"
            component={BannedUsersPage}
            options={BannedUsersPageOptions}
          />
          <Stack.Screen
            name="CommunityAdministration"
            component={CommunityAdministrationPage}
            options={CommunityAdministrationPageOptions}
          />
          <Stack.Screen
            name="MemberList"
            component={MemberListPage}
            options={MemberListPageOptions}
          />
          <Stack.Screen
            name="UserSettings"
            component={UserSettingsPage}
            options={UserSettingsPageOptions}
          />
          <Stack.Screen
            name="CreateCommunity"
            component={CreateCommunityPage}
            options={CreateCommunityPageOptions}
          />
          <Stack.Screen
            name="JoinCommunity"
            component={JoinCommunityPage}
            options={JoinCommunityPageOptions}
          />
          <Stack.Screen
            name="LeaveCommunity"
            component={LeaveCommunityPage}
            options={LeaveCommunityPageOptions}
          />
        </Stack.Navigator>
      </GlobalServiceProvider>
    </LoadAssets>
  );
}
