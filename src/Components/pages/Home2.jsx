import { useState } from "react";
import { Page, PDFViewer, View, Document, Text, StyleSheet, Image, Font, pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import logo from '../../assets/logoblood-removebg-preview.png';

// Register the Bengali font
import NotoSerifBengali from "../../../public/fonts/NotoSerifBengali-VariableFont_wdth,wght.ttf";

Font.register({
  family: "NotoSerifBengali",
  src: NotoSerifBengali,
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "NotoSerifBengali",
    fontSize: 12,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
  },
  subtitle2: {
    fontSize: 12,
    color: "red",
  },
  table: {
    width: "100%",
    marginTop: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    padding: 1,
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#3533CA",
    color: "white",
    textAlign: "center",
    padding: 0,
    marginTop: 0,
  },
});
const ramadanScheduleBangla = [
  { "day": "১", "date": "০২ মার্চ ", "sehri": "০৫:০৪ AM", "iftar": "৬:০২ PM" },
  { "day": "২", "date": "০৩ মার্চ ", "sehri": "০৫:০৩ AM", "iftar": "৬:০৩ PM" },
  { "day": "৩", "date": "০৪ মার্চ ", "sehri": "০৫:০২ AM", "iftar": "৬:০৩ PM" },
  { "day": "৪", "date": "০৫ মার্চ ", "sehri": "০৫:০১ AM", "iftar": "৬:০৪ PM" },
  { "day": "৫", "date": "০৬ মার্চ ", "sehri": "০৫:০০ AM", "iftar": "৬:০৪ PM" },
  { "day": "৬", "date": "০৭ মার্চ ", "sehri": "০৪:৫৯ AM", "iftar": "৬:০৫ PM" },
  { "day": "৭", "date": "০৮ মার্চ ", "sehri": "০৪:৫৮ AM", "iftar": "৬:০৫ PM" },
  { "day": "৮", "date": "০৯ মার্চ ", "sehri": "০৪:৫৭ AM", "iftar": "৬:০৬ PM" },
  { "day": "৯", "date": "১০ মার্চ ", "sehri": "০৪:৫৬ AM", "iftar": "৬:০৬ PM" },
  { "day": "১০", "date": "১১ মার্চ ", "sehri": "০৪:৫৫ AM", "iftar": "৬:০৬ PM" },
  { "day": "১১", "date": "১২ মার্চ ", "sehri": "০৪:৫৪ AM", "iftar": "৬:০৭ PM" },
  { "day": "১২", "date": "১৩ মার্চ ", "sehri": "০৪:৫৩ AM", "iftar": "৬:০৭ PM" },
  { "day": "১৩", "date": "১৪ মার্চ ", "sehri": "০৪:৫২ AM", "iftar": "৬:০৮ PM" },
  { "day": "১৪", "date": "১৫ মার্চ ", "sehri": "০৪:৫১ AM", "iftar": "৬:০৮ PM" },
  { "day": "১৫", "date": "১৬ মার্চ ", "sehri": "০৪:৫০ AM", "iftar": "৬:০৮ PM" },
  { "day": "১৬", "date": "১৭ মার্চ ", "sehri": "০৪:৪৯ AM", "iftar": "৬:০৯ PM" },
  { "day": "১৭", "date": "১৮ মার্চ ", "sehri": "০৪:৪৮ AM", "iftar": "৬:০৯ PM" },
  { "day": "১৮", "date": "১৯ মার্চ ", "sehri": "০৪:৪৭ AM", "iftar": "৬:১০ PM" },
  { "day": "১৯", "date": "২০ মার্চ ", "sehri": "০৪:৪৬ AM", "iftar": "৬:১০ PM" },
  { "day": "২০", "date": "২১ মার্চ ", "sehri": "০৪:৪৫ AM", "iftar": "৬:১০ PM" },
  { "day": "২১", "date": "২২ মার্চ ", "sehri": "০৪:৪৪ AM", "iftar": "৬:১১ PM" },
  { "day": "২২", "date": "২৩ মার্চ ", "sehri": "০৪:৪৩ AM", "iftar": "৬:১১ PM" },
  { "day": "২৩", "date": "২৪ মার্চ ", "sehri": "০৪:৪২ AM", "iftar": "৬:১১ PM" },
  { "day": "২৪", "date": "২৫ মার্চ ", "sehri": "০৪:৪১ AM", "iftar": "৬:১২ PM" },
  { "day": "২৫", "date": "২৬ মার্চ ", "sehri": "০৪:৪০ AM", "iftar": "৬:১২ PM" },
  { "day": "২৬", "date": "২৭ মার্চ ", "sehri": "০৪:৩৯ AM", "iftar": "৬:১৩ PM" },
  { "day": "২৭", "date": "২৮ মার্চ ", "sehri": "০৪:৩৮ AM", "iftar": "৬:১৩ PM" },
  { "day": "২৮", "date": "২৯ মার্চ ", "sehri": "০৪:৩৬ AM", "iftar": "৬:১৪ PM" },
  { "day": "২৯", "date": "৩০ মার্চ ", "sehri": "০৪:৩৫ AM", "iftar": "৬:১৪ PM" },
  { "day": "৩০", "date": "৩১ মার্চ ", "sehri": "০৪:৩৪ AM", "iftar": "৬:১৫ PM" }
];
const RamadanPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src={logo} />
        <View>
          <Text style={styles.title}>Blood Bank Bangladesh</Text>
          <Text style={styles.subtitle2}>সেহেরি ও ইফতারের সময়সূচি</Text>
          <Text style={styles.subtitle}>( শুধু ঢাকা জেলার জন্য )</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>রমজান</Text>
          <Text style={styles.tableCell}>তারিখ</Text>
          <Text style={styles.tableCell}>সেহেরি</Text>
          <Text style={styles.tableCell}>ইফতার</Text>
        </View>

           {/* Table Body */}
           {ramadanScheduleBangla.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.day}</Text>
            <Text style={styles.tableCell}>{item.date}</Text>
            <Text style={styles.tableCell}>{item.sehri}</Text>
            <Text style={styles.tableCell}>{item.iftar}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Donate Blood, Save Life</Text>
        <Text>বি.দ্রঃ ১ম রমজান চাঁদ দেখার উপর নির্ভরশীল।</Text>
        <Text>Design by Amir Hossain | 01904722779</Text>
      </View>
    </Page>
  </Document>
);

const Home2 = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const blob = await pdf(<RamadanPDF />).toBlob();
    saveAs(blob, "Ramadan_Schedule.pdf");
    setLoading(false);
  };

  return (
    <div className="w-full h-[1280px] flex flex-col items-center relative">
      {/* Sticky Download Button */}
      <div className="w-full bg-white p-4 flex justify-center sticky top-0 z-50 shadow-md">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download PDF"}
        </button>
      </div>

      {/* PDF Viewer */}
      <PDFViewer width="100%" height="100%">
        <RamadanPDF />
      </PDFViewer>
    </div>
  );
};

export default Home2;

