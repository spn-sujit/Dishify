import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1c1917",
    paddingBottom: 12,
  },
  brandHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1c1917",
    maxWidth: "70%",
  },
  creatorStamp: {
    fontSize: 9,
    color: "#ea580c",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 11,
    color: "#44403c",
    lineHeight: 1.5,
    marginTop: 4,
  },
  metaGrid: {
    flexDirection: "row",
    backgroundColor: "#fafaf9",
    borderWidth: 1,
    borderColor: "#e7e5e4",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  metaItem: {
    fontSize: 10,
    color: "#57534e",
  },
  metaValue: {
    fontWeight: "bold",
    color: "#1c1917",
  },
  section: {
    marginBottom: 22,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ea580c",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#fed7aa",
    paddingBottom: 4,
    marginBottom: 10,
  },
  ingredientsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "48%",
    borderBottomWidth: 1,
    borderBottomColor: "#f5e6d3",
    paddingVertical: 6,
  },
  ingredientText: {
    fontSize: 10,
    color: "#2d2a26",
  },
  amountText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ea580c",
  },
  instructionStep: {
    marginBottom: 12,
    backgroundColor: "#fafaf9",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#ea580c",
  },
  stepHeader: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1c1917",
    marginBottom: 4,
  },
  stepText: {
    fontSize: 10,
    color: "#44403c",
    lineHeight: 1.5,
  },
  tipRow: {
    fontSize: 10,
    color: "#44403c",
    lineHeight: 1.5,
    marginBottom: 6,
    paddingLeft: 6,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e7e5e4",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBrand: {
    fontSize: 9,
    color: "#a8a29e",
    fontWeight: "bold",
  },
  footerPageNum: {
    fontSize: 9,
    color: "#a8a29e",
  },
});

export default function RecipePdf({ recipe, creatorName = "Chef Master" }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandHeader}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.creatorStamp}>By {creatorName} on Dishify</Text>
          </View>
          <Text style={styles.description}>{recipe.description}</Text>
        </View>

        <View style={styles.metaGrid}>
          <Text style={styles.metaItem}>
            Cuisine: <Text style={styles.metaValue}>{recipe.cuisine}</Text> | Category: <Text style={styles.metaValue}>{recipe.category}</Text>
          </Text>
          <Text style={styles.metaItem}>
            Total Time: <Text style={styles.metaValue}>{parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0)} mins</Text>
          </Text>
          <Text style={styles.metaItem}>
            Servings: <Text style={styles.metaValue}>{recipe.servings}</Text>
          </Text>
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.heading}>Ingredients</Text>
          <View style={styles.ingredientsGrid}>
            {recipe.ingredients?.map((ing, i) => (
              <View key={i} style={styles.ingredientRow} wrap={false}>
                <Text style={styles.ingredientText}>• {ing.item}</Text>
                <Text style={styles.amountText}>{ing.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Instructions</Text>
          {recipe.instructions?.map((step, i) => (
            <View key={step.step || i} style={styles.instructionStep} wrap={false}>
              <Text style={styles.stepHeader}>
                Step {step.step}: {step.title}
              </Text>
              <Text style={styles.stepText}>{step.instruction}</Text>
            </View>
          ))}
        </View>

        {recipe.tips?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Chef’s Tips</Text>
            {recipe.tips.map((tip, i) => (
              <Text key={i} style={styles.tipRow} wrap={false}>
                • {tip}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.footer} fixed>
          <Text style={styles.footerBrand}>
            Recipes by {creatorName} | Dishify
          </Text>
          <Text style={styles.footerPageNum} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
}