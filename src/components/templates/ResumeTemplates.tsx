/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { portfolioData } from "../../data";

// ==================== TYPES ====================
export interface SkillItem {
  name: string;
  level?: number;
}

export interface SkillCategory {
  category: string;
  icon?: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  description: string;
  tech?: string[];
  image?: string;
  demo?: string;
  github?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description?: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period?: string;
  location?: string;
  achievements?: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    title?: string;
    tagline?: string;
    email?: string;
    phone?: string;
    location?: string;
    profileImage?: string | any;
    bio?: string;
    resume?: string;
    social?: Record<string, string>;
  };
  skills?: SkillCategory[];
  services?: any[];
  projects?: Project[];
  experience?: Experience[];
  education?: Education[];
  others?: {
    technologies?: number;
    experience?: number;
    projects?: number;
    certifications?: number;
  };
}

// ==================== PERFECT PDF GENERATION ====================
async function downloadResumePDF(
  element: HTMLElement,
  fileName = "resume.pdf"
) {
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const MARGIN_MM = 10;

  console.log("🎯 Starting PDF generation...");

  try {
    // Create clean clone for rendering
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.width = "210mm";
    clone.style.backgroundColor = "white";
    document.body.appendChild(clone);

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Capture at exact A4 dimensions
    const canvas = await html2canvas(clone, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const contentWidth = A4_WIDTH_MM - MARGIN_MM * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    const pageContentHeight = A4_HEIGHT_MM - MARGIN_MM * 2;

    if (contentHeight <= pageContentHeight) {
      console.log("✅ Single page PDF");
      pdf.addImage(
        imgData,
        "PNG",
        MARGIN_MM,
        MARGIN_MM,
        contentWidth,
        contentHeight
      );
    } else {
      console.log("📄 Multi-page PDF");

      let currentY = 0;
      let pageNumber = 1;

      while (currentY < contentHeight) {
        if (pageNumber > 1) {
          pdf.addPage();
        }

        const remainingHeight = contentHeight - currentY;
        const heightForPage = Math.min(pageContentHeight, remainingHeight);

        const sourceYPx = (currentY / contentHeight) * canvas.height;
        const heightPx = (heightForPage / contentHeight) * canvas.height;

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.ceil(heightPx);

        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

          ctx.drawImage(
            canvas,
            0,
            sourceYPx,
            canvas.width,
            heightPx,
            0,
            0,
            canvas.width,
            heightPx
          );

          const pageImageData = pageCanvas.toDataURL("image/png", 1.0);
          pdf.addImage(
            pageImageData,
            "PNG",
            MARGIN_MM,
            MARGIN_MM,
            contentWidth,
            heightForPage
          );

          console.log(`✅ Page ${pageNumber}`);
        }

        currentY += heightForPage;
        pageNumber++;
      }
    }

    pdf.save(fileName);
    console.log("🎉 PDF complete!");
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

// ==================== ICON COMPONENTS ====================
const EmailIcon = () => (
  <svg
    className="w-4 h-4 inline-block mr-1.5"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-4 h-4 inline-block mr-1.5"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4 inline-block mr-1.5"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const SocialLinks: React.FC<{ social?: Record<string, string> }> = ({
  social,
}) => {
  if (!social || Object.keys(social).length === 0) return null;

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) return <LinkedInIcon />;
    if (p.includes("github")) return <GitHubIcon />;
    if (p.includes("twitter") || p.includes("x.com")) return <TwitterIcon />;
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(social).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all"
          title={platform}
        >
          <div className="text-white">{getIcon(platform)}</div>
        </a>
      ))}
    </div>
  );
};

