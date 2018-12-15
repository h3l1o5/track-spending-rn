import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text, View, Input } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import { Region } from "react-native-maps";
import DateTimePicker from "react-native-modal-datetime-picker";
import _ from "lodash";
import moment from "moment";

import color from "../../theme/color";
import { SpendingLabel } from "../../typings";
import { getCategoryIcon, getCategoryMandarin } from "../../utils";

const styles = StyleSheet.create({
  itemContainer: { flex: 1, justifyContent: "space-around" },
  title: { fontSize: 24, fontWeight: "bold", color: color.primary },
  content: { fontSize: 18, color: color.dark },
});

interface State {
  isEditingComment: boolean;
  isDateTimePickerVisible: boolean;
}
interface Props {
  navigation: NavigationScreenProp<any, any>;
  selectedLabel?: SpendingLabel;
  time: Date;
  onTimeChanged: (time: Date) => void;
  region?: Region;
  onRegionChanged: (region: Region) => void;
  comment?: string;
  onCommentChanged: (comment: string) => void;
  style?: StyleProp<ViewStyle>;
}

export class InfoPanel extends Component<Props> {
  public state: State = {
    isEditingComment: false,
    isDateTimePickerVisible: false,
  };

  public render() {
    const {
      selectedLabel,
      time,
      onTimeChanged,
      region,
      onRegionChanged,
      comment,
      onCommentChanged,
      style,
    } = this.props;

    const labelCategory = selectedLabel
      ? `${getCategoryIcon(selectedLabel.category)} ${getCategoryMandarin(selectedLabel.category)}`
      : "";
    const labelName = selectedLabel ? selectedLabel.name : "";

    const timeDisplayText =
      moment(time).format("YYYYMMDD") === moment().format("YYYYMMDD")
        ? "今天"
        : moment(time)
            .add("1", "days")
            .format("YYYYMMDD") === moment().format("YYYYMMDD")
        ? "昨天"
        : moment(time).format("YYYY年M月D號");

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
              {labelCategory} | {labelName}
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
              <TouchableOpacity>
                <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#5893d4" }}>(自動位置設定: 關閉)</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ChooseLocation", {
                  initialRegion: region,
                  onRegionChanged,
                })
              }
            >
              <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>
                {region ? `經度: ${region.longitude.toFixed(3)} | 緯度: ${region.latitude.toFixed(3)}` : "未設定"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.title}>備註</Text>
            {this.state.isEditingComment ? (
              <Input
                defaultValue={comment}
                onEndEditing={event => {
                  onCommentChanged(event.nativeEvent.text);
                  this.setState({ isEditingComment: false });
                }}
                autoFocus
                style={[
                  styles.content,
                  {
                    flex: undefined,
                    height: "auto",
                    width: "100%",
                    paddingLeft: 10,
                    color: color.gray,
                  },
                ]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.setState({ isEditingComment: true })}>
                <Text style={[styles.content, { paddingLeft: 10, color: color.gray }]}>{comment || "無"}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          date={time}
          onConfirm={date => {
            onTimeChanged(
              moment(date)
                .startOf("day")
                .add("12", "hours")
                .toDate()
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
