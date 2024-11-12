import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a font that supports Czech characters
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 40,
    fontSize: 10,
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 12,
  },
  text: {
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
  },
  tableCell: {
    flex: 1,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  total: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 20,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  qrCode: {
    marginTop: 40,
    width: 100,
    height: 100,
  },
  qrLabel: {
    marginTop: 5,
    fontSize: 8,
    color: '#666666',
  }
});

const formatNumber = (num) => {
  return new Intl.NumberFormat('cs-CZ', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(num);
};

export default function InvoiceTemplate({ invoiceData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Faktura {invoiceData.invoiceNumber}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>DODAVATEL</Text>
            <Text style={styles.text}>{invoiceData.supplierName}</Text>
            <Text style={styles.text}>{invoiceData.supplierAddress}</Text>
            <Text style={styles.text}>{invoiceData.supplierCity}</Text>
            <Text style={styles.text}>IČO: {invoiceData.supplierICO}</Text>
            {invoiceData.supplierDIC && (
              <Text style={styles.text}>DIČ: {invoiceData.supplierDIC}</Text>
            )}
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>ODBĚRATEL</Text>
            <Text style={styles.text}>{invoiceData.customerName}</Text>
            <Text style={styles.text}>{invoiceData.customerAddress}</Text>
            <Text style={styles.text}>{invoiceData.customerCity}</Text>
            <Text style={styles.text}>IČO: {invoiceData.customerICO}</Text>
            {invoiceData.customerDIC && (
              <Text style={styles.text}>DIČ: {invoiceData.customerDIC}</Text>
            )}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.text}>Bankovní účet: {invoiceData.bankAccount}</Text>
            <Text style={styles.text}>Variabilní symbol: {invoiceData.variableSymbol}</Text>
            <Text style={styles.text}>Způsob platby: {invoiceData.paymentMethod}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.text}>Datum vystavení: {invoiceData.issueDate}</Text>
            <Text style={styles.text}>Datum splatnosti: {invoiceData.dueDate}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, { flex: 0.5 }]}>Množství</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.5 }]}>MJ</Text>
            <Text style={[styles.tableCellHeader, { flex: 3 }]}>Popis</Text>
            <Text style={[styles.tableCellHeader, { flex: 1, textAlign: 'right' }]}>CENA ZA MJ</Text>
            <Text style={[styles.tableCellHeader, { flex: 1, textAlign: 'right' }]}>CELKEM</Text>
          </View>

          {invoiceData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { flex: 0.5 }]}>{item.unit}</Text>
              <Text style={[styles.tableCell, { flex: 3 }]}>{item.description}</Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>
                {formatNumber(item.unitPrice)} Kč
              </Text>
              <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>
                {formatNumber(item.totalPrice)} Kč
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text style={styles.totalLabel}>CELKEM</Text>
          <Text style={styles.totalAmount}>{formatNumber(invoiceData.totalAmount)} Kč</Text>
        </View>

        {invoiceData.qrCode && (
          <View>
            <Image style={styles.qrCode} src={invoiceData.qrCode} />
            <Text style={styles.qrLabel}>QR Platba</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}