// ==================== TEMPLATE 1: ATS OPTIMIZED ====================
const TemplateATS: React.FC<{ rootRef: React.RefObject<HTMLDivElement> }> = ({
  rootRef,
}) => {
  const data = portfolioData;

  return (
    <div
      ref={rootRef}
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "15mm",
        backgroundColor: "white",
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        fontSize: "10pt",
        lineHeight: "1.4",
        color: "#1f2937",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "5mm",
          paddingBottom: "4mm",
          borderBottom: "2px solid #111827",
        }}
      >
        <h1
          style={{
            fontSize: "22pt",
            fontWeight: "bold",
            color: "#111827",
            margin: "0 0 2mm 0",
          }}
        >
          {data.personal.name}
        </h1>
        <div
          style={{
            fontSize: "11pt",
            color: "#374151",
            fontWeight: "600",
            marginBottom: "3mm",
          }}
        >
          {data.personal.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3mm",
              fontSize: "9pt",
              color: "#374151",
            }}
          >
            {data.personal.email && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <EmailIcon /> {data.personal.email}
              </span>
            )}
            {data.personal.phone && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <PhoneIcon /> {data.personal.phone}
              </span>
            )}
            {data.personal.location && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                <LocationIcon /> {data.personal.location}
              </span>
            )}
          </div>

          {data.personal.social && (
            <SocialLinks social={data.personal.social} />
          )}
        </div>
      </div>

      {/* SUMMARY */}
      {data.personal.bio && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "2mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #111827",
              paddingBottom: "1mm",
            }}
          >
            Professional Summary
          </h2>
          <p
            style={{
              fontSize: "9.5pt",
              color: "#1f2937",
              lineHeight: "1.5",
              textAlign: "justify",
              margin: 0,
            }}
          >
            {data.personal.bio}
          </p>
        </div>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "2mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #111827",
              paddingBottom: "1mm",
            }}
          >
            Technical Skills
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5mm" }}
          >
            {data.skills.map((skillCategory, i) => (
              <div key={i} style={{ display: "flex", fontSize: "9pt" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#111827",
                    width: "35mm",
                    flexShrink: 0,
                  }}
                >
                  {skillCategory.category}:
                </div>
                <div style={{ color: "#1f2937", flex: 1 }}>
                  {skillCategory.items.map((skill, j) => skill.name).join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "3mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #111827",
              paddingBottom: "1mm",
            }}
          >
            Professional Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "4mm" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.5mm",
                }}
              >
                <h3
                  style={{
                    fontSize: "10pt",
                    fontWeight: "bold",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {exp.title}
                </h3>
                <span
                  style={{
                    fontSize: "8.5pt",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                    marginLeft: "3mm",
                    backgroundColor: "#f3f4f6",
                    padding: "1mm 2mm",
                    borderRadius: "2mm",
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <div
                style={{
                  fontSize: "9.5pt",
                  color: "#2563eb",
                  fontWeight: "600",
                  marginBottom: "1.5mm",
                }}
              >
                {exp.company}
              </div>
              {exp.description && (
                <p
                  style={{
                    fontSize: "9pt",
                    color: "#1f2937",
                    marginBottom: "1.5mm",
                    lineHeight: "1.5",
                    margin: "0 0 1.5mm 0",
                  }}
                >
                  {exp.description}
                </p>
              )}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul
                  style={{
                    fontSize: "9pt",
                    color: "#1f2937",
                    margin: "0 0 0 5mm",
                    padding: 0,
                    listStyleType: "disc",
                  }}
                >
                  {exp.achievements.map((achievement, j) => (
                    <li
                      key={j}
                      style={{ marginBottom: "1mm", lineHeight: "1.5" }}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "3mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #111827",
              paddingBottom: "1mm",
            }}
          >
            Key Projects
          </h2>
          {data.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: "3mm" }}>
              <h3
                style={{
                  fontSize: "9.5pt",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "0.5mm",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontSize: "9pt",
                  color: "#1f2937",
                  marginBottom: "1mm",
                  lineHeight: "1.5",
                  margin: "0 0 1mm 0",
                }}
              >
                {project.description}
              </p>
              {project.tech && project.tech.length > 0 && (
                <div style={{ fontSize: "8.5pt", color: "#374151" }}>
                  <span style={{ fontWeight: "600" }}>Technologies:</span>{" "}
                  {project.tech.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "2mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #111827",
              paddingBottom: "1mm",
            }}
          >
            Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "2mm" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "0.5mm",
                }}
              >
                <h3
                  style={{
                    fontSize: "9.5pt",
                    fontWeight: "bold",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {edu.degree}
                </h3>
                <span
                  style={{
                    fontSize: "8.5pt",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                    marginLeft: "3mm",
                  }}
                >
                  {edu.period}
                </span>
              </div>
              <div
                style={{ fontSize: "9pt", color: "#2563eb", fontWeight: "500" }}
              >
                {edu.institution}
                {edu.location && ` • ${edu.location}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==================== TEMPLATE 2: MODERN SIDEBAR ====================
const TemplateSidebar: React.FC<{
  rootRef: React.RefObject<HTMLDivElement>;
}> = ({ rootRef }) => {
  const data = portfolioData;

  return (
    <div
      ref={rootRef}
      style={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "white",
        margin: "0 auto",
        display: "flex",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "70mm",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "12mm 8mm",
          fontSize: "9pt",
        }}
      >
        {data.personal.profileImage && (
          <div style={{ marginBottom: "5mm", textAlign: "center" }}>
            <img
              src={
                typeof data.personal.profileImage === "string"
                  ? data.personal.profileImage
                  : ""
              }
              alt="profile"
              style={{
                width: "25mm",
                height: "25mm",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: "6mm", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "14pt",
              fontWeight: "bold",
              margin: "0 0 2mm 0",
            }}
          >
            {data.personal.name}
          </h1>
          <p style={{ fontSize: "10pt", color: "#93c5fd", margin: 0 }}>
            {data.personal.title}
          </p>
        </div>

        <div
          style={{
            marginBottom: "6mm",
            paddingBottom: "6mm",
            borderBottom: "1px solid #475569",
          }}
        >
          <h3
            style={{
              fontSize: "9pt",
              fontWeight: "bold",
              marginBottom: "2mm",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Contact
          </h3>
          <div style={{ fontSize: "8.5pt", lineHeight: "1.6" }}>
            {data.personal.email && (
              <div style={{ marginBottom: "2mm", wordBreak: "break-word" }}>
                {data.personal.email}
              </div>
            )}
            {data.personal.phone && (
              <div style={{ marginBottom: "2mm" }}>{data.personal.phone}</div>
            )}
            {data.personal.location && (
              <div style={{ marginBottom: "2mm" }}>
                {data.personal.location}
              </div>
            )}
          </div>
        </div>

        {data.personal.social && (
          <div
            style={{
              marginBottom: "6mm",
              paddingBottom: "6mm",
              borderBottom: "1px solid #475569",
            }}
          >
            <h3
              style={{
                fontSize: "9pt",
                fontWeight: "bold",
                marginBottom: "3mm",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Connect
            </h3>
            <SocialLinks social={data.personal.social} />
          </div>
        )}

        {data.skills && (
          <div>
            <h3
              style={{
                fontSize: "9pt",
                fontWeight: "bold",
                marginBottom: "3mm",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Skills
            </h3>
            {data.skills.map((cat, i) => (
              <div key={i} style={{ marginBottom: "4mm" }}>
                <div
                  style={{
                    fontSize: "8.5pt",
                    fontWeight: "600",
                    marginBottom: "1.5mm",
                  }}
                >
                  {cat.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1mm" }}>
                  {cat.items.map((skill, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: "8pt",
                        backgroundColor: "#334155",
                        padding: "1mm 2mm",
                        borderRadius: "2mm",
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ width: "140mm", padding: "12mm 10mm", fontSize: "9.5pt" }}>
        {data.personal.bio && (
          <div style={{ marginBottom: "5mm" }}>
            <h2
              style={{
                fontSize: "11pt",
                fontWeight: "bold",
                marginBottom: "2mm",
                borderBottom: "2px solid #2563eb",
                paddingBottom: "2mm",
              }}
            >
              Professional Summary
            </h2>
            <p style={{ fontSize: "9pt", lineHeight: "1.5", margin: 0 }}>
              {data.personal.bio}
            </p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: "5mm" }}>
            <h2
              style={{
                fontSize: "11pt",
                fontWeight: "bold",
                marginBottom: "3mm",
                borderBottom: "2px solid #2563eb",
                paddingBottom: "2mm",
              }}
            >
              Work Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "4mm",
                  borderLeft: "3px solid #2563eb",
                  paddingLeft: "3mm",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5mm",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "9.5pt",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {exp.title}
                    </h3>
                    <div
                      style={{
                        fontSize: "9pt",
                        color: "#2563eb",
                        fontWeight: "600",
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "8pt",
                      color: "white",
                      backgroundColor: "#2563eb",
                      padding: "1mm 2.5mm",
                      borderRadius: "10mm",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                {exp.description && (
                  <p
                    style={{
                      fontSize: "8.5pt",
                      marginBottom: "1.5mm",
                      lineHeight: "1.5",
                      margin: "0 0 1.5mm 0",
                    }}
                  >
                    {exp.description}
                  </p>
                )}
                {exp.achievements && (
                  <ul
                    style={{
                      fontSize: "8.5pt",
                      margin: "0 0 0 4mm",
                      padding: 0,
                      listStyleType: "disc",
                    }}
                  >
                    {exp.achievements.map((a, j) => (
                      <li
                        key={j}
                        style={{ marginBottom: "1mm", lineHeight: "1.5" }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5mm",
          }}
        >
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "2mm",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: "2mm",
                }}
              >
                Projects
              </h2>
              {data.projects.map((p, i) => (
                <div key={i} style={{ marginBottom: "3mm" }}>
                  <h3
                    style={{
                      fontSize: "8.5pt",
                      fontWeight: "bold",
                      marginBottom: "0.5mm",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "8pt", margin: 0 }}>{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div>
              <h2
                style={{
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "2mm",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: "2mm",
                }}
              >
                Education
              </h2>
              {data.education.map((e, i) => (
                <div key={i} style={{ marginBottom: "3mm" }}>
                  <div style={{ fontSize: "8.5pt", fontWeight: "600" }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: "8pt", color: "#2563eb" }}>
                    {e.institution}
                  </div>
                  <div style={{ fontSize: "8pt", color: "#6b7280" }}>
                    {e.period}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== TEMPLATE 3: CLEAN PROFESSIONAL ====================
const TemplateClean: React.FC<{ rootRef: React.RefObject<HTMLDivElement> }> = ({
  rootRef,
}) => {
  const data = portfolioData;

  return (
    <div
      ref={rootRef}
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "15mm",
        backgroundColor: "white",
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        fontSize: "10pt",
        lineHeight: "1.4",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          marginBottom: "5mm",
          paddingBottom: "4mm",
          borderBottom: "2px solid #2563eb",
        }}
      >
        <h1
          style={{ fontSize: "22pt", fontWeight: "bold", margin: "0 0 2mm 0" }}
        >
          {data.personal.name}
        </h1>
        <div
          style={{
            fontSize: "11pt",
            color: "#2563eb",
            fontWeight: "600",
            marginBottom: "3mm",
          }}
        >
          {data.personal.title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3mm",
              fontSize: "9pt",
              color: "#374151",
            }}
          >
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
          </div>
          {data.personal.social && (
            <SocialLinks social={data.personal.social} />
          )}
        </div>
      </div>

      {data.personal.bio && (
        <div style={{ marginBottom: "5mm" }}>
          <h2
            style={{
              fontSize: "10pt",
              fontWeight: "bold",
              color: "#2563eb",
              marginBottom: "2mm",
              textTransform: "uppercase",
              borderBottom: "1px solid #2563eb",
              paddingBottom: "1mm",
            }}
          >
            Professional Summary
          </h2>
          <p
            style={{
              fontSize: "9pt",
              color: "#374151",
              lineHeight: "1.5",
              margin: 0,
            }}
          >
            {data.personal.bio}
          </p>
        </div>
      )}

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "6mm" }}
      >
        {/* LEFT */}
        <div>
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: "5mm" }}>
              <h2
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "3mm",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #2563eb",
                  paddingBottom: "1mm",
                }}
              >
                Work Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "4mm" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5mm",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: "9.5pt",
                          fontWeight: "bold",
                          margin: 0,
                        }}
                      >
                        {exp.title}
                      </h3>
                      <div
                        style={{
                          fontSize: "9pt",
                          color: "#2563eb",
                          fontWeight: "500",
                        }}
                      >
                        {exp.company}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "8.5pt",
                        color: "#6b7280",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  {exp.description && (
                    <p
                      style={{
                        fontSize: "8.5pt",
                        color: "#374151",
                        marginBottom: "1.5mm",
                        lineHeight: "1.5",
                        margin: "0 0 1.5mm 0",
                      }}
                    >
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && (
                    <ul
                      style={{
                        fontSize: "8.5pt",
                        color: "#374151",
                        margin: "0 0 0 4mm",
                        padding: 0,
                        listStyleType: "disc",
                      }}
                    >
                      {exp.achievements.map((a, j) => (
                        <li
                          key={j}
                          style={{ marginBottom: "1mm", lineHeight: "1.5" }}
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: "5mm" }}>
              <h2
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "3mm",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #2563eb",
                  paddingBottom: "1mm",
                }}
              >
                Projects
              </h2>
              {data.projects.map((p, i) => (
                <div key={i} style={{ marginBottom: "3mm" }}>
                  <h3
                    style={{
                      fontSize: "9pt",
                      fontWeight: "bold",
                      marginBottom: "0.5mm",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "8.5pt", color: "#374151", margin: 0 }}>
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: "5mm" }}>
              <h2
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "3mm",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #2563eb",
                  paddingBottom: "1mm",
                }}
              >
                Skills
              </h2>
              {data.skills.map((cat, i) => (
                <div key={i} style={{ marginBottom: "3mm" }}>
                  <h4
                    style={{
                      fontSize: "8.5pt",
                      fontWeight: "600",
                      marginBottom: "1.5mm",
                    }}
                  >
                    {cat.category}
                  </h4>
                  <div
                    style={{
                      fontSize: "8pt",
                      color: "#374151",
                      lineHeight: "1.5",
                    }}
                  >
                    {cat.items.map((s) => s.name).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: "5mm" }}>
              <h2
                style={{
                  fontSize: "10pt",
                  fontWeight: "bold",
                  color: "#2563eb",
                  marginBottom: "3mm",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #2563eb",
                  paddingBottom: "1mm",
                }}
              >
                Education
              </h2>
              {data.education.map((e, i) => (
                <div key={i} style={{ marginBottom: "3mm" }}>
                  <div style={{ fontSize: "8.5pt", fontWeight: "600" }}>
                    {e.degree}
                  </div>
                  <div style={{ fontSize: "8pt", color: "#2563eb" }}>
                    {e.institution}
                  </div>
                  <div style={{ fontSize: "8pt", color: "#6b7280" }}>
                    {e.period}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const ResumeTemplates = () => {
  const data = portfolioData;
  const [selected, setSelected] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const handleDownload = async () => {
    const el = refs[selected].current;
    if (!el) {
      alert("Please wait for the template to load");
      return;
    }

    try {
      setIsDownloading(true);
      await downloadResumePDF(
        el,
        `${data.personal.name.replace(/\s+/g, "_")}_Resume.pdf`
      );
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const templates = [
    {
      name: "ATS Optimized",
      description: "Perfect for ATS • Single column • Max parsing",
      color: "from-green-500 to-green-600",
      icon: "🎯",
      component: <TemplateATS rootRef={refs[0]} />,
    },
    {
      name: "Modern Sidebar",
      description: "Professional dark sidebar • Contemporary design",
      color: "from-blue-500 to-blue-600",
      icon: "💼",
      component: <TemplateSidebar rootRef={refs[1]} />,
    },
    {
      name: "Clean Professional",
      description: "Classic two-column • Perfect alignment",
      color: "from-indigo-500 to-indigo-600",
      icon: "📋",
      component: <TemplateClean rootRef={refs[2]} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Resume Builder
              </h1>
              <p className="text-gray-600 text-lg">
                ✅ Perfect Alignment • ✅ ATS Optimized • ✅ Professional Icons
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white rounded-xl flex items-center gap-3 font-semibold shadow-lg transition-all"
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <span className="text-2xl">📥</span>
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selected === i
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="text-4xl mb-3">{template.icon}</div>
                <div className="font-bold mb-2">{template.name}</div>
                <div className="text-sm text-gray-600 mb-3">
                  {template.description}
                </div>
                <div
                  className={`text-xs font-medium ${
                    selected === i ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {selected === i ? "✓ Active" : "Select"}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {templates[selected].icon} {templates[selected].name}
            </h2>
            <p className="text-gray-600">{templates[selected].description}</p>
          </div>

          <div
            className="bg-gray-100 p-4 rounded-xl overflow-auto"
            style={{ maxHeight: "800px" }}
          >
            <div className="flex justify-center">
              {templates[selected].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
