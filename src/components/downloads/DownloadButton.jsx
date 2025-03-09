'use client';

import 'jspdf-autotable';
import Button from '@/components/ui/Button';
import { jsPDF } from 'jspdf';

const DownloadButton = ({ id, fileName }) => {
  const exportPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait' });
    doc.autoTable({
      html: id,
    });
    doc.save(fileName);
  };

  return (
    <Button onClick={exportPdf} size={'sm'}>
      Download
    </Button>
  );
};

export default DownloadButton;
