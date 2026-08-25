'use client';

import React, { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';

interface Props {
  elementId: string;
  filename?: string;
}

export function ExportPDFButton({ elementId, filename = 'MediRisk-AI-Laporan-Skrining' }: Props) {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    setLoading(true);
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        alert('Konten laporan tidak ditemukan.');
        return;
      }

      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0a0f1e',
        logging: false,
        windowWidth: 900,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add header
      pdf.setFillColor(10, 15, 30);
      pdf.rect(0, 0, pdfWidth, 15, 'F');
      pdf.setTextColor(14, 165, 233);
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('MediRisk AI — Laporan Skrining Kesehatan Preventif', pdfWidth / 2, 9, { align: 'center' });
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Hasil ini merupakan estimasi skrining berbasis AI, bukan diagnosis medis.', pdfWidth / 2, 13, { align: 'center' });

      // Add image (content)
      position = 17;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - position;

      while (heightLeft > 0) {
        pdf.addPage();
        position = -(pdfHeight - 17);
        pdf.addImage(imgData, 'PNG', 0, position - (imgHeight - heightLeft), imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Footer on last page
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFillColor(10, 15, 30);
        pdf.rect(0, pdfHeight - 10, pdfWidth, 10, 'F');
        pdf.setTextColor(71, 85, 105);
        pdf.setFontSize(7);
        pdf.text(
          `MediRisk AI • Skrining Kesehatan Preventif • SDG 3 — Kehidupan Sehat & Sejahtera • Halaman ${i} dari ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 4,
          { align: 'center' }
        );
      }

      const dateStr = new Date().toISOString().split('T')[0];
      pdf.save(`${filename}-${dateStr}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal mengunduh PDF. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${loading
          ? 'opacity-60 cursor-not-allowed border-white/10 text-slate-400'
          : 'border-sky-500/30 text-sky-300 hover:bg-sky-500/10 hover:border-sky-500/50 hover:text-sky-200'
        }`}
    >
      {loading ? (
        <><Loader2 className="h-4 w-4 animate-spin" /> Mengunduh...</>
      ) : (
        <><FileDown className="h-4 w-4" /> Unduh PDF</>
      )}
    </button>
  );
}
