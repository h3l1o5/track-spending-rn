import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View, Input, ActionSheet } from "native-base";
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

interface State {
  isEditingComment: boolean;
  isDateTimePickerVisible: boolean;
}
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

export class InfoPanel extends Component<Props> {
  public state: State = {
    isEditingComment: false,
    isDateTimePickerVisible: false,
  };

  public handleLocationPressed = () => {
    if (!this.props.location) {
      if (this.props.isAutoLocateEnabled) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.props.navigation.navigate("ChooseLocation", {
            initialLocation: { latitude: coords.latitude, longitude: coords.longitude },
            onLocationChanged: this.props.onLocationChanged,
          });
        });
      } else {
        this.props.navigation.navigate("ChooseLocation", {
          initialLocation: null,
          onLocationChanged: this.props.onLocationChanged,
        });
      }

      return;
    }

    ActionSheet.show(
      { options: ["編輯", "刪除", "取消"], destructiveButtonIndex: 1, cancelButtonIndex: 2 },
      buttonIndex =>
        buttonIndex === 0
          ? this.props.navigation.navigate("ChooseLocation", {
              initialLocation: this.props.location,
              onLocationChanged: this.props.onLocationChanged,
            })
          : buttonIndex === 1
          ? this.props.onLocationChanged(null)
          : null
    );
  };

  public render() {
    const {
      selectedLabel,
      time,
      onTimeChanged,
      location,
      comment,
      onCommentChanged,
      isAutoLocateEnabled,
      style,
    } = this.props;

    const labelDisplayText = selectedLabel
      ? `${getCategoryIcon(selectedLabel.category)} ${getCategoryMandarin(selectedLabel.category)} | ${
          selectedLabel.name
        }`
      : "無";

    const timeDisplayText =
      moment(time).format("YYYYMMDD") === moment().format("YYYYMMDD")
        ? "今天"
        : moment(time)
            .add("1", "days")
            .format("YYYYMMDD") === moment().format("YYYYMMDD")
        ? "昨天"
        : moment(time).format("YYYY年M月D號");

    const locationDisplayText = location
      ? `經度: ${location.longitude.toFixed(3)} | 緯度: ${location.latitude.toFixed(3)}`
      : isAutoLocateEnabled
      ? "目前位置"
      : "未設定";

    return (
      <View style={[{ flex: 1, flexDirection: "column" }, style]}>
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
            <TouchableOpacity onPress={() => this.setState({ isDateTimePickerVisible: true })}>
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
                <Text style={{ color: "#5893d4" }}>(自動定位: {isAutoLocateEnabled ? "開啟" : "關閉"})</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.handleLocationPressed}>
              <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>{locationDisplayText}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>備註</Text>
            <EditableText
              initialValue={comment}
              placeholder="無"
              onTextChanged={onCommentChanged}
              style={{ paddingLeft: 10 }}
            />
          </View>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          date={moment(time).toDate()}
          onConfirm={date => {
            onTimeChanged(
              moment(date)
                .startOf("day")
                .add("12", "hours")
                .valueOf()
            );
            this.setState({ isDateTimePickerVisible: false });
          }}
          onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          mode="date"
          maximumDate={new Date()}
          titleIOS="選擇日期"
          confirmTextIOS="選擇"
          cancelTextIOS="取消"
        />
      </View>
    );
  }
}

export default InfoPanel;
