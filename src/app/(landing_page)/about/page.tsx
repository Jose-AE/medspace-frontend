"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaClinicMedical,
  FaHandshake,
  FaShieldAlt,
  FaClock
} from "react-icons/fa";
import { MdLocationOn, MdSecurity, MdHealthAndSafety } from "react-icons/md";
import { IconType } from "react-icons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto px-8 xl:px-16 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              About <span className="text-primary">MedSpace</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              We&apos;re revolutionizing healthcare accessibility by connecting
              medical professionals with premium clinic spaces across Mexico.
            </p>
            <p className="text-lg text-gray-500 mt-4">
              Our platform makes it simple for doctors to find, book, and manage
              clinic rentals while helping clinic owners maximize their space
              utilization.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/hero.svg"
              alt="About MedSpace"
              width={500}
              height={400}
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-full">
                  <MdHealthAndSafety className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To democratize access to quality healthcare infrastructure by
                creating a seamless marketplace that connects medical
                professionals with state-of-the-art clinic facilities,
                ultimately improving patient care across Mexico.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 p-3 rounded-full">
                  <FaShieldAlt className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 ml-4">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become Mexico&apos;s leading healthcare infrastructure
                platform, enabling every medical professional to access premium
                clinic spaces and every clinic owner to optimize their
                facility&apos;s potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MedSpace?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to find, book, and manage clinic
              spaces with confidence and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-primary py-20">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-primary-100">
              Join thousands of medical professionals who trust MedSpace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}+
                </div>
                <div className="text-xl text-primary-100">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at MedSpace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-50 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-screen-xl mx-auto px-8 xl:px-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join MedSpace today and discover how easy it is to find the perfect
            clinic space for your medical practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-primary hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-lg transition-all text-lg"
            >
              Get Started Today
            </Link>
            <Link
              href="/"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-all text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: FaClinicMedical,
    title: "Premium Clinics",
    description:
      "Access to verified, high-quality clinic spaces with modern medical equipment and facilities."
  },
  {
    icon: MdLocationOn,
    title: "Prime Locations",
    description:
      "Find clinics in strategic locations across major cities in Mexico for maximum accessibility."
  },
  {
    icon: FaClock,
    title: "Flexible Booking",
    description:
      "Book clinic spaces by the day, week, or month with our flexible scheduling system."
  },
  {
    icon: MdSecurity,
    title: "Secure Transactions",
    description:
      "Safe and secure payment processing with full transaction protection and insurance."
  },
  {
    icon: FaHandshake,
    title: "Trusted Network",
    description:
      "Connect with verified clinic owners and medical professionals in our trusted network."
  },
  {
    icon: FaShieldAlt,
    title: "Quality Assurance",
    description:
      "All clinics undergo rigorous verification and quality checks before listing."
  }
];

const stats = [
  {
    name: "Clinics Available",
    number: "120",
    icon: FaClinicMedical
  },
  {
    name: "Cities Covered",
    number: "45",
    icon: MdLocationOn
  },
  {
    name: "Doctors Registered",
    number: "300",
    icon: FaHandshake
  }
];

const values = [
  {
    icon: MdHealthAndSafety,
    title: "Healthcare First",
    description:
      "Every decision we make prioritizes improving healthcare access and quality."
  },
  {
    icon: FaHandshake,
    title: "Trust & Transparency",
    description:
      "We build trust through transparent processes and honest communication."
  },
  {
    icon: FaShieldAlt,
    title: "Security & Safety",
    description:
      "We ensure the highest standards of security and safety for all users."
  },
  {
    icon: FaClock,
    title: "Innovation",
    description:
      "We continuously innovate to provide better solutions for healthcare professionals."
  }
];

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
}
