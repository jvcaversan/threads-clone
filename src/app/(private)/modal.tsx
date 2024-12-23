import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PostScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-blue-500 font-semibold">Postar</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row p-4">
        <Image
          source={{
            uri: "https://via.placeholder.com/150",
          }}
          className="w-12 h-12 rounded-full mr-3"
        />

        <TextInput
          className="flex-1 text-lg text-gray-800"
          placeholder="No que você está pensando?"
          placeholderTextColor="#A9A9A9"
          multiline
          numberOfLines={6}
          style={{ textAlignVertical: "top" }}
        />
      </View>

      <View className="flex-row items-center px-4 py-3 border-t border-gray-200 justify-center">
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
          <Feather name="hash" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <Feather name="smile" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="map-pin" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
