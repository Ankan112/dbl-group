// import pdf1 from "../../../../public/IT SOP/14. SOP1.0.1 ROLES AND RESPONSIBILITIES/SOP 1.0.1_ROLES AND RESPONSIBILITIES.pdf";

// import PDFView from "../components/PDFView";

// const PageOne = () => {
//   const pdf = [
//     {
//       id: 1,
//       name: "SOP 1.0.1_ROLES AND RESPONSIBILITIES.pdf",
//       path: pdf1,
//     },
//   ];
//   return (
//     <>
//       <PDFView pdf={pdf} />
//     </>
//   );
// };

// export default PageOne;

// App.tsx
import React, { useState } from "react";
import { FaFilePdf, FaFolder } from "react-icons/fa";

import pdf1 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-A FIRST LEVEL IT SUPPORT.pdf";
import pdf2 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-B HARDWARE REQUISITION FORM.pdf";
import pdf3 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-C DEVICE PROVISIONING.pdf";
import pdf4 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-D ESCLATION MATRIX.pdf";
import pdf5 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-E IT HARDWARE REQUEST.pdf";
import pdf6 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/APPENDIX-F TID FORMAT.pdf";
import pdf7 from "../../../../public/IT SOP/1. SOP 1.0.2_IT SUPPORT/SOP 1.0.2 IT SUPPORT.pdf";
import pdf8 from "../../../../public/IT SOP/3. SOP 1.0.3_EMAIL USER CREATION AND DEACTIVATION/APPENDIX-A NEW JOINER'S EMAIL ID REQUEST- HR-TO-IT PROCESS FLOW.pdf";
import pdf9 from "../../../../public/IT SOP/3. SOP 1.0.3_EMAIL USER CREATION AND DEACTIVATION/APPENDIX-B EMAIL REQUISITION FORM.pdf";
import pdf10 from "../../../../public/IT SOP/3. SOP 1.0.3_EMAIL USER CREATION AND DEACTIVATION/HR LAPTOP-DESKTOP REQUEST TO IT PROCESS FLOW.pdf";
import pdf11 from "../../../../public/IT SOP/3. SOP 1.0.3_EMAIL USER CREATION AND DEACTIVATION/SOP 1.0.3 EMAIL USER CREATION AND DEACTIVATION.pdf";
import pdf12 from "../../../../public/IT SOP/7. SOP 1.0.4_EMAIL ARCHIVING/SOP 1.0.4_EMAIL ARCHIVING.pdf";
import pdf13 from "../../../../public/IT SOP/11. SOP 1.0.5 NETWORK AND INFRASTRUCTURE MANAGEMENT/SOP 1.0.5 Network and Infrastructure Management.pdf";
import pdf14 from "../../../../public/IT SOP/2. SOP 1.0.6_FIREWALL CONFIGURATION/SOP 1.0.6 FIREWALL CONFIGURATION.pdf";
import pdf15 from "../../../../public/IT SOP/12. SOP 1.0.7 NETWORK CONFIGURATION/Appendix-A Switch Configuration.pdf";
import pdf16 from "../../../../public/IT SOP/12. SOP 1.0.7 NETWORK CONFIGURATION/SOP 1.0.7_Network Configuration.pdf";
import pdf17 from "../../../../public/IT SOP/5. SOP 1.0.9_INCIDENT RESPONSE/APPENDIX0-A INCIDENT RESPONSE TEAM.pdf";
import pdf18 from "../../../../public/IT SOP/5. SOP 1.0.9_INCIDENT RESPONSE/APPENDIX0-B IT DRIVEN BUSINESS APPLICATION LIST.pdf";
import pdf19 from "../../../../public/IT SOP/5. SOP 1.0.9_INCIDENT RESPONSE/SOP 1.0.9_INCIDENT RESPONSE.pdf";
import pdf20 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/APPENDIX-A LIST OF STANDALONE SYSTEM.pdf";
import pdf21 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/APPENDIX-B DATA BACKUP REQUEST FORM.pdf";
import pdf22 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/APPENDIX-C DATA RESTORE FORM.pdf";
import pdf23 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/APPENDIX-D QUARTERLY, HALF YEARLY & YEARLY DATA BACKUP RECORD.pdf";
import pdf24 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/APPENDIX-E  LOGBOOK FOR STANDALONE SYSTEMUSER DATA RETENTION.pdf";
import pdf25 from "../../../../public/IT SOP/4. SOP 1.0.10_DATA BACKUP AND RECOVERY/SOP 1.0.10_DATA BACKUP AND RECOVERY.pdf";
import pdf26 from "../../../../public/IT SOP/13. SOP 1.0.11 IT ACCESS CONTROL/APPENDIX A_USER ACCESS AUTHORIZATION FORM.pdf";
import pdf27 from "../../../../public/IT SOP/13. SOP 1.0.11 IT ACCESS CONTROL/IT ACCESS CONTROL POLICY.pdf";
import pdf28 from "../../../../public/IT SOP/13. SOP 1.0.11 IT ACCESS CONTROL/SOP 1.0.11_IT ACCESS CONTROL.pdf";
import pdf29 from "../../../../public/IT SOP/6. SOP 1.0.12_IT ASSET MANAGEMENT/APPENDIX-A_Fixed Asset Policy.pdf";
import pdf30 from "../../../../public/IT SOP/6. SOP 1.0.12_IT ASSET MANAGEMENT/APPENDIX-B_IT Policy Device and Reimbursement.pdf";
import pdf31 from "../../../../public/IT SOP/6. SOP 1.0.12_IT ASSET MANAGEMENT/APPENDIX-C Vendor RFP Template.pdf";
import pdf32 from "../../../../public/IT SOP/6. SOP 1.0.12_IT ASSET MANAGEMENT/SOP 1.0.12_IT ASSET MANAGEMENT.pdf";
import pdf33 from "../../../../public/IT SOP/9. SOP 1.0.13_IT VENDOR MANAGEMENT/APPENDIX-C VENDOR RFP TEMPLATE.pdf";
import pdf34 from "../../../../public/IT SOP/9. SOP 1.0.13_IT VENDOR MANAGEMENT/APPENDIX-D VVENDOR SCORING TEMPLATE.pdf";
import pdf35 from "../../../../public/IT SOP/9. SOP 1.0.13_IT VENDOR MANAGEMENT/APPENDIX-E IT VENDOR EXIT STRATEGY.pdf";
import pdf36 from "../../../../public/IT SOP/9. SOP 1.0.13_IT VENDOR MANAGEMENT/SOP 1.0.13_IT VENDOR MANAGEMENT.pdf";
import pdf37 from "../../../../public/IT SOP/10. SOP 1.0.14_IT INVENTORY MANAGEMENT/SOP 1.0.14_IT INVENTORY MANAGEMENT SOP.pdf";
import pdf38 from "../../../../public/IT SOP/15. SOP 1.0.15_IT Procurement (Approved)/SOP 1.0.15_IT Procurement.pdf";
import pdf39 from "../../../../public/IT SOP/SOP INDEX.pdf";
import pdf40 from "../../../../public/IT SOP/SOP Saftey & Security.pdf";

