import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View, ActionSheet } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import DateTimePicker from "react-native-modal-datetime-picker";
import _ from "lodash";
import moment from "moment";

import color from "../../theme/color";
import { SpendingLabel } from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";
import EditableText from "../../components/EditableText";

const styles = StyleSheet.create({
  itemContainer: { flex: 1, justifyContent: "space-around" },
  title: { fontSize: 24, fontWeight: "bold", color: color.primary },
  content: { fontSize: 18 },
});

interface Props {
  navigation: NavigationScreenProp<any, any>;
  selectedLabel?: SpendingLabel;
  time: number;
  onTimeChanged: (time: number) => void;
  location: { latitude: number; longitude: number } | null;
  onLocationChanged: (location: { latitude: number; longitude: number } | null) => void;
  comment: string | null;
  onCommentChanged: (comment: string) => void;
  isAutoLocateEnabled: boolean;
  style?: StyleProp<ViewStyle>;
}

const InfoPanel = (props: Props) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const handleLocationPressed = () => {
    if (!props.location) {
      if (props.isAutoLocateEnabled) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          props.navigation.navigate("ChooseLocation", {
            initialLocation: { latitude: coords.latitude, longitude: coords.longitude },
            onLocationChanged: props.onLocationChanged,
          });
        });
      } else {
        props.navigation.navigate("ChooseLocation", {
          initialLocation: null,
          onLocationChanged: props.onLocationChanged,
        });
      }

      return;
    }

    ActionSheet.show(
      { options: ["編輯", "刪除", "取消"], destructiveButtonIndex: 1, cancelButtonIndex: 2 },
      buttonIndex =>
        buttonIndex === 0
          ? props.navigation.navigate("ChooseLocation", {
              initialLocation: props.location,
              onLocationChanged: props.onLocationChanged,
            })
          : buttonIndex === 1
          ? props.onLocationChanged(null)
          : null
    );
  };

  const labelDisplayText = props.selectedLabel
    ? `${getCategoryIcon(props.selectedLabel.category)} ${getCategoryMandarin(props.selectedLabel.category)} | ${
        props.selectedLabel.name
      }`
    : "無";

  const timeDisplayText =
    moment(props.time).format("YYYYMMDD") === moment().format("YYYYMMDD")
      ? "今天"
      : moment(props.time)
          .add("1", "days")
          .format("YYYYMMDD") === moment().format("YYYYMMDD")
      ? "昨天"
      : moment(props.time).format("YYYY年M月D號");

  const locationDisplayText = props.location
    ? `經度: ${props.location.longitude.toFixed(3)} | 緯度: ${props.location.latitude.toFixed(3)}`
    : props.isAutoLocateEnabled
    ? "目前位置"
    : "未設定";

  return (
    <View style={[{ flex: 1, flexDirection: "column" }, props.style]}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomColor: color.secondary,
          borderBottomWidth: 2,
        }}
      >
        <View style={[styles.itemContainer, { alignItems: "center" }]}>
          <Text style={styles.title}>消費項目</Text>
          <Text numberOfLines={1} style={styles.content}>
            {labelDisplayText}
          </Text>
        </View>
        <View style={[styles.itemContainer, { alignItems: "center" }]}>
          <Text style={styles.title}>時間</Text>
          <TouchableOpacity onPress={() => setIsDateTimePickerVisible(true)}>
            <Text numberOfLines={1} style={[styles.content, { color: color.gray }]}>
              {timeDisplayText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 7, paddingTop: 20 }}>
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>地點</Text>
            <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#5893d4" }}>(自動定位: {props.isAutoLocateEnabled ? "開啟" : "關閉"})</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleLocationPressed}>
            <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>{locationDisplayText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>備註</Text>
          <EditableText
            initialValue={props.comment}
            placeholder="無"
            onTextChanged={props.onCommentChanged}
            fontSize={18}
            style={{ paddingLeft: 10 }}
          />
        </View>
      </View>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        date={moment(props.time).toDate()}
        onConfirm={date => {
          props.onTimeChanged(
            moment(date)
              .startOf("day")
              .add("12", "hours")
              .valueOf()
          );
          setIsDateTimePickerVisible(false);
        }}
        onCancel={() => setIsDateTimePickerVisible(false)}
        mode="date"
        maximumDate={new Date()}
        titleIOS="選擇日期"
        confirmTextIOS="選擇"
        cancelTextIOS="取消"
      />
    </View>
  );
};

export default InfoPanel;
