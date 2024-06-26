import React from 'react'
import { CategoryModel } from '../../models'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { typography } from '../../constants'
import { useCategories } from '../../redux/reducer/useCategories'
import { useAppSelector } from '../../hooks'


type CategoryItemProps = {
    category: CategoryModel,
    setSelect: (isSelected: boolean) => void
}
export const CategoryItem: React.FC<CategoryItemProps> = ({
    category: { name, selected },
    setSelect
}) => (
    <TouchableOpacity style={styles.category} onPress={() => setSelect(!selected)}>
        {selected ? <LinearGradient
            style={styles.categorySelected}
            colors={['#8A00FF', '#8A32A9']}>
            <Text numberOfLines={2} lineBreakMode='middle' style={styles.categoryLabel}>{name}</Text>
        </LinearGradient> :
            <Text numberOfLines={2} lineBreakMode='middle' style={styles.categoryLabel}>{name}</Text>
        }
    </TouchableOpacity>
)

export const NormalizedFormListItem: React.FC<{ categoryId: string }> = ({
    categoryId,
}) => {
    const category = useAppSelector((state) => state.categoryReducer.dataById[categoryId]);
    const { updateCategory } = useCategories();
    const setSelect = (select: boolean) => {
        updateCategory({ id: categoryId, selected: select });
    };
    if (category) {
        return <CategoryItem category={category} setSelect={setSelect} />;
    }
    return <Text style={typography.regular.md}>This would usually be loading state</Text>;
};

const styles = StyleSheet.create({
    category: {
        flex: 1,
        margin: 4,
        alignSelf: 'center',
        maxWidth: '31%',
        borderRadius: 8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(225,225,225,0.12)',
        overflow: 'hidden'
    },
    categorySelected: {
        flex: 1,
        borderRadius: 8,
    },
    categoryLabel: {
        ...typography.regular.sm,
        minHeight: 62,
        paddingVertical: 24,
        alignSelf: 'center',
        color: 'rgba(255,255,255, 0.8)'
    }
});