interface Folder {
  name: string;
  pdfs: { name: string; file: string }[];
}

const PageOne: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const folders: Folder[] = [
    { name: "SOP Index", pdfs: [{ name: "SOP Index", file: pdf39 }] },
    {
      name: "Roles and Responsibilities",
      pdfs: [
        { name: "Coding Standards", file: "path/to/coding-standards.pdf" },
      ],
    },
    {
      name: "IT Support",
      pdfs: [
        { name: "User Manual", file: pdf8 },
        { name: "User Manual2", file: pdf9 },
        { name: "User Manual3", file: pdf10 },
        { name: "User Manual4", file: pdf11 },
      ],
    },
    {
      name: "Email User Creation and Deactivation",
      pdfs: [{ name: "Annual Report", file: "path/to/annual-report.pdf" }],
    },
    {
      name: "Email Archiving",
      pdfs: [{ name: "Privacy Policy", file: "path/to/privacy-policy.pdf" }],
    },
    {
      name: "Network and Infrastructure Management",
      pdfs: [
        { name: "Safety Procedures", file: "path/to/safety-procedures.pdf" },
      ],
    },
    {
      name: "Firewall Configuration",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "Network Configuration",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "Change Management",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "Incident Response",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "Data Backup and Recovery",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "IT Access Control",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "IT Asset Management",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "IT Vendor Management",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "IT Inventory Management",
      pdfs: [{ name: "Misc File", file: "path/to/misc.pdf" }],
    },
    {
      name: "IT Procurement (Approved)",
      pdfs: [{ name: "SOP 1.0.15_IT Procurement (Approved)", file: pdf38 }],
    },
    {
      name: "SOP Safety & Security",
      pdfs: [{ name: "SOP Saftey & Security", file: pdf40 }],
    },
  ];

  const openPopup = (pdf: string) => {
    setSelectedPdf(pdf);
    setTimeout(() => setIsPopupVisible(true), 10);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTimeout(() => setSelectedPdf(null), 300);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Horizontal folder list with hover-activated scrollbar */}
      <div
        className="folder-list"
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "20px",
          gap: "10px",
          backgroundColor: "#f7f7f7",
          borderBottom: "1px solid #ccc",
          justifyContent: "flex-start", // Align items to the start
        }}
      >
        <style>
          {`
            .folder-list {
              scrollbar-width: thin;
              scrollbar-color: transparent transparent; /* Firefox */
            }
            .folder-list::-webkit-scrollbar {
              height: 8px;
              background-color: transparent; /* Default background */
            }
            .folder-list::-webkit-scrollbar-thumb {
              background-color: transparent; /* Invisible thumb */
            }
            .folder-list:hover {
              scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0); /* Visible on hover */
            }
            .folder-list:hover::-webkit-scrollbar-thumb {
              background-color: rgba(0, 0, 0, 0.3); /* Visible thumb color on hover */
            }
            .folder-card { transition: background-color 0.3s, transform 0.3s; }
            .folder-card:hover { background-color: #e0e0e0; transform: scale(1.03); }
            .pdf-card { transition: background-color 0.3s, transform 0.3s; }
            .pdf-card:hover { background-color: #f0f0f0; transform: scale(1.03); }
          `}
        </style>
        {folders.map((folder) => (
          <button
            key={folder.name}
            onClick={() => setSelectedFolder(folder)}
            className="folder-card"
            style={{
              minWidth: "150px",
              padding: "15px",
              backgroundColor: "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <FaFolder
              size={30}
              color="#ffcc00"
              style={{ marginBottom: "10px" }}
            />
            <span
              style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
            >
              {folder.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right-side view for files in selected folder */}
      <section
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h3 style={{ color: "#333", marginBottom: "10px" }}>
          Files in {selectedFolder?.name || "..."}
        </h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {selectedFolder?.pdfs.map((pdf) => (
            <div
              key={pdf.name}
              style={{ minWidth: "120px", maxWidth: "150px" }}
            >
              <button
                onClick={() => openPopup(pdf.file)}
                className="pdf-card"
                style={{
                  width: "100%",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s, transform 0.3s",
                }}
              >
                <FaFilePdf
                  size={30}
                  color="#ff6f61"
                  style={{ marginBottom: "10px" }}
                />
                <span
                  style={{
                    color: "#333",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  {pdf.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Popup PDF Viewer */}
      {selectedPdf && (
        <div
          onClick={closePopup}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isPopupVisible ? 1 : 0,
            transform: isPopupVisible ? "scale(1)" : "scale(0.9)",
            filter: isPopupVisible ? "blur(0)" : "blur(8px)",
            transition:
              "opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "80%",
              height: "80%",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <iframe
              src={selectedPdf}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "0 0 12px 12px",
              }}
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageOne;
