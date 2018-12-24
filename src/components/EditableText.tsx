import React, { Component } from "react";
import { Input, Text, View } from "native-base";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import color from "../theme/color";

interface State {
  isEditing: boolean;
}
interface Props {
  initialValue: string | null;
  placeholder?: string;
  onTextChanged?: (text: string) => void;
  longPressMode?: boolean;
  fontSize?: number;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}
export class EditableText extends Component<Props, State> {
  public state = {
    isEditing: false,
  };

  public render() {
    const { initialValue, placeholder, onTextChanged, longPressMode, textColor, fontSize, style } = this.props;

    return (
      <View style={style}>
        {this.state.isEditing ? (
          <Input
            value={initialValue || ""}
            onChangeText={text => {
              if (onTextChanged) {
                onTextChanged(text);
              }
            }}
            onEndEditing={() => {
              this.setState({ isEditing: false });
            }}
            autoFocus
            style={{
              flex: undefined,
              paddingLeft: 0,
              height: "auto",
              width: "100%",
              fontSize: fontSize || 16,
              color: textColor || color.gray,
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={longPressMode ? undefined : () => this.setState({ isEditing: true })}
            onLongPress={longPressMode ? () => this.setState({ isEditing: true }) : undefined}
          >
            <Text numberOfLines={1} style={{ fontSize: fontSize || 16, color: textColor || color.gray }}>
              {initialValue || placeholder || ""}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default EditableText;
