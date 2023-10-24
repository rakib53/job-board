import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

// Style for the document
const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { textAlign: "center", fontSize: 24, marginBottom: 30 },
  content: { fontSize: 16, lineHeight: 1.5, color: "red" },
});

const DownloadResume = ({ user }) => (
  <Document>
    <Page wrap style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.heading}>{user?.userName}</Text>
        <View>
          <Text style={styles.paragraph}>This is a paragraph of text.</Text>
          <Text style={styles.paragraph}>
            You can include <Text style={styles.link}>links</Text> within the
            PDF.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DownloadResume;
