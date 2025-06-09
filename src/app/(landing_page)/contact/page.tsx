"use client";

import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdSupport, MdBusiness, MdHealthAndSafety } from "react-icons/md";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8 xl:px-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <FaEnvelope className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>{" "}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about MedSpace? We&apos;re here to help. Reach out
              to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>{" "}
      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8 xl:px-16">
          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Get in Touch
            </h2>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactMethods.map((method, index) => (
                <ContactCard key={index} {...method} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Support Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-8 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Can We Help?
            </h2>
            <p className="text-xl text-gray-600">
              Choose the category that best describes your inquiry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <SupportCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const contactMethods = [
  {
    icon: FaEnvelope,
    title: "Email Support",
    content: "support@medspace.com",
    subtitle: "We typically respond within 24 hours"
  },
  {
    icon: FaPhone,
    title: "Phone Support",
    content: "+52 (55) 1234-5678",
    subtitle: "Monday - Friday, 9:00 AM - 6:00 PM"
  },
  {
    icon: FaMapMarkerAlt,
    title: "Office Address",
    content: "Av. Reforma 123, Colonia Centro",
    subtitle: "Mexico City, CDMX 06000, Mexico"
  }
];

const supportCategories = [
  {
    icon: MdHealthAndSafety,
    title: "Medical Professionals",
    description:
      "Get help with booking clinics, managing appointments, and platform features for doctors.",
    contactInfo: "doctors@medspace.com"
  },
  {
    icon: MdBusiness,
    title: "Clinic Owners",
    description:
      "Support for listing your clinic, managing bookings, and maximizing your property's potential.",
    contactInfo: "clinics@medspace.com"
  },
  {
    icon: MdSupport,
    title: "Technical Support",
    description:
      "Experiencing technical issues? Our tech team is here to help resolve any platform problems.",
    contactInfo: "tech@medspace.com"
  }
];

interface ContactCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  subtitle: string;
}

function ContactCard({
  icon: Icon,
  title,
  content,
  subtitle
}: ContactCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="bg-primary-100 p-3 rounded-full">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-primary font-medium">{content}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

interface SupportCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  contactInfo: string;
}

function SupportCard({
  icon: Icon,
  title,
  description,
  contactInfo
}: SupportCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-primary-100 p-3 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-primary font-medium text-sm">{contactInfo}</p>
    </div>
  );
}
