import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import {
  MANUAL_TOOLKIT_SLOTS,
  createDefaultManualWeeklyEmail,
  linkifyEmailHref,
  type ManualWeeklyEmailPayload,
} from "@/lib/weekly-email-manual";

/** Matches admin “Branded weekly email” form (`ManualWeeklyEmailPayload`). */
export type StudentStackNewsletterProps = ManualWeeklyEmailPayload;

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const SLATE900 = "#0f172a";
const SLATE800 = "#1e293b";
const SLATE700 = "#334155";
const SLATE600 = "#475569";
const SLATE500 = "#64748b";
const SLATE400 = "#94a3b8";
const SKY600 = "#0284c7";
const SKY500 = "#0ea5e9";
const SKY100 = "#e0f2fe";
const OUTER_BG = "#f1f5f9";
const CARD = "#ffffff";
const VIOLET_SOFT = "#f5f3ff";
const TEAL_HEAD = "#0f766e";
const TEAL_TITLE = "#134e4a";
const TEAL_BODY = "#115e59";
const VIOLET_LABEL = "#6d28d9";

const LOGO_URL = "https://studentstack.info/logo-transparent.png";

const textBase: React.CSSProperties = {
  margin: 0,
  fontFamily: FONT,
};

const preMultiline: React.CSSProperties = {
  ...textBase,
  whiteSpace: "pre-wrap" as const,
};

