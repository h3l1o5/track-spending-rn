import { Alert, Platform } from "react-native";
import Permissions from "react-native-permissions";
import { PermissionStatus } from "../typings";

export default async (type: "location"): Promise<PermissionStatus | {}> => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentStatus = await Permissions.check(type);

      if (currentStatus === "authorized") {
        return resolve(currentStatus);
      }

      if (currentStatus === "denied") {
        return Alert.alert("我們可以取得您的位置嗎?", "為了把消費位置設定為您目前的位置，我們需要取得此權限", [
          {
            text: "拒絕",
            onPress: () => resolve(currentStatus),
            style: "cancel",
          },
          {
            text: Platform.OS === "ios" ? "前往設定" : "同意",
            onPress: async () => {
              if (Platform.OS === "ios") {
                resolve(currentStatus);
                Permissions.openSettings();
              } else {
                const newStatus = await Permissions.request(type);
                resolve(newStatus);
              }
            },
          },
        ]);
      }

      if (currentStatus === "restricted") {
        return Alert.alert("我們沒有權限取得您的位置", "請先至設定頁面授權此APP的位置權限", [
          {
            text: "好",
            onPress: () => resolve(currentStatus),
          },
        ]);
      }

      if (currentStatus === "undetermined") {
        return Alert.alert("我們可以取得您的位置嗎?", "為了把消費位置設定為您目前的位置，我們需要取得此權限", [
          {
            text: "拒絕",
            onPress: () => resolve(currentStatus),
            style: "cancel",
          },
          {
            text: "同意",
            onPress: async () => {
              const newStatus = await Permissions.request(type);
              resolve(newStatus);
            },
          },
        ]);
      }
    } catch (error) {
      reject(error);
    }
  });
};
