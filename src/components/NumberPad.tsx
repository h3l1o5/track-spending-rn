import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View, Icon } from "native-base";
import _ from "lodash";

import color from "../theme/color";

const styles: any = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    margin: 3,
    flex: 1,
    justifyContent: "center",
    backgroundColor: color.secondary,
  },
  buttonContent: {
    color: color.light,
    fontSize: 30,
  },
});

interface Props {
  dot?: boolean;
  onButtonPressed: (value: number | string) => void;
}

export default (props: Props) => (
  <View>
    <View style={styles.row}>
      <Button rounded style={[styles.button, { marginLeft: 0 }]} onPress={() => props.onButtonPressed(7)}>
        <Text style={styles.buttonContent}>7</Text>
      </Button>
      <Button rounded style={styles.button} onPress={() => props.onButtonPressed(8)}>
        <Text style={styles.buttonContent}>8</Text>
      </Button>
      <Button rounded style={[styles.button, { marginRight: 0 }]} onPress={() => props.onButtonPressed(9)}>
        <Text style={styles.buttonContent}>9</Text>
      </Button>
    </View>
    <View style={styles.row}>
      <Button rounded style={[styles.button, { marginLeft: 0 }]} onPress={() => props.onButtonPressed(4)}>
        <Text style={styles.buttonContent}>4</Text>
      </Button>
      <Button rounded style={styles.button} onPress={() => props.onButtonPressed(5)}>
        <Text style={styles.buttonContent}>5</Text>
      </Button>
      <Button rounded style={[styles.button, { marginRight: 0 }]} onPress={() => props.onButtonPressed(6)}>
        <Text style={styles.buttonContent}>6</Text>
      </Button>
    </View>
    <View style={styles.row}>
      <Button rounded style={[styles.button, { marginLeft: 0 }]} onPress={() => props.onButtonPressed(1)}>
        <Text style={styles.buttonContent}>1</Text>
      </Button>
      <Button rounded style={styles.button} onPress={() => props.onButtonPressed(2)}>
        <Text style={styles.buttonContent}>2</Text>
      </Button>
      <Button rounded style={[styles.button, { marginRight: 0 }]} onPress={() => props.onButtonPressed(3)}>
        <Text style={styles.buttonContent}>3</Text>
      </Button>
    </View>
    <View style={styles.row}>
      <Button rounded style={[styles.button, { flex: 3, marginLeft: 0 }]} onPress={() => props.onButtonPressed(0)}>
        <Text style={styles.buttonContent}>0</Text>
      </Button>
      {props.dot && (
        <Button rounded style={styles.button} onPress={() => props.onButtonPressed("dot")}>
          <Text style={styles.buttonContent}>．</Text>
        </Button>
      )}
      <Button
        rounded
        style={[styles.button, { flex: 2, marginRight: 0 }]}
        onPress={() => props.onButtonPressed("backspace")}
      >
        <Icon type="MaterialIcons" name="arrow-back" style={styles.buttonContent} />
      </Button>
    </View>
  </View>
);
