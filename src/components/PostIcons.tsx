import { FontAwesome5 } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

import { View } from "react-native";

import { Feather } from "@expo/vector-icons";

export default function PostIcons() {
  return (
    <View className="flex-row items-center gap-4 justify-center">
      <TouchableOpacity className="mr-4">
        <Feather name="image" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="mr-4">
        <FontAwesome5 name="camera" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="mr-4">
        <MaterialIcons name="gif" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="mr-4">
        <Feather name="mic" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="mr-4">
        <Feather name="hash" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="mr-4">
        <Feather name="smile" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Feather name="map-pin" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
