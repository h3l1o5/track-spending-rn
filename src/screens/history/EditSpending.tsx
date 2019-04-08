import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Content, Button, Icon } from "native-base";
import { NavigationScreenProp } from "react-navigation";
import _ from "lodash";

import NumberPad from "../../components/NumberPad";
import color from "../../theme/color";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const EditSpending = (props: Props) => {
  const [spending, setSpending] = useState<number>(props.navigation.getParam("consumption").spending);

  const handleNumberPadPressed = (value: number | string) => {
    if (_.isNumber(value) && spending <= 10e10) {
      setSpending(spending * 10 + value);
    }

    if (value === "backspace") {
      setSpending(_.floor(spending / 10));
    }
  };

  const handleSubmit = () => {
    const onSubmit: (spending: number) => void = props.navigation.getParam("onSubmit");

    onSubmit(spending);
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content scrollEnabled={false} contentContainerStyle={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 5,
            borderColor: color.primary,
            borderRadius: 20,
            marginBottom: 10,
          }}
        >
          <Text numberOfLines={1} style={{ flex: 4, fontSize: 24, padding: 10, paddingLeft: 15 }}>
            {spending}
          </Text>
          <Button
            activeOpacity={1}
            style={{
              flex: 1,
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
              backgroundColor: color.primary,
            }}
            onPress={handleSubmit}
          >
            <Icon type="AntDesign" name="check" style={{ color: color.light }} />
          </Button>
        </View>
        <NumberPad onButtonPressed={handleNumberPadPressed} />
      </Content>
    </SafeAreaView>
  );
};

export default EditSpending;
