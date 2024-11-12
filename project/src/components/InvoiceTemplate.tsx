import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// ... (keep existing Font.register and styles)

const formatAmount = (amount: string) => {
  // Remove any existing formatting and convert comma to dot
  const cleanAmount = amount.replace(/\s/g, '').replace(',', '.');
  // Ensure exactly 2 decimal places
  return parseFloat(cleanAmount).toFixed(2);
};

const formatBankAccount = (account: string) => {
  // Remove any spaces or special characters
  const cleanAccount = account.replace(/\s/g, '');
  // Split into account number and bank code
  const [accountNumber, bankCode] = cleanAccount.split('/');
  // Pad account number with zeros if needed (up to 16 digits)
  const paddedAccount = accountNumber.padStart(16, '0');
  // Format as IBAN
  return `CZ${bankCode}${paddedAccount}`;
};

const generateQRCode = async (invoiceData: any) => {
  try {
    const amount = formatAmount(invoiceData.totalAmount);
    const iban = formatBankAccount(invoiceData.bankAccount);
    
    // Construct SPAYD string according to Czech QR payment standard
    const spayd = [
      'SPD*1.0',
      `ACC:${iban}`,
      `AM:${amount}`,
      'CC:CZK',
      `X-VS:${invoiceData.variableSymbol || invoiceData.invoiceNumber}`,
      `MSG:FAKTURA${invoiceData.invoiceNumber}`
    ].join('*');

    const qrCodeDataURL = await QRCode.toDataURL(spayd, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 300,
      type: 'image/png'
    });
    
    return qrCodeDataURL;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

// ... (rest of the component remains the same)
