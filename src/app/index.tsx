import { useState, useRef } from "react";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { useCartStore } from "@/stores/card-store";

import { CategoryButton } from "@/components/category";
import { Header } from "@/components/header";
import { Product } from "@/components/product";

import { CATEGORIES, MENU } from "@/utils/data/products";

export default function Home() {
  const sectionListRef = useRef<SectionList>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const cartStore = useCartStore();

  const cartQuantityItems = cartStore.products.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  return (
    <View className="flex-1">
      <Header title="Faça seu pedido" cardQuantityItems={cartQuantityItems} />

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

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
