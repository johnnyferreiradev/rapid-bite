import { useState } from "react";
import { View, FlatList } from "react-native";

import { CategoryButton } from "@/components/category";
import { Header } from "@/components/header";

import { CATEGORIES } from "@/utils/data/products";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  return (
    <View className="flex-1">
      <Header title="Faça seu pedido" cardQuantityItems={5} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={category === item}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