export function StudentStackNewsletter(props: StudentStackNewsletterProps) {
  const {
    weekLabel,
    preheader,
    intro,
    toolkit,
    opportunityBoardUrl,
    opportunityBoardButtonText,
    featuredSubject,
    featuredParentLabel,
    featuredQuestion,
    featuredAnswer,
    footnote,
  } = props;

  const sheetHref = linkifyEmailHref(opportunityBoardUrl);
  const btnLabel = opportunityBoardButtonText.trim() || "Open the opportunity board";
  const foot =
    footnote.trim() || createDefaultManualWeeklyEmail().footnote;

  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{weekLabel} — StudentStack</title>
      </Head>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: OUTER_BG,
          WebkitTextSizeAdjust: "100%",
          fontFamily: FONT,
        }}
      >
        <Text
          style={
            {
              ...textBase,
              display: "none",
              maxHeight: 0,
              overflow: "hidden",
              msoHide: "all",
              fontSize: 1,
              lineHeight: 1,
              opacity: 0,
            } as React.CSSProperties
          }
        >
          {preheader}
        </Text>

        <Section
          style={{
            backgroundColor: OUTER_BG,
            padding: "24px 12px",
            fontFamily: FONT,
          }}
        >
          <Container style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Section
              style={{
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid #cbd5e1",
                boxShadow: "0 28px 80px -40px rgba(15,23,42,0.45)",
                backgroundColor: CARD,
              }}
            >
              {/* Hero */}
              <Section
                style={{
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #0c4a6e 55%, #075985 100%)",
                  padding: "26px 28px 22px",
                }}
              >
                <Text
                  style={{
                    ...textBase,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#7dd3fc",
                  }}
                >
                  StudentStack
                </Text>
                <Text
                  style={{
                    ...textBase,
                    marginTop: 10,
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: "#ffffff",
                  }}
                >
                  Weekly parent email
                </Text>
                <Text
                  style={{
                    ...textBase,
                    marginTop: 8,
                    fontSize: 14,
                    color: "#bae6fd",
                    opacity: 0.95,
                  }}
                >
                  {weekLabel}
                </Text>
              </Section>

              <Section style={{ padding: "24px 26px 8px" }}>
                {intro.trim() ? (
                  <Text
                    style={{
                      ...preMultiline,
                      marginBottom: 18,
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: SLATE700,
                    }}
                  >
                    {intro}
                  </Text>
                ) : null}

                {/* AI toolkit card */}
                <Section
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `1px solid ${SKY100}`,
                    marginBottom: 10,
                    boxShadow: "0 14px 36px -24px rgba(14,165,233,0.45)",
                  }}
                >
                  <Section
                    style={{
                      padding: "14px 18px",
                      background:
                        "linear-gradient(135deg, #f0f9ff 0%, #ffffff 48%, #faf5ff 100%)",
                      borderBottom: "1px solid #e0f2fe",
                    }}
                  >
                    <Text
                      style={{
                        ...textBase,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: SKY600,
                      }}
                    >
                      AI toolkit
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 6,
                        fontSize: 15,
                        fontWeight: 700,
                        color: SLATE900,
                      }}
                    >
                      This week&apos;s picks (by category)
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 6,
                        fontSize: 13,
                        lineHeight: 1.45,
                        color: SLATE600,
                      }}
                    >
                      Curated by our team — not auto-generated. One standout tool per lane.
                    </Text>
                  </Section>

                  {MANUAL_TOOLKIT_SLOTS.map((meta, i) => {
                    const slot = toolkit.find((t) => t.id === meta.id)!;
                    const name = slot.toolName.trim() || "— TBD this week —";
                    const blurb = slot.blurb.trim() || "Add a one-line note in admin.";
                    const url = slot.url.trim();
                    const stripe = i % 2 === 0 ? "#f8fafc" : "#ffffff";
                    return (
                      <Section
                        key={meta.id}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          backgroundColor: stripe,
                          padding: 0,
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ borderCollapse: "collapse" as const }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: 4,
                                  backgroundColor: SKY500,
                                }}
                              />
                              <td style={{ padding: "16px 18px 16px 14px" }}>
                                <Text
                                  style={{
                                    ...textBase,
                                    marginBottom: 4,
                                    fontSize: 10,
                                    fontWeight: 800,
                                    letterSpacing: "0.16em",
                                    textTransform: "uppercase",
                                    color: SKY600,
                                  }}
                                >
                                  {meta.label}
                                </Text>
                                <Text
                                  style={{
                                    ...textBase,
                                    marginBottom: 6,
                                    fontSize: 17,
                                    fontWeight: 700,
                                    letterSpacing: "-0.02em",
                                    color: SLATE900,
                                  }}
                                >
                                  {name}
                                </Text>
                                <Text
                                  style={{
                                    ...preMultiline,
                                    marginBottom: 10,
                                    fontSize: 14,
                                    lineHeight: 1.55,
                                    color: SLATE600,
                                  }}
                                >
                                  {blurb}
                                </Text>
                                {url ? (
                                  <Link
                                    href={linkifyEmailHref(url)}
                                    style={{
                                      fontSize: 13,
                                      fontWeight: 700,
                                      color: SKY600,
                                      textDecoration: "underline",
                                      fontFamily: FONT,
                                    }}
                                  >
                                    Open tool
                                  </Link>
                                ) : (
                                  <Text
                                    style={{
                                      ...textBase,
                                      fontSize: 12,
                                      color: SLATE500,
                                      fontStyle: "italic",
                                    }}
                                  >
                                    No link
                                  </Text>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </Section>
                    );
                  })}
                </Section>

                {/* Opportunity board */}
                <Section
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid #ccfbf1",
                    marginBottom: 8,
                    backgroundColor: "#f0fdfa",
                  }}
                >
                  <Section
                    style={{
                      padding: "16px 18px",
                      borderBottom: "1px solid #99f6e4",
                    }}
                  >
                    <Text
                      style={{
                        ...textBase,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: TEAL_HEAD,
                      }}
                    >
                      Opportunity board
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 6,
                        fontSize: 16,
                        fontWeight: 700,
                        color: TEAL_TITLE,
                      }}
                    >
                      Google Sheet · programs &amp; deadlines
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 6,
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: TEAL_BODY,
                      }}
                    >
                      Living spreadsheet you update — parents always get the same link.
                    </Text>

                    <table
                      role="presentation"
                      cellPadding={0}
                      cellSpacing={0}
                      style={{
                        borderCollapse: "collapse" as const,
                        margin: "20px 0 4px 0",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              borderRadius: 14,
                              background:
                                "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                              boxShadow:
                                "0 10px 24px -12px rgba(14,165,233,0.65)",
                            }}
                          >
                            <Link
                              href={sheetHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-block",
                                padding: "15px 28px",
                                fontFamily: FONT,
                                fontSize: 14,
                                fontWeight: 800,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "#ffffff",
                                textDecoration: "none",
                              }}
                            >
                              {btnLabel}
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 10,
                        fontSize: 12,
                        lineHeight: 1.45,
                        color: SLATE500,
                      }}
                    >
                      Same board every week — we tidy rows and deadlines as we learn them.
                      Always double-check dates on the program&apos;s site before your student applies.
                    </Text>
                  </Section>
                </Section>

                {/* Featured Q&A */}
                <Section
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid #e9d5ff",
                    backgroundColor: CARD,
                    boxShadow: "0 16px 40px -28px rgba(109,40,217,0.35)",
                    marginTop: 8,
                  }}
                >
                  <Section
                    style={{
                      padding: "16px 18px",
                      background: `linear-gradient(90deg, ${VIOLET_SOFT} 0%, #fafafa 100%)`,
                      borderBottom: "1px solid #ede9fe",
                    }}
                  >
                    <Text
                      style={{
                        ...textBase,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: VIOLET_LABEL,
                      }}
                    >
                      Featured parent question
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 8,
                        fontSize: 13,
                        fontWeight: 700,
                        color: SLATE900,
                      }}
                    >
                      {featuredSubject.trim() || "This week"}
                    </Text>
                    <Text
                      style={{
                        ...textBase,
                        marginTop: 6,
                        fontSize: 12,
                        color: SLATE500,
                      }}
                    >
                      <span style={{ fontWeight: 700, color: SLATE600 }}>From:</span>{" "}
                      {featuredParentLabel.trim() || "Parent (anonymized)"}
                    </Text>
                  </Section>
                  <Section
                    style={{
                      padding: "18px 20px",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <Text
                      style={{
                        ...preMultiline,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: SLATE700,
                      }}
                    >
                      {featuredQuestion.trim() ||
                        "(Add the parent question in admin.)"}
                    </Text>
                  </Section>
                  <Section
                    style={{
                      padding: "18px 20px",
                      background:
                        "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
                      borderLeft: `4px solid ${SKY500}`,
                    }}
                  >
                    <Text
                      style={{
                        ...textBase,
                        marginBottom: 8,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: SKY600,
                      }}
                    >
                      StudentStack team
                    </Text>
                    <Text
                      style={{
                        ...preMultiline,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: SLATE800,
                      }}
                    >
                      {featuredAnswer.trim() || "(Add your answer in admin.)"}
                    </Text>
                  </Section>
                </Section>

                {/* Footer */}
                <Section style={{ padding: "22px 4px 8px", textAlign: "center" }}>
                  <Img
                    src={LOGO_URL}
                    width={168}
                    alt="StudentStack"
                    style={{
                      margin: "0 auto 10px",
                      maxWidth: "168px",
                      height: "auto",
                    }}
                  />
                  <Text
                    style={{
                      ...textBase,
                      marginTop: 6,
                      fontSize: 12,
                      color: SLATE500,
                    }}
                  >
                    <Link
                      href="mailto:help@studentstack.info"
                      style={{
                        color: SKY600,
                        fontWeight: 600,
                        textDecoration: "none",
                        fontFamily: FONT,
                      }}
                    >
                      help@studentstack.info
                    </Link>
                    <span style={{ color: "#cbd5e1" }}> · </span>
                    <Link
                      href="https://studentstack.info"
                      style={{
                        color: SKY600,
                        fontWeight: 600,
                        textDecoration: "none",
                        fontFamily: FONT,
                      }}
                    >
                      studentstack.info
                    </Link>
                  </Text>
                </Section>
                <Section style={{ padding: "0 12px 22px", textAlign: "center" }}>
                  <Text
                    style={{
                      ...preMultiline,
                      margin: 0,
                      fontSize: 12,
                      lineHeight: 1.55,
                      color: SLATE400,
                    }}
                  >
                    {foot}
                  </Text>
                </Section>
              </Section>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
}
