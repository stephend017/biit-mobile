import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import ThemedButton from "../themed/ThemedButton";
import Box from "../themed/Box";
import { HomeRoutes, StackNavigationProps } from "../../routes";
import { reschedule, useMeetupDispatch } from "../../contexts/meetupContext";
import { useToken } from "../../contexts/tokenContext";
import { useAccountState } from "../../contexts/accountContext";
import { useSnackbarDispatch } from "../../contexts/snackbarContext";

import MeetupCard from "./MeetupCard";

export const MeetupDetailsPageOptions = {
  title: "Meetup Details",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function MeetupDetailsPage({
  route,
}: StackNavigationProps<HomeRoutes, "MeetupDetails">) {
  const { meetupID, timestamp, location, duration, userList } = route.params;
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const meetupDispatch = useMeetupDispatch();
  const [tokenState, tokenDispatch] = useToken();
  const accountState = useAccountState();
  const snackbarDispatch = useSnackbarDispatch();

  const startReschedule = () => {
    setShow(true);
    setDate(new Date(timestamp));
  };

  const onChange = async (
    _event: any /*eslint-disable-line @typescript-eslint/no-explicit-any */,
    selectedDate: Date | undefined
  ) => {
    if (_event.type !== "set") {
      return;
    }
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      const newTimestamp = selectedDate.getTime() / 1000;
      const result = await reschedule(
        meetupDispatch,
        tokenDispatch,
        tokenState.refreshToken,
        accountState.account.email,
        meetupID,
        newTimestamp
      );

      if (result) {
        snackbarDispatch({
          type: "push",
          state: {
            snackbarMessage: "Successfully updated meetup time",
            snackbarVisible: true,
            queue: [],
            snackbarType: "success",
          },
          dispatch: snackbarDispatch,
        });
      } else {
        snackbarDispatch({
          type: "push",
          state: {
            snackbarMessage: "Failed to update meetup time",
            snackbarVisible: true,
            queue: [],
            snackbarType: "error",
          },
          dispatch: snackbarDispatch,
        });
      }
    }
  };

  return (
    <Box backgroundColor="mainBackground" style={styles.root}>
      <Box style={{ width: "100%" }}>
        <MeetupCard
          id={meetupID}
          duration={duration}
          timestamp={timestamp}
          userList={userList}
          location={location}
          meetupType={"accepted"}
          isClickable={false}
        />
        <ThemedButton title={"reschedule"} onPress={startReschedule} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Box>
    </Box>
  );
}
