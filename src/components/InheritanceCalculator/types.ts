export type Religion = 'muslim' | 'hindu';
export type DeceasedGender = 'male' | 'female';
export type LandUnit = 'decimal' | 'acre'; // শতক/শতাংশ or একর (1 acre = 100 decimals)

export interface MuslimHeirsInput {
  deceasedGender: DeceasedGender;
  // Spouse
  wivesCount: number; // if deceased is male (1 to 4)
  hasHusband: boolean; // if deceased is female
  // Parents
  hasFather: boolean;
  hasMother: boolean;
  hasPaternalGrandfather: boolean; // দাদা
  hasPaternalGrandmother: boolean; // দাদী
  hasMaternalGrandmother: boolean; // নানী
  // Children
  sonsCount: number;
  daughtersCount: number;
  // Predeceased son's children (1961 MFLO Sec 4)
  orphanedGrandsonsCount: number; // মৃত পুত্রের পুত্র
  orphanedGranddaughtersCount: number; // মৃত পুত্রের কন্যা
  // Siblings
  fullBrothersCount: number; // সহোদর ভাই
  fullSistersCount: number; // সহোদর বোন
  // Paternal Uncle
  paternalUnclesCount: number; // চাচা
}

export interface HinduHeirsInput {
  deceasedGender: DeceasedGender;
  // Tier 1: Sons & Widow
  hasWidow: boolean; // বিধবা স্ত্রী (if male deceased)
  sonsCount: number; // পুত্র
  grandsonsCount: number; // পৌত্র (মৃত পুত্রের পুত্র)
  greatGrandsonsCount: number; // প্রপৌত্র (মৃত পৌত্রের পুত্র)
  // Tier 2: Unmarried daughter
  unmarriedDaughtersCount: number; // অবিবাহিতা কন্যা
  // Tier 3: Married daughter
  marriedDaughtersCount: number; // বিবাহিতা কন্যা
  // Tier 4: Father
  hasFather: boolean; // পিতা
  // Tier 5: Mother
  hasMother: boolean; // মাতা
  // Tier 6: Brother
  brothersCount: number; // সহোদর ভাই
  // Tier 7: Brother's son
  brotherSonsCount: number; // ভাইয়ের পুত্র
  // Tier 8: Sister
  sistersCount: number; // বোন
}

export interface PropertyAssets {
  landAmount: number; // in selected landUnit
  landUnit: LandUnit;
  goldVori: number; // ভরি
  silverVori: number; // ভরি
  cashBDT: number; // টাকা
}

export interface HeirShareResult {
  relation: string; // e.g. "স্ত্রী", "পুত্র", "কন্যা", "মাতা"
  count: number; // কয়জন
  category: string; // e.g. "যাবিল ফুরুজ (কুরআন নির্ধারিত)", "আসাবা (অবশিষ্টভোগী)", "অগ্রাধিকার ক্রম ১"
  shareFraction: string; // e.g. "১/৮", "২/৩", "অবশিষ্ট (২:১)", "১/৩"
  sharePercent: number; // 0 to 100
  perPersonPercent: number; // per individual
  
  // Real values for whole group:
  totalLand: number;
  totalGold: number;
  totalSilver: number;
  totalCash: number;

  // Real values per person:
  perPersonLand: number;
  perPersonGold: number;
  perPersonSilver: number;
  perPersonCash: number;

  explanation: string; // আইনি কারণ/ব্যাখ্যা
}

export interface CalculationOutcome {
  religion: Religion;
  heirResults: HeirShareResult[];
  steps: string[];
  excludedHeirs: string[];
  totalDistributedPercent: number;
  disclaimer: string;
}
