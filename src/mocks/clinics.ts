import { Clinic } from "@/types/clinicTypes";

export const MOCK_CLINICS: Clinic[] = [
  {
    id: 1,
    displayName: "Sunrise General Clinic",
    category: "GENERAL_PURPOSE",
    description: "A full-service general clinic with modern amenities.",
    pricePerDay: 120,
    maxStayDays: 14,
    availableFromDate: new Date("2025-06-01"),
    availableToDate: new Date("2025-12-31"),
    addressStreet: "123 Health Ave",
    addressCity: "Springfield",
    addressState: "IL",
    addressZip: "62701",
    addressCountry: "USA",
    addressLongitude: "-89.6500",
    addressLatitude: "39.7833",
    landLordId: 101,
    averageRating: 4.5,
    photos: [
      {
        id: 1,
        clinicId: 1,
        path: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
        isPrimary: true
      },
      {
        id: 2,
        clinicId: 1,
        path: "https://images.unsplash.com/photo-1629909613654-28e377c37b09",
        isPrimary: false
      },
      {
        id: 3,
        clinicId: 1,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: false
      },
      {
        id: 4,
        clinicId: 1,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: false
      }
    ],
    equipments: [
      { id: 1, clinicId: 1, quantity: 2, type: "X_RAY" },
      { id: 2, clinicId: 1, quantity: 1, type: "LABORATORY" },
      { id: 3, clinicId: 1, quantity: 1, type: "PHARMACY" },
      { id: 4, clinicId: 1, quantity: 1, type: "SURGICAL_THEATER" },
      { id: 5, clinicId: 1, quantity: 1, type: "REHABILITATION" },
      { id: 6, clinicId: 1, quantity: 1, type: "CT_SCAN" },
      { id: 7, clinicId: 1, quantity: 1, type: "MRI" },
      { id: 8, clinicId: 1, quantity: 1, type: "ULTRASOUND" }
    ],
    availabilities: [
      {
        id: 1,
        clinicId: 1,
        startTime: "08:00",
        endTime: "18:00",
        weekDay: "MONDAY"
      },
      {
        id: 2,
        clinicId: 1,
        startTime: "08:00",
        endTime: "18:00",
        weekDay: "TUESDAY"
      }
    ]
  },
  {
    id: 2,
    displayName: "Bright Smiles Dental",
    category: "DENTIST",
    description: "State-of-the-art dental care for all ages.",
    pricePerDay: 150,
    maxStayDays: 7,
    availableFromDate: new Date("2025-05-15"),
    availableToDate: new Date("2025-10-01"),
    addressStreet: "456 Smile Rd",
    addressCity: "Rivertown",
    addressState: "CA",
    addressZip: "90210",
    addressCountry: "USA",
    addressLongitude: "-118.4000",
    addressLatitude: "34.0736",
    landLordId: 102,
    averageRating: 4.8,
    photos: [
      {
        id: 3,
        clinicId: 2,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: true
      }
    ],
    equipments: [
      { id: 3, clinicId: 2, quantity: 3, type: "X_RAY" },
      { id: 4, clinicId: 2, quantity: 1, type: "PHARMACY" }
    ],
    availabilities: [
      {
        id: 3,
        clinicId: 2,
        startTime: "09:00",
        endTime: "17:00",
        weekDay: "WEDNESDAY"
      },
      {
        id: 4,
        clinicId: 2,
        startTime: "09:00",
        endTime: "17:00",
        weekDay: "THURSDAY"
      }
    ]
  },
  {
    id: 3,
    displayName: "Little Steps Pediatrics",
    category: "PEDIATRIC",
    description: "Specialized care for infants and children.",
    pricePerDay: 180,
    maxStayDays: 10,
    availableFromDate: new Date("2025-07-01"),
    availableToDate: new Date("2025-12-01"),
    addressStreet: "789 Kids Blvd",
    addressCity: "Lakeview",
    addressState: "TX",
    addressZip: "73301",
    addressCountry: "USA",
    addressLongitude: "-97.7431",
    addressLatitude: "30.2672",
    landLordId: 103,
    averageRating: 4.7,
    photos: [
      {
        id: 5,
        clinicId: 3,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: true
      }
    ],
    equipments: [
      { id: 5, clinicId: 3, quantity: 1, type: "ULTRASOUND" },
      { id: 6, clinicId: 3, quantity: 1, type: "LABORATORY" }
    ],
    availabilities: [
      {
        id: 5,
        clinicId: 3,
        startTime: "10:00",
        endTime: "16:00",
        weekDay: "FRIDAY"
      },
      {
        id: 6,
        clinicId: 3,
        startTime: "10:00",
        endTime: "14:00",
        weekDay: "SATURDAY"
      }
    ]
  },
  {
    id: 4,
    displayName: "MindCare Center",
    category: "PSYCHOLOGICAL",
    description: "Mental health services in a supportive environment.",
    pricePerDay: 200,
    maxStayDays: 30,
    availableFromDate: new Date("2025-04-01"),
    availableToDate: new Date("2025-12-31"),
    addressStreet: "321 Wellness Way",
    addressCity: "Newport",
    addressState: "OR",
    addressZip: "97365",
    addressCountry: "USA",
    addressLongitude: "-124.0649",
    addressLatitude: "44.6365",
    landLordId: 104,
    averageRating: 4.9,
    photos: [
      {
        id: 7,
        clinicId: 4,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: true
      }
    ],
    equipments: [{ id: 7, clinicId: 4, quantity: 1, type: "REHABILITATION" }],
    availabilities: [
      {
        id: 7,
        clinicId: 4,
        startTime: "08:00",
        endTime: "20:00",
        weekDay: "MONDAY"
      },
      {
        id: 8,
        clinicId: 4,
        startTime: "08:00",
        endTime: "20:00",
        weekDay: "TUESDAY"
      }
    ]
  },
  {
    id: 5,
    displayName: "Precision Dermatology Clinic",
    category: "DERMATOLOGICAL",
    description: "Expert skin care treatments and diagnostics.",
    pricePerDay: 160,
    maxStayDays: 5,
    availableFromDate: new Date("2025-08-01"),
    availableToDate: new Date("2025-11-30"),
    addressStreet: "159 SkinCare St",
    addressCity: "Phoenix",
    addressState: "AZ",
    addressZip: "85001",
    addressCountry: "USA",
    addressLongitude: "-112.0740",
    addressLatitude: "33.4484",
    landLordId: 105,
    averageRating: 4.6,
    photos: [
      {
        id: 9,
        clinicId: 5,
        path: "https://i.imgur.com/9ZrfnTS.png",
        isPrimary: true
      }
    ],
    equipments: [{ id: 8, clinicId: 5, quantity: 2, type: "LABORATORY" }],
    availabilities: [
      {
        id: 9,
        clinicId: 5,
        startTime: "11:00",
        endTime: "16:00",
        weekDay: "WEDNESDAY"
      },
      {
        id: 10,
        clinicId: 5,
        startTime: "11:00",
        endTime: "16:00",
        weekDay: "FRIDAY"
      }
    ]
  }
];
