import React, { useState } from "react";
import { Input, Text, View } from "native-base";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";

import color from "../theme/color";

interface Props {
  initialValue: string | null;
  placeholder?: string;
  onTextChanged?: (text: string) => void;
  longPressMode?: boolean;
  fontSize?: number;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { initialValue, placeholder, onTextChanged, longPressMode, textColor, fontSize, style } = props;

  return (
    <View style={style}>
      {isEditing ? (
        <Input
          value={initialValue || ""}
          onChangeText={text => {
            if (onTextChanged) {
              onTextChanged(text);
            }
          }}
          onEndEditing={() => {
            setIsEditing(false);
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
          onPress={longPressMode ? undefined : () => setIsEditing(true)}
          onLongPress={longPressMode ? () => setIsEditing(true) : undefined}
        >
          <Text numberOfLines={1} style={{ fontSize: fontSize || 16, color: textColor || color.gray }}>
            {initialValue || placeholder || ""}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
