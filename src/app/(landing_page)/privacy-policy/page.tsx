"use client";

import React from "react";
import Link from "next/link";
import { FaShieldAlt, FaUserShield, FaLock } from "react-icons/fa";
import { MdSecurity, MdPrivacyTip } from "react-icons/md";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-8 xl:px-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <FaShieldAlt className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Your privacy is important to us at MedSpace
            </p>
            <p className="text-sm text-gray-500">Last updated: June 9, 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8 xl:px-16">
          {/* Introduction */}
          <div className="mb-12">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At MedSpace, we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our healthcare clinic booking
                platform.
              </p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 p-6 rounded-lg mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {tableOfContents.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.id}`}
                    className="text-primary hover:text-primary-600 hover:underline"
                  >
                    {index + 1}. {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy Policy Sections */}
          <div className="space-y-12">
            {privacySections.map((section, index) => (
              <PrivacySection key={index} {...section} />
            ))}
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const tableOfContents = [
  { id: "information-collection", title: "Information We Collect" },
  { id: "information-use", title: "How We Use Your Information" },
  { id: "information-sharing", title: "Information Sharing and Disclosure" },
  { id: "data-security", title: "Data Security" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Privacy Rights" },
  { id: "cookies", title: "Cookies and Tracking" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "international-transfers", title: "International Data Transfers" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "policy-changes", title: "Changes to This Policy" }
];

const privacySections = [
  {
    id: "information-collection",
    title: "Information We Collect",
    icon: MdPrivacyTip,
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect personal information that you provide directly to us, including your name, email address, phone number, professional credentials, medical license information, and payment details."
      },
      {
        subtitle: "Profile Information",
        text: "For medical professionals, we collect specialty information, professional bio, profile photos, and verification documents. For clinic owners, we collect property ownership documents and clinic facility details."
      },
      {
        subtitle: "Usage Information",
        text: "We automatically collect information about how you interact with our platform, including booking history, search preferences, and platform usage patterns."
      },
      {
        subtitle: "Device Information",
        text: "We collect device-specific information such as your device type, operating system, browser type, IP address, and mobile device identifiers."
      }
    ]
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    icon: FaUserShield,
    content: [
      {
        subtitle: "Service Provision",
        text: "We use your information to provide, maintain, and improve our clinic booking services, process transactions, and facilitate communication between clinic owners and medical professionals."
      },
      {
        subtitle: "Account Management",
        text: "To create and manage your account, verify your identity and professional credentials, and provide customer support."
      },
      {
        subtitle: "Communication",
        text: "To send you important updates about your bookings, account notifications, and relevant platform announcements."
      },
      {
        subtitle: "Platform Improvement",
        text: "To analyze usage patterns, improve our services, develop new features, and ensure platform security and integrity."
      }
    ]
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    icon: FaLock,
    content: [
      {
        subtitle: "Between Users",
        text: "We share necessary information between clinic owners and medical professionals to facilitate bookings, including contact details and professional credentials."
      },
      {
        subtitle: "Service Providers",
        text: "We may share information with trusted third-party service providers who assist us in operating our platform, processing payments, and providing customer support."
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety."
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
      }
    ]
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: MdSecurity,
    content: [
      {
        subtitle: "Security Measures",
        text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information."
      },
      {
        subtitle: "Access Controls",
        text: "We limit access to personal information to authorized personnel only and require strong authentication for all system access."
      },
      {
        subtitle: "Data Protection",
        text: "All sensitive data is encrypted both in transit and at rest using advanced encryption protocols to ensure maximum protection."
      }
    ]
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: FaShieldAlt,
    content: [
      {
        subtitle: "Retention Period",
        text: "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, and resolve disputes."
      },
      {
        subtitle: "Account Deletion",
        text: "When you delete your account, we will remove your personal information within 30 days, except where retention is required by law."
      }
    ]
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    icon: FaUserShield,
    content: [
      {
        subtitle: "Access and Correction",
        text: "You have the right to access, update, or correct your personal information at any time through your account settings."
      },
      {
        subtitle: "Data Portability",
        text: "You can request a copy of your personal data in a structured, machine-readable format."
      },
      {
        subtitle: "Deletion Rights",
        text: "You can request deletion of your personal information, subject to certain legal limitations."
      },
      {
        subtitle: "Opt-Out Rights",
        text: "You can opt out of non-essential communications and certain data processing activities."
      }
    ]
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    icon: MdPrivacyTip,
    content: [
      {
        subtitle: "Cookie Usage",
        text: "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage."
      },
      {
        subtitle: "Cookie Control",
        text: "You can control cookie settings through your browser preferences, though some features may not function properly if cookies are disabled."
      }
    ]
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    icon: FaLock,
    content: [
      {
        subtitle: "Integration Partners",
        text: "Our platform integrates with third-party services for payments, maps, and communication. These services have their own privacy policies."
      },
      {
        subtitle: "External Links",
        text: "Our platform may contain links to external websites. We are not responsible for the privacy practices of these external sites."
      }
    ]
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    icon: MdSecurity,
    content: [
      {
        subtitle: "Data Location",
        text: "Your information may be transferred to and processed in countries other than Mexico. We ensure appropriate safeguards are in place for international transfers."
      }
    ]
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    icon: FaShieldAlt,
    content: [
      {
        subtitle: "Age Restrictions",
        text: "Our platform is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children."
      }
    ]
  },
  {
    id: "policy-changes",
    title: "Changes to This Policy",
    icon: MdPrivacyTip,
    content: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy periodically. We will notify you of significant changes through email or platform notifications."
      },
      {
        subtitle: "Continued Use",
        text: "Your continued use of our platform after policy changes constitutes acceptance of the updated terms."
      }
    ]
  }
];

interface PrivacySectionProps {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: Array<{
    subtitle: string;
    text: string;
  }>;
}

function PrivacySection({
  id,
  title,
  icon: Icon,
  content
}: PrivacySectionProps) {
  return (
    <div id={id} className="scroll-mt-20">
      <div className="flex items-center mb-6">
        <div className="bg-primary-100 p-3 rounded-full mr-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="space-y-6">
        {content.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {item.subtitle}
            </h3>
            <p className="text-gray-700 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
