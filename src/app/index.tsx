import { useState } from "react";
import { View, Text, Button } from "react-native";

export default function Home() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <View className="flex-1 justify-center items-center">
      {showMessage && (
        <Text className="text-white text-2xl mb-2">
          Booooraaaaaaa!!!
        </Text>
      )}
      <Button
        title={showMessage ? "Fechar" : "Clique aqui!"}
        onPress={() => setShowMessage(!showMessage)}
      ></Button>
    </View>
  );
}
