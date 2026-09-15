import {
  MuslimHeirsInput,
  PropertyAssets,
  HeirShareResult,
  CalculationOutcome,
} from './types';

// Helper to convert English digits to Bengali numerals
export function toBengaliNumerals(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

// Format decimals into Bengali representation
export function formatDecimalBn(val: number, maxDecimals: number = 3): string {
  if (isNaN(val) || val === null || val === undefined) return '০';
  const rounded = parseFloat(val.toFixed(maxDecimals));
  return toBengaliNumerals(rounded);
}

// Convert any land unit (decimal, acre, katha, bigha) into decimal (শতক)
export function convertLandToDecimal(
  amount: number,
  unit: 'decimal' | 'acre' | 'katha' | 'bigha'
): number {
  if (!amount || isNaN(amount) || amount <= 0) return 0;
  switch (unit) {
    case 'acre':
      return amount * 100; // ১ একর = ১০০ শতক
    case 'bigha':
      return amount * 33; // ১ বিঘা = ৩৩ শতক
    case 'katha':
      return amount * 1.65; // ১ কাঠা = ১.৬৫ শতক
    case 'decimal':
    default:
      return amount;
  }
}

interface RawShareItem {
  relation: string;
  count: number;
  category: string;
  fractionLabel: string;
  shareRatio: number;
  explanation: string;
  isAsaba?: boolean;
  isSpouse?: boolean;
}

/**
 * Muslim Faraez Inheritance Calculator Engine
 * Modeled strictly after the official Bangladesh Government Portal (uttoradhikar.gov.bd)
 * Complying with:
 * 1. The Holy Quran (Surah An-Nisa: 11, 12, 176)
 * 2. Hanafi Islamic Jurisprudence (Al-Sirajiyyah)
 * 3. Muslim Family Laws Ordinance 1961, Section 4 (Orphaned Grandchildren representation)
 */
export function calculateMuslimInheritance(
  input: MuslimHeirsInput,
  assets: PropertyAssets
): CalculationOutcome {
  const steps: string[] = [];
  const excludedHeirs: string[] = [];
  const rawShares: RawShareItem[] = [];

  // 1. Descendants check
  const livingSons = Math.max(0, input.sonsCount || 0);
  const livingDaughters = Math.max(0, input.daughtersCount || 0);

  // Predeceased children's offspring (1961 Ordinance Sec 4)
  const orphanedGrandsons = Math.max(0, input.orphanedGrandsonsCount || 0);
  const orphanedGranddaughters = Math.max(0, input.orphanedGranddaughtersCount || 0);
  const orphanedMaternalGrandsons = Math.max(0, input.orphanedMaternalGrandsonsCount || 0);
  const orphanedMaternalGranddaughters = Math.max(0, input.orphanedMaternalGranddaughtersCount || 0);

  const totalDescendantCount =
    livingSons +
    livingDaughters +
    orphanedGrandsons +
    orphanedGranddaughters +
    orphanedMaternalGrandsons +
    orphanedMaternalGranddaughters;

  const hasDescendants = totalDescendantCount > 0;

  // Siblings count
  const fullBrothers = Math.max(0, input.fullBrothersCount || 0);
  const fullSisters = Math.max(0, input.fullSistersCount || 0);
  const consanguineBrothers = Math.max(0, input.consanguineBrothersCount || 0);
  const consanguineSisters = Math.max(0, input.consanguineSistersCount || 0);
  const uterineBrothers = Math.max(0, input.uterineBrothersCount || 0);
  const uterineSisters = Math.max(0, input.uterineSistersCount || 0);

  const totalSiblings =
    fullBrothers +
    fullSisters +
    consanguineBrothers +
    consanguineSisters +
    uterineBrothers +
    uterineSisters;

  // -------------------------------------------------------------
  // STEP 1: SPOUSE (স্বামী / স্ত্রী)
  // -------------------------------------------------------------
  if (input.deceasedGender === 'male') {
    const wives = Math.min(Math.max(input.wivesCount || 0, 0), 4);
    if (wives > 0) {
      const share = hasDescendants ? 1 / 8 : 1 / 4;
      const fractionLabel = hasDescendants ? '১/৮' : '১/৪';
      steps.push(
        hasDescendants
          ? `মৃত ব্যক্তির সন্তান/নাতি-নাতনি থাকায় স্ত্রী/স্ত্রীগণ সম্মিলিতভাবে ১/৮ অংশ (${fractionLabel}) পাবেন (সূরা আন-নিসা: ১২)।`
          : `মৃত ব্যক্তির কোনো সন্তান বা বংশধর না থাকায় স্ত্রী/স্ত্রীগণ সম্মিলিতভাবে ১/৪ অংশ (${fractionLabel}) পাবেন (সূরা আন-নিসা: ১২)।`
      );
      rawShares.push({
        relation: wives > 1 ? `স্ত্রী (${toBengaliNumerals(wives)} জন)` : 'স্ত্রী',
        count: wives,
        category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত)',
        fractionLabel,
        shareRatio: share,
        explanation: hasDescendants
          ? 'সন্তান বা বংশধর থাকায় স্ত্রী ১/৮ অংশ পান (সূরা আন-নিসা: ১২)। একাধিক স্ত্রী থাকলে সমহারে ভাগ হবে।'
          : 'সন্তান না থাকায় স্ত্রী ১/৪ অংশ পান (সূরা আন-নিসা: ১২)। একাধিক স্ত্রী থাকলে সমহারে ভাগ হবে।',
        isSpouse: true,
      });
    }
  } else {
    if (input.hasHusband) {
      const share = hasDescendants ? 1 / 4 : 1 / 2;
      const fractionLabel = hasDescendants ? '১/৪' : '১/২';
      steps.push(
        hasDescendants
          ? `মৃত ব্যক্তির সন্তান বা বংশধর থাকায় স্বামী পাবেন ১/৪ অংশ (${fractionLabel}) (সূরা আন-নিসা: ১২)।`
          : `মৃত ব্যক্তির কোনো সন্তান বা বংশধর না থাকায় স্বামী পাবেন ১/২ অংশ (${fractionLabel}) (সূরা আন-নিসা: ১২)।`
      );
      rawShares.push({
        relation: 'স্বামী',
        count: 1,
        category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত)',
        fractionLabel,
        shareRatio: share,
        explanation: hasDescendants
          ? 'সন্তান বা বংশধর থাকায় স্বামী ১/৪ অংশ পান (সূরা আন-নিসা: ১২)।'
          : 'সন্তান না থাকায় স্বামী ১/২ অংশ পান (সূরা আন-নিসা: ১২)।',
        isSpouse: true,
      });
    }
  }

  // -------------------------------------------------------------
  // STEP 2: MOTHER (মাতা)
  // -------------------------------------------------------------
  if (input.hasMother) {
    let motherShare = 1 / 6;
    let motherFraction = '১/৬';
    let motherExpl = '';

    if (hasDescendants || totalSiblings >= 2) {
      motherShare = 1 / 6;
      motherFraction = '১/৬';
      motherExpl = hasDescendants
        ? 'মৃত ব্যক্তির সন্তান বা বংশধর থাকায় মাতা নির্ধারিত ১/৬ অংশ পান (সূরা আন-নিসা: ১১)।'
        : 'দুই বা ততোধিক ভাই-বোন থাকায় মাতা ১/৬ অংশ পান (সূরা আন-নিসা: ১১)।';
      steps.push(`মাতা হিসেবে নির্ধারিত অংশ: ১/৬ (${motherExpl})।`);
    } else {
      // Check Umariyyatan special case: Spouse + Father + Mother only (no descendants and < 2 siblings)
      const spouseExists =
        (input.deceasedGender === 'male' && input.wivesCount > 0) ||
        (input.deceasedGender === 'female' && input.hasHusband);

      if (spouseExists && input.hasFather && !hasDescendants && totalSiblings < 2) {
        const spouseShare = input.deceasedGender === 'male' ? 1 / 4 : 1 / 2;
        motherShare = (1 - spouseShare) * (1 / 3);
        motherFraction = 'অবশিষ্টের ১/৩';
        motherExpl =
          'উমারিয়্যাতান মাসআলা (হযরত উমর রা. এর সিদ্ধান্ত): স্বামী/স্ত্রীকে দেওয়ার পর অবশিষ্ট সম্পত্তির ১/৩ অংশ মাতা পান।';
        steps.push(
          `উমারিয়্যাতান নিয়মানুযায়ী স্বামী/স্ত্রীর অংশের পর অবশিষ্টের ১/৩ অংশ মাতা পাবেন।`
        );
      } else {
        motherShare = 1 / 3;
        motherFraction = '১/৩';
        motherExpl =
          'সন্তান বা একাধিক ভাই-বোন না থাকায় মাতা নির্ধারিত ১/৩ অংশ পান (সূরা আন-নিসা: ১১)।';
        steps.push(`সন্তান ও একাধিক ভাই-বোন না থাকায় মাতা ১/৩ অংশ পাবেন।`);
      }
    }

    rawShares.push({
      relation: 'মাতা',
      count: 1,
      category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত)',
      fractionLabel: motherFraction,
      shareRatio: motherShare,
      explanation: motherExpl,
    });
  }

  // -------------------------------------------------------------
  // STEP 3: FATHER (পিতা)
  // -------------------------------------------------------------
  let fatherTakesResidualAsAsaba = false;
  const hasMaleDescendant = livingSons > 0 || orphanedGrandsons > 0 || orphanedMaternalGrandsons > 0;
  const hasOnlyFemaleDescendant =
    !hasMaleDescendant &&
    (livingDaughters > 0 || orphanedGranddaughters > 0 || orphanedMaternalGranddaughters > 0);

  if (input.hasFather) {
    if (hasMaleDescendant) {
      steps.push('পুত্র বা পুং বংশধর বর্তমান থাকায় পিতা নির্ধারিত ১/৬ অংশ পাবেন।');
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '১/৬',
        shareRatio: 1 / 6,
        explanation: 'পুত্র বা নাতি থাকায় পিতা যাবিল ফুরুজ হিসেবে ১/৬ অংশ পান (সূরা আন-নিসা: ১১)।',
      });
    } else if (hasOnlyFemaleDescendant) {
      steps.push(
        'শুধু কন্যা/স্ত্রীলিঙ্গ বংশধর থাকায় পিতা প্রথমে যাবিল ফুরুজ হিসেবে ১/৬ এবং অন্যান্য ফুরুজের পর অবশিষ্ট সম্পত্তি আসাবা হিসেবে পাবেন।'
      );
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'যাবিল ফুরুজ ও আসাবা',
        fractionLabel: '১/৬ + অবশিষ্ট',
        shareRatio: 1 / 6,
        explanation: 'পুত্র না থাকায় শুধু কন্যাদের ক্ষেত্রে পিতা ১/৬ এর পাশাপাশি আসাবা হিসেবেও অংশ পান।',
      });
      fatherTakesResidualAsAsaba = true;
    } else {
      steps.push(
        'কোনো সন্তান বা বংশধর না থাকায় পিতা আসাবা (অবশিষ্টভোগী) হিসেবে যাবিল ফুরুজদের পর সমুদয় অবশিষ্ট সম্পত্তি পাবেন।'
      );
      fatherTakesResidualAsAsaba = true;
    }
  }

  // -------------------------------------------------------------
  // STEP 4: GRANDPARENTS (দাদা, দাদী, নানী)
  // -------------------------------------------------------------
  let grandfatherTakesResidualAsAsaba = false;
  if (input.hasPaternalGrandfather) {
    if (input.hasFather) {
      excludedHeirs.push('দাদা (পিতা জীবিত থাকায় মাহজুব/বঞ্চিত)');
    } else {
      // Grandfather stands in place of Father
      if (hasMaleDescendant) {
        steps.push('পিতার অনুপস্থিতিতে দাদা নির্ধারিত ১/৬ অংশ পাবেন।');
        rawShares.push({
          relation: 'দাদা (পিতার পিতা)',
          count: 1,
          category: 'যাবিল ফুরুজ',
          fractionLabel: '১/৬',
          shareRatio: 1 / 6,
          explanation: 'পিতার অবর্তমানে পুত্র বা পুং বংশধর থাকায় দাদা ১/৬ অংশ পান।',
        });
      } else if (hasOnlyFemaleDescendant) {
        steps.push('পিতার অনুপস্থিতিতে কন্যাদের সাথে দাদা ১/৬ + আসাবা হিসেবে অংশ পাবেন।');
        rawShares.push({
          relation: 'দাদা (পিতার পিতা)',
          count: 1,
          category: 'যাবিল ফুরুজ ও আসাবা',
          fractionLabel: '১/৬ + অবশিষ্ট',
          shareRatio: 1 / 6,
          explanation: 'পিতার অবর্তমানে কন্যাদের উপস্থিতিতে দাদা ১/৬ এবং অবশিষ্টের হকদার হন।',
        });
        grandfatherTakesResidualAsAsaba = true;
      } else {
        steps.push('পিতার অনুপস্থিতিতে সন্তানহীন অবস্থায় দাদা আসাবা হিসেবে অবশিষ্ট পাবেন।');
        grandfatherTakesResidualAsAsaba = true;
      }
    }
  }

  // Grandmothers (দাদী ও নানী)
  const dadiEligible = input.hasPaternalGrandmother && !input.hasMother && !input.hasFather;
  const naniEligible = input.hasMaternalGrandmother && !input.hasMother;

  if (input.hasPaternalGrandmother && !dadiEligible) {
    if (input.hasMother) {
      excludedHeirs.push('দাদী (মাতা জীবিত থাকায় বঞ্চিত)');
    } else if (input.hasFather) {
      excludedHeirs.push('দাদী (পিতা জীবিত থাকায় বঞ্চিত)');
    }
  }

  if (input.hasMaternalGrandmother && !naniEligible) {
    excludedHeirs.push('নানী (মাতা জীবিত থাকায় বঞ্চিত)');
  }

  if (dadiEligible && naniEligible) {
    steps.push('দাদী ও নানী উভয়ে উপস্থিত থাকায় এবং মাতা-পিতা না থাকায় ১/৬ অংশ দুজনে সমহারে পাবেন (প্রতিজন ১/১২)।');
    rawShares.push({
      relation: 'দাদী ও নানী (উভয়ে সমহারে)',
      count: 2,
      category: 'যাবিল ফুরুজ',
      fractionLabel: '১/৬ (উভয়ে)',
      shareRatio: 1 / 6,
      explanation: 'মাতা ও পিতা না থাকায় দাদী ও নানী ১/৬ অংশ সমানভাবে ভাগ করে নেন।',
    });
  } else if (dadiEligible) {
    steps.push('মাতা ও পিতা না থাকায় দাদী নির্ধারিত ১/৬ অংশ পাবেন।');
    rawShares.push({
      relation: 'দাদী (পিতার মাতা)',
      count: 1,
      category: 'যাবিল ফুরুজ',
      fractionLabel: '১/৬',
      shareRatio: 1 / 6,
      explanation: 'মাতা ও পিতা অনুপস্থিত থাকায় দাদী ১/৬ অংশ পান।',
    });
  } else if (naniEligible) {
    steps.push('মাতা না থাকায় নানী নির্ধারিত ১/৬ অংশ পাবেন।');
    rawShares.push({
      relation: 'নানী (মাতার মাতা)',
      count: 1,
      category: 'যাবিল ফুরুজ',
      fractionLabel: '১/৬',
      shareRatio: 1 / 6,
      explanation: 'মাতা অনুপস্থিত থাকায় নানী ১/৬ অংশ পান।',
    });
  }

  // -------------------------------------------------------------
  // STEP 5: SIBLINGS & UNCLE EXCLUSIONS BY MALE DESCENDANTS OR FATHER
  // -------------------------------------------------------------
  const maleAscendantOrDescendantExists =
    livingSons > 0 || orphanedGrandsons > 0 || input.hasFather || (!input.hasFather && input.hasPaternalGrandfather);

  if (maleAscendantOrDescendantExists) {
    if (fullBrothers > 0)
      excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(fullBrothers)} জন - পুত্র/পিতা থাকায় বঞ্চিত)`);
    if (fullSisters > 0)
      excludedHeirs.push(`সহোদর বোন (${toBengaliNumerals(fullSisters)} জন - পুত্র/পিতা থাকায় বঞ্চিত)`);
    if (consanguineBrothers > 0)
      excludedHeirs.push(`বৈমাত্রেয় ভাই (${toBengaliNumerals(consanguineBrothers)} জন - বঞ্চিত)`);
    if (consanguineSisters > 0)
      excludedHeirs.push(`বৈমাত্রেয় বোন (${toBengaliNumerals(consanguineSisters)} জন - বঞ্চিত)`);
    if (uterineBrothers > 0)
      excludedHeirs.push(`বৈপিত্রেয় ভাই (${toBengaliNumerals(uterineBrothers)} জন - বংশধর/পিতা থাকায় বঞ্চিত)`);
    if (uterineSisters > 0)
      excludedHeirs.push(`বৈপিত্রেয় বোন (${toBengaliNumerals(uterineSisters)} জন - বংশধর/পিতা থাকায় বঞ্চিত)`);
    if (input.fullNephewsCount > 0)
      excludedHeirs.push(`ভাতিজা (${toBengaliNumerals(input.fullNephewsCount)} জন - উচ্চতর ওয়ারিশ থাকায় বঞ্চিত)`);
    if (input.paternalUnclesCount > 0)
      excludedHeirs.push(`চাচা (${toBengaliNumerals(input.paternalUnclesCount)} জন - উচ্চতর ওয়ারিশ থাকায় বঞ্চিত)`);
  }

  // -------------------------------------------------------------
  // STEP 6: DESCENDANTS ASABA & DAUGHTERS DISTRIBUTION
  // -------------------------------------------------------------
  // Sum up fixed shares allocated so far
  const fixedSharesSum = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);
  let remainingAfterFixed = Math.max(0, 1 - fixedSharesSum);

  // Check children & predeceased grandchildren representation (1961 MFLO Section 4)
  const hasPredeceasedSonBranch = orphanedGrandsons > 0 || orphanedGranddaughters > 0;
  const hasPredeceasedDaughterBranch = orphanedMaternalGrandsons > 0 || orphanedMaternalGranddaughters > 0;

  if (hasDescendants) {
    // If there are living sons OR orphaned grandsons (male lines)
    if (livingSons > 0 || orphanedGrandsons > 0 || orphanedMaternalGrandsons > 0) {
      // Calculate units under Section 4 of 1961 Ordinance:
      // Living son = 2 shares, living daughter = 1 share
      // Predeceased son branch = 2 shares (allocated to his children in 2:1 ratio)
      // Predeceased daughter branch = 1 share (allocated to her children in 2:1 ratio)
      const livingSonWeight = livingSons * 2;
      const livingDaughterWeight = livingDaughters * 1;
      const predeceasedSonWeight = hasPredeceasedSonBranch ? 2 : 0;
      const predeceasedDaughterWeight = hasPredeceasedDaughterBranch ? 1 : 0;

      const totalBranchUnits =
        livingSonWeight + livingDaughterWeight + predeceasedSonWeight + predeceasedDaughterWeight;

      if (totalBranchUnits > 0) {
        // Living sons
        if (livingSons > 0) {
          const sonsRatio = remainingAfterFixed * (livingSonWeight / totalBranchUnits);
          rawShares.push({
            relation: `পুত্র (${toBengaliNumerals(livingSons)} জন)`,
            count: livingSons,
            category: 'আসাবা বিল গাইর (অবশিষ্টভোগী)',
            fractionLabel: `অবশিষ্টের ${toBengaliNumerals(((livingSonWeight / totalBranchUnits) * 100).toFixed(1))}%`,
            shareRatio: sonsRatio,
            explanation:
              'পুত্র ও কন্যা একত্রে অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পান (কুরআন সূরা আন-নিসা: ১১)।',
            isAsaba: true,
          });
        }

        // Living daughters
        if (livingDaughters > 0) {
          const daughtersRatio = remainingAfterFixed * (livingDaughterWeight / totalBranchUnits);
          rawShares.push({
            relation: `কন্যা (${toBengaliNumerals(livingDaughters)} জন)`,
            count: livingDaughters,
            category: 'আসাবা বিল গাইর (অবশিষ্টভোগী)',
            fractionLabel: `অবশিষ্টের ${toBengaliNumerals(((livingDaughterWeight / totalBranchUnits) * 100).toFixed(1))}%`,
            shareRatio: daughtersRatio,
            explanation:
              'পুত্রদের সাথে কন্যাগণ আসাবা বিল গাইর হয়ে অবশিষ্ট সম্পত্তি পান (সূরা আন-নিসা: ১১)।',
            isAsaba: true,
          });
        }

        // Predeceased son's children (1961 Law Sec 4)
        if (hasPredeceasedSonBranch) {
          const sonBranchRatio = remainingAfterFixed * (predeceasedSonWeight / totalBranchUnits);
          const gsUnits = orphanedGrandsons * 2;
          const gdUnits = orphanedGranddaughters * 1;
          const totalChildUnits = gsUnits + gdUnits;

          if (orphanedGrandsons > 0) {
            const gsRatio = sonBranchRatio * (gsUnits / totalChildUnits);
            rawShares.push({
              relation: `পৌত্র - মৃত পুত্রের ছেলে (${toBengaliNumerals(orphanedGrandsons)} জন)`,
              count: orphanedGrandsons,
              category: 'প্রতিনিধিত্বমূলক ওয়ারিশ (১৯৬১ অধ্যাদেশ ৪ ধারা)',
              fractionLabel: `পিতার প্রাপ্যের ${toBengaliNumerals(((gsUnits / totalChildUnits) * 100).toFixed(1))}%`,
              shareRatio: gsRatio,
              explanation:
                '১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা অনুযায়ী মৃত পুত্রের অংশীদার হিসেবে তার সন্তান পৌত্র অংশ পান।',
              isAsaba: true,
            });
          }

          if (orphanedGranddaughters > 0) {
            const gdRatio = sonBranchRatio * (gdUnits / totalChildUnits);
            rawShares.push({
              relation: `পৌত্রী - মৃত পুত্রের মেয়ে (${toBengaliNumerals(orphanedGranddaughters)} জন)`,
              count: orphanedGranddaughters,
              category: 'প্রতিনিধিত্বমূলক ওয়ারিশ (১৯৬১ অধ্যাদেশ ৪ ধারা)',
              fractionLabel: `পিতার প্রাপ্যের ${toBengaliNumerals(((gdUnits / totalChildUnits) * 100).toFixed(1))}%`,
              shareRatio: gdRatio,
              explanation:
                '১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা অনুযায়ী মৃত পুত্রের সন্তান পৌত্রী অংশ পান।',
              isAsaba: true,
            });
          }
        }

        // Predeceased daughter's children (1961 Law Sec 4)
        if (hasPredeceasedDaughterBranch) {
          const daughterBranchRatio =
            remainingAfterFixed * (predeceasedDaughterWeight / totalBranchUnits);
          const mgsUnits = orphanedMaternalGrandsons * 2;
          const mgdUnits = orphanedMaternalGranddaughters * 1;
          const totalMChildUnits = mgsUnits + mgdUnits;

          if (orphanedMaternalGrandsons > 0) {
            const mgsRatio = daughterBranchRatio * (mgsUnits / totalMChildUnits);
            rawShares.push({
              relation: `দৌহিত্র - মৃত কন্যার ছেলে (${toBengaliNumerals(orphanedMaternalGrandsons)} জন)`,
              count: orphanedMaternalGrandsons,
              category: 'প্রতিনিধিত্বমূলক ওয়ারিশ (১৯৬১ অধ্যাদেশ ৪ ধারা)',
              fractionLabel: `মাতার প্রাপ্যের ${toBengaliNumerals(((mgsUnits / totalMChildUnits) * 100).toFixed(1))}%`,
              shareRatio: mgsRatio,
              explanation:
                '১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা অনুযায়ী মৃত কন্যার স্থলাভিষিক্ত হয়ে দৌহিত্র অংশ পান।',
              isAsaba: true,
            });
          }

          if (orphanedMaternalGranddaughters > 0) {
            const mgdRatio = daughterBranchRatio * (mgdUnits / totalMChildUnits);
            rawShares.push({
              relation: `দৌহিত্রী - মৃত কন্যার মেয়ে (${toBengaliNumerals(orphanedMaternalGranddaughters)} জন)`,
              count: orphanedMaternalGranddaughters,
              category: 'প্রতিনিধিত্বমূলক ওয়ারিশ (১৯৬১ অধ্যাদেশ ৪ ধারা)',
              fractionLabel: `মাতার প্রাপ্যের ${toBengaliNumerals(((mgdUnits / totalMChildUnits) * 100).toFixed(1))}%`,
              shareRatio: mgdRatio,
              explanation:
                '১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা অনুযায়ী মৃত কন্যার স্থলাভিষিক্ত হয়ে দৌহিত্রী অংশ পান।',
              isAsaba: true,
            });
          }
        }

        steps.push(
          '১৯৬১ সালের মুসলিম পারিবারিক আইন অধ্যাদেশের ৪ ধারা ও কুরআন শরীফের বিধান অনুসারে সন্তান ও মৃত সন্তানের বংশধরদের মধ্যে অবশিষ্ট বণ্টন করা হয়েছে।'
        );
        remainingAfterFixed = 0;
      }
    } else {
      // ONLY DAUGHTERS / GRANDDAUGHTERS (NO living sons and NO grandsons)
      if (livingDaughters === 1) {
        steps.push('একমাত্র কন্যা হওয়ায় নির্ধারিত ১/২ অংশ পাবেন (সূরা আন-নিসা: ১১)।');
        rawShares.push({
          relation: 'একমাত্র কন্যা',
          count: 1,
          category: 'যাবিল ফুরুজ',
          fractionLabel: '১/২',
          shareRatio: 1 / 2,
          explanation: 'পুত্রবিহীন অবস্থায় একমাত্র কন্যা নির্ধারিত ১/২ অংশ পান (সূরা আন-নিসা: ১১)।',
        });
      } else if (livingDaughters > 1) {
        steps.push(
          `একাধিক কন্যা (${toBengaliNumerals(livingDaughters)} জন) সম্মিলিতভাবে নির্ধারিত ২/৩ অংশ সমহারে পাবেন (সূরা আন-নিসা: ১১)।`
        );
        rawShares.push({
          relation: `কন্যা (${toBengaliNumerals(livingDaughters)} জন)`,
          count: livingDaughters,
          category: 'যাবিল ফুরুজ',
          fractionLabel: '২/৩',
          shareRatio: 2 / 3,
          explanation:
            'দুই বা ততোধিক কন্যা সম্মিলিতভাবে ২/৩ অংশ সমহারে ভোগ করেন (সূরা আন-নিসা: ১১)।',
        });
      }

      // Predeceased daughter's or son's orphan daughters if any
      if (orphanedGranddaughters > 0 || orphanedMaternalGranddaughters > 0) {
        const orphanCount = orphanedGranddaughters + orphanedMaternalGranddaughters;
        steps.push(
          `মৃত সন্তানের কন্যা (${toBengaliNumerals(orphanCount)} জন) ১৯৬১ সালের আইন অনুসারে অংশীদার হবেন।`
        );
      }
    }
  }

  // -------------------------------------------------------------
  // STEP 7: ASABA RESIDUAL AFTER FIXED SHARES (FATHER, SIBLINGS, UNCLE)
  // -------------------------------------------------------------
  // Recalculate remaining
  const currentSum = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);
  remainingAfterFixed = Math.max(0, 1 - currentSum);

  if (remainingAfterFixed > 0) {
    if (fatherTakesResidualAsAsaba) {
      const fatherIdx = rawShares.findIndex((s) => s.relation.startsWith('পিতা'));
      if (fatherIdx >= 0) {
        rawShares[fatherIdx].shareRatio += remainingAfterFixed;
        rawShares[fatherIdx].fractionLabel = '১/৬ + অবশিষ্ট সম্পূর্ণ';
        rawShares[fatherIdx].isAsaba = true;
      } else {
        rawShares.push({
          relation: 'পিতা',
          count: 1,
          category: 'আসাবা (অবশিষ্টভোগী)',
          fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
          shareRatio: remainingAfterFixed,
          explanation:
            'কোনো সন্তান বা পুং বংশধর না থাকায় পিতা আসাবা হিসেবে সমুদয় অবশিষ্ট সম্পত্তি পান।',
          isAsaba: true,
        });
      }
      steps.push('পিতা আসাবা হিসেবে সমুদয় অবশিষ্ট সম্পত্তি পেয়েছেন।');
      remainingAfterFixed = 0;
    } else if (grandfatherTakesResidualAsAsaba) {
      const gfIdx = rawShares.findIndex((s) => s.relation.startsWith('দাদা'));
      if (gfIdx >= 0) {
        rawShares[gfIdx].shareRatio += remainingAfterFixed;
        rawShares[gfIdx].fractionLabel = '১/৬ + অবশিষ্ট সম্পূর্ণ';
        rawShares[gfIdx].isAsaba = true;
      } else {
        rawShares.push({
          relation: 'দাদা (পিতার পিতা)',
          count: 1,
          category: 'আসাবা (অবশিষ্টভোগী)',
          fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
          shareRatio: remainingAfterFixed,
          explanation: 'পিতার অবর্তমানে দাদা আসাবা হিসেবে অবশিষ্ট সম্পত্তি পান।',
          isAsaba: true,
        });
      }
      steps.push('পিতার অনুপস্থিতিতে দাদা আসাবা হিসেবে সমুদয় অবশিষ্ট সম্পত্তি পেয়েছেন।');
      remainingAfterFixed = 0;
    } else if (!hasDescendants && !input.hasFather && !input.hasPaternalGrandfather) {
      // SIBLINGS OR UNCLES TAKE RESIDUAL
      if (fullBrothers > 0 || fullSisters > 0) {
        if (fullBrothers > 0 && fullSisters > 0) {
          const broWeight = fullBrothers * 2;
          const sisWeight = fullSisters * 1;
          const totalU = broWeight + sisWeight;

          rawShares.push({
            relation: `সহোদর ভাই (${toBengaliNumerals(fullBrothers)} জন)`,
            count: fullBrothers,
            category: 'আসাবা বিল গাইর',
            fractionLabel: `অবশিষ্টের ${toBengaliNumerals(((broWeight / totalU) * 100).toFixed(1))}% (প্রতি ভাই ২ ভাগ)`,
            shareRatio: remainingAfterFixed * (broWeight / totalU),
            explanation:
              'সন্তান ও পিতা না থাকায় সহোদর ভাই-বোন অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পান (সূরা আন-নিসা: ১৭৬)।',
            isAsaba: true,
          });

          rawShares.push({
            relation: `সহোদর বোন (${toBengaliNumerals(fullSisters)} জন)`,
            count: fullSisters,
            category: 'আসাবা বিল গাইর',
            fractionLabel: `অবশিষ্টের ${toBengaliNumerals(((sisWeight / totalU) * 100).toFixed(1))}% (প্রতি বোন ১ ভাগ)`,
            shareRatio: remainingAfterFixed * (sisWeight / totalU),
            explanation:
              'সন্তান ও পিতা না থাকায় সহোদর ভাই-বোন অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পান (সূরা আন-নিসা: ১৭৬)।',
            isAsaba: true,
          });
          remainingAfterFixed = 0;
        } else if (fullBrothers > 0) {
          rawShares.push({
            relation: `সহোদর ভাই (${toBengaliNumerals(fullBrothers)} জন)`,
            count: fullBrothers,
            category: 'আসাবা (অবশিষ্টভোগী)',
            fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
            shareRatio: remainingAfterFixed,
            explanation:
              'পিতা বা সন্তান না থাকায় সহোদর ভাইগণ সমহারে অবশিষ্ট সম্পত্তি পান।',
            isAsaba: true,
          });
          remainingAfterFixed = 0;
        } else if (fullSisters > 0) {
          // Sisters alone as Zabil Furuz
          const sisShare = fullSisters === 1 ? 1 / 2 : 2 / 3;
          rawShares.push({
            relation: `সহোদর বোন (${toBengaliNumerals(fullSisters)} জন)`,
            count: fullSisters,
            category: 'যাবিল ফুরুজ',
            fractionLabel: fullSisters === 1 ? '১/২' : '২/৩',
            shareRatio: sisShare,
            explanation:
              'কোনো ভাই, সন্তান বা পিতা না থাকায় সহোদর বোনগণ নির্ধারিত অংশ পান (সূরা আন-নিসা: ১৭৬)।',
          });
        }
      } else if (consanguineBrothers > 0 || consanguineSisters > 0) {
        // Consanguine siblings
        if (consanguineBrothers > 0 && consanguineSisters > 0) {
          const cbU = consanguineBrothers * 2;
          const csU = consanguineSisters * 1;
          const totalCB = cbU + csU;

          rawShares.push({
            relation: `বৈমাত্রেয় ভাই (${toBengaliNumerals(consanguineBrothers)} জন)`,
            count: consanguineBrothers,
            category: 'আসাবা বিল গাইর',
            fractionLabel: `অবশিষ্টের ২ ভাগ`,
            shareRatio: remainingAfterFixed * (cbU / totalCB),
            explanation: 'সহোদর ভাই না থাকায় বৈমাত্রেয় ভাই-বোন ২:১ অনুপাতে পান।',
            isAsaba: true,
          });
          rawShares.push({
            relation: `বৈমাত্রেয় বোন (${toBengaliNumerals(consanguineSisters)} জন)`,
            count: consanguineSisters,
            category: 'আসাবা বিল গাইর',
            fractionLabel: `অবশিষ্টের ১ ভাগ`,
            shareRatio: remainingAfterFixed * (csU / totalCB),
            explanation: 'সহোদর ভাই না থাকায় বৈমাত্রেয় ভাই-বোন ২:১ অনুপাতে পান।',
            isAsaba: true,
          });
          remainingAfterFixed = 0;
        } else if (consanguineBrothers > 0) {
          rawShares.push({
            relation: `বৈমাত্রেয় ভাই (${toBengaliNumerals(consanguineBrothers)} জন)`,
            count: consanguineBrothers,
            category: 'আসাবা',
            fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
            shareRatio: remainingAfterFixed,
            explanation: 'সহোদর ভাই না থাকায় বৈমাত্রেয় ভাই আসাবা হিসেবে অবশিষ্ট পান।',
            isAsaba: true,
          });
          remainingAfterFixed = 0;
        } else if (consanguineSisters > 0) {
          const csShare = consanguineSisters === 1 ? 1 / 2 : 2 / 3;
          rawShares.push({
            relation: `বৈমাত্রেয় বোন (${toBengaliNumerals(consanguineSisters)} জন)`,
            count: consanguineSisters,
            category: 'যাবিল ফুরুজ',
            fractionLabel: consanguineSisters === 1 ? '১/২' : '২/৩',
            shareRatio: csShare,
            explanation: 'সহোদর ভাই/বোন না থাকায় বৈমাত্রেয় বোন নির্ধারিত অংশ পান।',
          });
        }
      } else if (input.fullNephewsCount > 0) {
        rawShares.push({
          relation: `ভাতিজা - সহোদর ভাইয়ের ছেলে (${toBengaliNumerals(input.fullNephewsCount)} জন)`,
          count: input.fullNephewsCount,
          category: 'আসাবা (অবশিষ্টভোগী)',
          fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
          shareRatio: remainingAfterFixed,
          explanation:
            'নিকটবর্তী কোনো পুরুষ বংশধর বা ভাই না থাকায় ভাতিজা আসাবা হিসেবে অবশিষ্ট সম্পত্তি পান।',
          isAsaba: true,
        });
        remainingAfterFixed = 0;
      } else if (input.paternalUnclesCount > 0) {
        rawShares.push({
          relation: `সহোদর চাচা (${toBengaliNumerals(input.paternalUnclesCount)} জন)`,
          count: input.paternalUnclesCount,
          category: 'আসাবা (অবশিষ্টভোগী)',
          fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
          shareRatio: remainingAfterFixed,
          explanation:
            'নিকটাত্মীয় কোনো আসাবা না থাকায় সহোদর চাচা আসাবা হিসেবে সমুদয় অবশিষ্ট সম্পত্তি পান।',
          isAsaba: true,
        });
        remainingAfterFixed = 0;
      }
    }
  }

  // Uterine siblings check (বৈপিত্রেয় ভাই ও বোন - মা এক পিতা ভিন্ন)
  // Eligible if NO children, grandchildren, father, or grandfather
  const uterineEligible = !hasDescendants && !input.hasFather && !input.hasPaternalGrandfather;
  const totalUterine = uterineBrothers + uterineSisters;
  if (totalUterine > 0 && uterineEligible) {
    const uterineShare = totalUterine === 1 ? 1 / 6 : 1 / 3;
    const uterineLabel = totalUterine === 1 ? '১/৬' : '১/৩';
    steps.push(
      totalUterine === 1
        ? 'সন্তান ও পিতা না থাকায় একজন বৈপিত্রেয় ভাই/বোন নির্ধারিত ১/৬ অংশ পাবেন (সূরা আন-নিসা: ১২)।'
        : `সন্তান ও পিতা না থাকায় বৈপিত্রেয় ভাই-বোন (${toBengaliNumerals(totalUterine)} জন) সম্মিলিতভাবে ১/৩ অংশ সমহারে (১:১) পাবেন (সূরা আন-নিসা: ১২)।`
    );
    rawShares.push({
      relation: `বৈপিত্রেয় ভাই ও বোন (${toBengaliNumerals(totalUterine)} জন)`,
      count: totalUterine,
      category: 'যাবিল ফুরুজ',
      fractionLabel: uterineLabel,
      shareRatio: uterineShare,
      explanation:
        'বৈপিত্রেয় ভাই-বোনের মধ্যে পুরুষ ও নারী সমহারে (১:১ অনুপাতে) অংশ পান (সূরা আন-নিসা: ১২)।',
    });
  }

  // -------------------------------------------------------------
  // STEP 8: AWL (আউল) & RADD (রদ্দ) ADJUSTMENTS
  // -------------------------------------------------------------
  let totalCalculatedShare = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);

  if (totalCalculatedShare > 1.0001) {
    steps.push(
      `[আউল / Awl নিয়ম প্রয়োগ]: ওয়ারিশদের নির্ধারিত অংশের সমষ্টি ${toBengaliNumerals((totalCalculatedShare * 100).toFixed(1))}% (যা ১০০% এর বেশি)। ফারায়েজ শাস্ত্রের সর্বসম্মত আউল নিয়মানুযায়ী প্রত্যেকের অংশ আনুপাতিক হারে কমানো হয়েছে।`
    );
    rawShares.forEach((s) => {
      s.shareRatio = s.shareRatio / totalCalculatedShare;
    });
    totalCalculatedShare = 1;
  } else if (totalCalculatedShare < 0.9999 && rawShares.length > 0) {
    // Check if any Asaba exists
    const hasAnyAsaba = rawShares.some((s) => s.isAsaba);

    if (!hasAnyAsaba) {
      // Radd (রদ্দ): Return remainder to non-spouse Zabil Furuz
      const nonSpouseShares = rawShares.filter((s) => !s.isSpouse);
      if (nonSpouseShares.length > 0) {
        const spouseTotal = rawShares
          .filter((s) => s.isSpouse)
          .reduce((acc, c) => acc + c.shareRatio, 0);
        const remainingForRadd = 1 - spouseTotal;
        const nonSpouseTotal = nonSpouseShares.reduce((acc, c) => acc + c.shareRatio, 0);

        steps.push(
          '[রদ্দ / Radd নিয়ম প্রয়োগ]: আসাবা অনুপস্থিত থাকায় এবং নির্ধারিত অংশের পর উদ্বৃত্ত সম্পত্তি থাকায় তা স্বামী/স্ত্রী ব্যতীত অন্যান্য কুরআন-নির্ধারিত ওয়ারিশদের মাঝে তাদের প্রাপ্য অংশের অনুপাতে ফিরিয়ে দেওয়া হয়েছে।'
        );

        nonSpouseShares.forEach((s) => {
          s.shareRatio = (s.shareRatio / nonSpouseTotal) * remainingForRadd;
        });
        totalCalculatedShare = 1;
      } else {
        // Only spouse exists: modern Bangladesh law & judicial precedent gives remainder to spouse
        rawShares.forEach((s) => {
          s.shareRatio = 1.0;
        });
        steps.push(
          '[রদ্দ / Radd নিয়ম]: অন্য কোনো জীবিত ওয়ারিশ না থাকায় আধুনিক আইন অনুযায়ী অবশিষ্ট সম্পত্তিও স্বামী/স্ত্রীকে প্রদান করা হয়েছে।'
        );
        totalCalculatedShare = 1;
      }
    }
  }

  // -------------------------------------------------------------
  // STEP 9: CONVERT TO REAL PROPERTY ASSETS
  // -------------------------------------------------------------
  const landInDecimal = convertLandToDecimal(assets.landAmount, assets.landUnit);

  const heirResults: HeirShareResult[] = rawShares.map((item) => {
    const percent = item.shareRatio * 100;
    const perPersonPercent = item.count > 0 ? percent / item.count : percent;

    const totalLand = landInDecimal * item.shareRatio;
    const totalGold = assets.goldVori * item.shareRatio;
    const totalSilver = assets.silverVori * item.shareRatio;
    const totalCash = assets.cashBDT * item.shareRatio;

    return {
      relation: item.relation,
      count: item.count,
      category: item.category,
      shareFraction: item.fractionLabel,
      sharePercent: percent,
      perPersonPercent,
      totalLand,
      totalGold,
      totalSilver,
      totalCash,
      perPersonLand: item.count > 0 ? totalLand / item.count : totalLand,
      perPersonGold: item.count > 0 ? totalGold / item.count : totalGold,
      perPersonSilver: item.count > 0 ? totalSilver / item.count : totalSilver,
      perPersonCash: item.count > 0 ? totalCash / item.count : totalCash,
      explanation: item.explanation,
    };
  });

  return {
    religion: 'muslim',
    heirResults,
    steps,
    excludedHeirs,
    totalDistributedPercent: totalCalculatedShare * 100,
    disclaimer:
      'এই ফরায়েজ ফলাফল হানাফি ফিকহ ও মুসলিম পারিবারিক আইন ১৯৬১ অনুসরণে প্রস্তুতকৃত। জমি রেজিস্ট্রি বা নামজারি করার পূর্বে মূল খতিয়ান যাচাই আবশ্যক।',
  };
}
