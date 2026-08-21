'use client';

import React, { useState } from 'react';
import { Download, FileText, Loader2, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportPDFProps {
  elementId: string;
  patientName?: string;
}

export function ExportPDFButton({ elementId, patientName = 'Pasien_MediCheck' }: ExportPDFProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleExportPDF = async () => {
    setLoading(true);
    setSuccess(false);

    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemen laporan tidak ditemukan.');
      }

      // Capture high quality canvas snapshot
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const cleanFileName = `MediCheck_SDG3_Hasil_Skrining_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(cleanFileName);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal mengenerate PDF:', err);
      alert('Gagal mendownload PDF. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      disabled={loading}
      className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all border ${
        success
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          : 'bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-extrabold border-teal-300 shadow-lg shadow-teal-500/20'
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
          <span>Mengompilasi PDF...</span>
        </>
      ) : success ? (
        <>
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>PDF Berhasil Diunduh!</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4 text-slate-950" />
          <span>Ekspor Hasil Skrining Ke PDF</span>
        </>
      )}
    </button>
  );
}
