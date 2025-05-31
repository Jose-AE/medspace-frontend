import { ExternalClinic } from "@/types/externalClinicTypes";

// Base coordinates for Mexico City boroughs
const COYOACAN_COORDS = { lat: 19.3444, lng: -99.1626 };
const ALVARO_OBREGON_COORDS = { lat: 19.3556, lng: -99.1944 };
const BENITO_JUAREZ_COORDS = { lat: 19.3907, lng: -99.1757 };
const CUAUHTEMOC_COORDS = { lat: 19.4326, lng: -99.1332 };
const MIGUEL_HIDALGO_COORDS = { lat: 19.415, lng: -99.1886 };

// Helper function to generate random offset within a borough
const getRandomOffset = (base: number, range: number = 0.02) =>
  base + (Math.random() * range * 2 - range);

export const MOCK_EXTERNAL_CLINICS: ExternalClinic[] = [
  // Coyoacán - High concentration area
  {
    id: 1,
    name: "Centro Médico Coyoacán",
    specialty: "Cardiology",
    borough: "Coyoacán",
    lat: getRandomOffset(COYOACAN_COORDS.lat),
    lng: getRandomOffset(COYOACAN_COORDS.lng),
    estimatedSpecialists: 15,
    address: "Av. Universidad 1000, Col. Del Valle, Coyoacán",
    source: "HealthMap"
  },
  {
    id: 2,
    name: "Hospital Ángeles Coyoacán",
    specialty: "Neurology",
    borough: "Coyoacán",
    lat: getRandomOffset(COYOACAN_COORDS.lat),
    lng: getRandomOffset(COYOACAN_COORDS.lng),
    estimatedSpecialists: 12,
    address: "Av. División del Norte 3501, Coyoacán",
    source: "MedicalDirectory"
  },
  {
    id: 3,
    name: "Clínica Coyoacán",
    specialty: "Pediatrics",
    borough: "Coyoacán",
    lat: getRandomOffset(COYOACAN_COORDS.lat),
    lng: getRandomOffset(COYOACAN_COORDS.lng),
    estimatedSpecialists: 8,
    address: "Av. Coyoacán 2000, Coyoacán",
    source: "HealthMap"
  },

  // Álvaro Obregón - Medium concentration area
  {
    id: 4,
    name: "Centro Médico ABC Santa Fe",
    specialty: "Pediatrics",
    borough: "Álvaro Obregón",
    lat: getRandomOffset(ALVARO_OBREGON_COORDS.lat),
    lng: getRandomOffset(ALVARO_OBREGON_COORDS.lng),
    estimatedSpecialists: 10,
    address: "Av. Carlos Graef Fernández 154, Álvaro Obregón",
    source: "HealthMap"
  },
  {
    id: 5,
    name: "Hospital Médica Sur",
    specialty: "Orthopedics",
    borough: "Álvaro Obregón",
    lat: getRandomOffset(ALVARO_OBREGON_COORDS.lat),
    lng: getRandomOffset(ALVARO_OBREGON_COORDS.lng),
    estimatedSpecialists: 7,
    address: "Puente de Piedra 150, Álvaro Obregón",
    source: "MedicalDirectory"
  },

  // Benito Juárez - High concentration area
  {
    id: 6,
    name: "Hospital Ángeles del Pedregal",
    specialty: "Dermatology",
    borough: "Benito Juárez",
    lat: getRandomOffset(BENITO_JUAREZ_COORDS.lat),
    lng: getRandomOffset(BENITO_JUAREZ_COORDS.lng),
    estimatedSpecialists: 9,
    address: "Camino a Santa Teresa 1055, Benito Juárez",
    source: "HealthMap"
  },
  {
    id: 7,
    name: "Centro Médico Nacional 20 de Noviembre",
    specialty: "Cardiology",
    borough: "Benito Juárez",
    lat: getRandomOffset(BENITO_JUAREZ_COORDS.lat),
    lng: getRandomOffset(BENITO_JUAREZ_COORDS.lng),
    estimatedSpecialists: 14,
    address: "Félix Cuevas 540, Benito Juárez",
    source: "MedicalDirectory"
  },
  {
    id: 8,
    name: "Clínica del Sur",
    specialty: "Neurology",
    borough: "Benito Juárez",
    lat: getRandomOffset(BENITO_JUAREZ_COORDS.lat),
    lng: getRandomOffset(BENITO_JUAREZ_COORDS.lng),
    estimatedSpecialists: 6,
    address: "Av. Insurgentes Sur 1602, Benito Juárez",
    source: "HealthMap"
  },

  // Cuauhtémoc - Very high concentration area
  {
    id: 9,
    name: "Hospital General de México",
    specialty: "Neurology",
    borough: "Cuauhtémoc",
    lat: getRandomOffset(CUAUHTEMOC_COORDS.lat),
    lng: getRandomOffset(CUAUHTEMOC_COORDS.lng),
    estimatedSpecialists: 18,
    address: "Dr. Balmis 148, Cuauhtémoc",
    source: "HealthMap"
  },
  {
    id: 10,
    name: "Centro Médico Nacional La Raza",
    specialty: "Pediatrics",
    borough: "Cuauhtémoc",
    lat: getRandomOffset(CUAUHTEMOC_COORDS.lat),
    lng: getRandomOffset(CUAUHTEMOC_COORDS.lng),
    estimatedSpecialists: 15,
    address: "Seris y Zaachila s/n, Cuauhtémoc",
    source: "MedicalDirectory"
  },
  {
    id: 11,
    name: "Hospital Central",
    specialty: "Cardiology",
    borough: "Cuauhtémoc",
    lat: getRandomOffset(CUAUHTEMOC_COORDS.lat),
    lng: getRandomOffset(CUAUHTEMOC_COORDS.lng),
    estimatedSpecialists: 12,
    address: "Av. Cuauhtémoc 330, Cuauhtémoc",
    source: "HealthMap"
  },
  {
    id: 12,
    name: "Clínica Reforma",
    specialty: "Dermatology",
    borough: "Cuauhtémoc",
    lat: getRandomOffset(CUAUHTEMOC_COORDS.lat),
    lng: getRandomOffset(CUAUHTEMOC_COORDS.lng),
    estimatedSpecialists: 8,
    address: "Paseo de la Reforma 180, Cuauhtémoc",
    source: "MedicalDirectory"
  },

  // Miguel Hidalgo - Medium concentration area
  {
    id: 13,
    name: "Hospital ABC Observatorio",
    specialty: "Orthopedics",
    borough: "Miguel Hidalgo",
    lat: getRandomOffset(MIGUEL_HIDALGO_COORDS.lat),
    lng: getRandomOffset(MIGUEL_HIDALGO_COORDS.lng),
    estimatedSpecialists: 9,
    address: "Sur 136 No. 116, Miguel Hidalgo",
    source: "HealthMap"
  },
  {
    id: 14,
    name: "Centro Médico Nacional Siglo XXI",
    specialty: "Dermatology",
    borough: "Miguel Hidalgo",
    lat: getRandomOffset(MIGUEL_HIDALGO_COORDS.lat),
    lng: getRandomOffset(MIGUEL_HIDALGO_COORDS.lng),
    estimatedSpecialists: 11,
    address: "Av. Cuauhtémoc 330, Miguel Hidalgo",
    source: "MedicalDirectory"
  },
  {
    id: 15,
    name: "Clínica Polanco",
    specialty: "Pediatrics",
    borough: "Miguel Hidalgo",
    lat: getRandomOffset(MIGUEL_HIDALGO_COORDS.lat),
    lng: getRandomOffset(MIGUEL_HIDALGO_COORDS.lng),
    estimatedSpecialists: 7,
    address: "Av. Presidente Masaryk 100, Miguel Hidalgo",
    source: "HealthMap"
  }
];
