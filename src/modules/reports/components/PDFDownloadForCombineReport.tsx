import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { Button } from "antd";
import logo from "../../../assets/logo.png";
import { ICombineReportQueryData } from "../types/reportTypes";

interface Props {
  PDFFileName: string;
  fileHeader: string;
  PDFHeader: string[]; // Field names
  PDFData: any; // Single entry object
  queryData: ICombineReportQueryData;
}

const CombineReportPDFDownload: React.FC<Props> = ({
  PDFFileName,
  fileHeader,
  PDFHeader,
  PDFData,
  queryData,
}) => {
  const date_time = moment().format("DD-MM-YYYY");
  const { employee_name, employee_id, designation, department, unit_name } =
    queryData || {};

  const savePDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Logo
    const img = new Image();
    img.src = logo;
    await new Promise((resolve) => {
      img.onload = () => {
        doc.addImage(img, "PNG", 10, 10, 28, 28); // Smaller logo
        resolve(true);
      };
    });

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor("#003366");
    doc.text(fileHeader, pageWidth / 2, 20, { align: "center" });

    // Meta Info
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90);

    let metaY = 45;
    doc.text(`Name: ${employee_name || "Not Applicable"}`, 10, metaY);
    metaY += 5;
    doc.text(`Employee ID: ${employee_id || "Not Applicable"}`, 10, metaY);
    metaY += 5;
    doc.text(`Designation: ${designation || "Not Applicable"}`, 10, metaY);
    metaY += 5;
    doc.text(`Department: ${department || "Not Applicable"}`, 10, metaY);
    metaY += 5;
    doc.text(`Unit Name: ${unit_name || "All Unit"}`, 10, metaY);

    const tableStartY = metaY + 10; // ← Add padding before table

    // Table Body
    const tableBody = PDFHeader.map((field, index) => [
      {
        content: field,
        styles: { fontStyle: "bold" as const, textColor: "#000" },
      },
      {
        content: String(PDFData[Object.keys(PDFData)[index]] ?? "-"),
        styles: { textColor: "#333" },
      },
    ]);

    // Draw table
    autoTable(doc, {
      startY: tableStartY,
      head: [["Field", "Value"]],
      body: tableBody,
      theme: "grid",
      headStyles: {
        fillColor: "#1A237E", // Deep navy blue
        textColor: "#fff",
        fontSize: 10,
        halign: "center",
      },
      bodyStyles: {
        halign: "left",
        fontSize: 9,
        cellPadding: 4, // Smaller padding
      },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 120 },
      },
      styles: {
        lineColor: "#e0e0e0",
        lineWidth: 0.4,
        font: "helvetica",
      },
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(
      `Page 1 of 1`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );

    doc.save(`${date_time}_${PDFFileName}.pdf`);
  };
  return (
    <Button
      onClick={savePDF}
      type="primary"
      style={{
        backgroundColor: "#1A237E", // Deep navy
        color: "#fff",
        width: "100%",
      }}
    >
      Download PDF
    </Button>
  );
};

export default CombineReportPDFDownload;
