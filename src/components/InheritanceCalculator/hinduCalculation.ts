import {
  HinduHeirsInput,
  PropertyAssets,
  HeirShareResult,
  CalculationOutcome,
} from './types';
import { toBengaliNumerals, convertLandToDecimal, formatDecimalBn } from './muslimCalculation';

/**
 * Hindu Dayabhaga Inheritance Calculator Engine
 * Complies with:
 * 1. Traditional Dayabhaga School of Hindu Law (Jimutavahana - Bengal & Assam)
 * 2. The Hindu Women's Rights to Property Act, 1937 (Act XVIII of 1937)
 * 3. Principles of Pinda-dana (Spiritual Benefit / Efficacy)
 */
export function calculateHinduInheritance(
  input: HinduHeirsInput,
  assets: PropertyAssets
): CalculationOutcome {
  const steps: string[] = [];
  const excludedHeirs: string[] = [];
  const rawShares: {
    relation: string;
    count: number;
    category: string;
    fractionLabel: string;
    shareRatio: number;
    explanation: string;
  }[] = [];

  const isMaleDeceased = input.deceasedGender === 'male';

  if (isMaleDeceased) {
    // -------------------------------------------------------------
    // CASE A: DECEASED IS MALE (মৃত পুরুষ)
    // -------------------------------------------------------------

    // Tier 1: Sons, Grandsons (predeceased son's son), Great-grandsons, & Widow (under 1937 Act)
    const tier1WidowCount = input.hasWidow ? 1 : 0;
    const tier1SonsCount = Math.max(0, input.sonsCount || 0);
    const tier1GrandsonsCount = Math.max(0, input.grandsonsCount || 0);
    const tier1GreatGrandsonsCount = Math.max(0, input.greatGrandsonsCount || 0);

    const totalTier1Count =
      tier1WidowCount + tier1SonsCount + tier1GrandsonsCount + tier1GreatGrandsonsCount;

    if (totalTier1Count > 0) {
      steps.push(
        'অগ্রাধিকার ক্রম ১ (দায়ভাগ ও ১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন): পুত্র, পৌত্র, প্রপৌত্র ও বিধবা স্ত্রী উপস্থিত থাকলে তারা সমহারে অংশীদার হন।'
      );

      const sharePerHead = 1 / totalTier1Count;

      if (tier1WidowCount > 0) {
        const widowRatio = sharePerHead;
        rawShares.push({
          relation: 'বিধবা স্ত্রী',
          count: 1,
          category: 'অগ্রাধিকার ক্রম ১ (১৯৩৭ সালের আইন)',
          fractionLabel: `১/${toBengaliNumerals(totalTier1Count)} অংশ`,
          shareRatio: widowRatio,
          explanation:
            '১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন (Act XVIII of 1937) অনুযায়ী বিধবা স্ত্রী পুত্রের সমান এক অংশ (সীমিত স্বত্ব) পান।',
        });
      }

      if (tier1SonsCount > 0) {
        const sonsRatio = tier1SonsCount * sharePerHead;
        rawShares.push({
          relation: tier1SonsCount === 1 ? 'পুত্র' : `পুত্র (${toBengaliNumerals(tier1SonsCount)} জন)`,
          count: tier1SonsCount,
          category: 'অগ্রাধিকার ক্রম ১ (দায়ভাগ মূল ওয়ারিশ)',
          fractionLabel:
            tier1SonsCount === 1
              ? `১/${toBengaliNumerals(totalTier1Count)} অংশ`
              : `${toBengaliNumerals(tier1SonsCount)}/${toBengaliNumerals(totalTier1Count)} অংশ (সমহারে)`,
          shareRatio: sonsRatio,
          explanation:
            'দায়ভাগ আইন অনুযায়ী পুত্রগণ প্রত্যক্ষ রক্তসম্পর্কীয় পিণ্ডদানকারী হিসেবে সমহারে প্রধান ওয়ারিশ হন।',
        });
      }

      if (tier1GrandsonsCount > 0) {
        const gsRatio = tier1GrandsonsCount * sharePerHead;
        rawShares.push({
          relation: `পৌত্র (${toBengaliNumerals(tier1GrandsonsCount)} জন - মৃত পুত্রের সন্তান)`,
          count: tier1GrandsonsCount,
          category: 'অগ্রাধিকার ক্রম ১ (প্রতিনিধিত্বশীল ওয়ারিশ)',
          fractionLabel: `${toBengaliNumerals(tier1GrandsonsCount)}/${toBengaliNumerals(totalTier1Count)} অংশ`,
          shareRatio: gsRatio,
          explanation: 'মৃত পুত্রের সন্তান (পৌত্র) পিতার স্থলাভিষিক্ত হয়ে সমান অংশ পান।',
        });
      }

      if (tier1GreatGrandsonsCount > 0) {
        const ggsRatio = tier1GreatGrandsonsCount * sharePerHead;
        rawShares.push({
          relation: `প্রপৌত্র (${toBengaliNumerals(tier1GreatGrandsonsCount)} জন)`,
          count: tier1GreatGrandsonsCount,
          category: 'অগ্রাধিকার ক্রম ১ (অধস্তন পুং বংশধর)',
          fractionLabel: `${toBengaliNumerals(tier1GreatGrandsonsCount)}/${toBengaliNumerals(totalTier1Count)} অংশ`,
          shareRatio: ggsRatio,
          explanation: 'প্রপৌত্র পুং বংশীয় সরাসরি বংশধর হিসেবে সমহারে অংশ পান।',
        });
      }

      // Excluded lower tiers
      if (input.unmarriedDaughtersCount > 0)
        excludedHeirs.push(`অবিবাহিতা কন্যা (${toBengaliNumerals(input.unmarriedDaughtersCount)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);
      if (input.marriedDaughtersCount > 0)
        excludedHeirs.push(`বিবাহিতা কন্যা (${toBengaliNumerals(input.marriedDaughtersCount)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);
      if (input.hasFather) excludedHeirs.push('পিতা (১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.brothersCount > 0)
        excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);
      if (input.brotherSonsCount > 0)
        excludedHeirs.push(`ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);
      if (input.sistersCount > 0)
        excludedHeirs.push(`বোন (${toBengaliNumerals(input.sistersCount)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);

    } else if (input.unmarriedDaughtersCount > 0) {
      // Tier 2: Unmarried daughter
      steps.push(
        'অগ্রাধিকার ক্রম ২: পুত্র বা বিধবা স্ত্রী না থাকায় অবিবাহিতা কন্যাগণ অগ্রাধিকার ভিত্তিতে সমস্ত সম্পত্তি পাবেন।'
      );
      rawShares.push({
        relation:
          input.unmarriedDaughtersCount === 1
            ? 'অবিবাহিতা কন্যা'
            : `অবিবাহিতা কন্যা (${toBengaliNumerals(input.unmarriedDaughtersCount)} জন)`,
        count: input.unmarriedDaughtersCount,
        category: 'অগ্রাধিকার ক্রম ২ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'দায়ভাগ মতে পুত্রহীন অবস্থায় অবিবাহিতা কন্যা বিবাহিতা কন্যার চেয়ে অগ্রগণ্য।',
      });

      if (input.marriedDaughtersCount > 0)
        excludedHeirs.push(`বিবাহিতা কন্যা (${toBengaliNumerals(input.marriedDaughtersCount)} জন - অবিবাহিতা কন্যা থাকায় বঞ্চিত)`);
      if (input.hasFather) excludedHeirs.push('পিতা (উচ্চতর ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (উচ্চতর ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - বঞ্চিত)`);

    } else if (input.marriedDaughtersCount > 0) {
      // Tier 3: Married daughter
      steps.push(
        'অগ্রাধিকার ক্রম ৩: পুত্র ও অবিবাহিতা কন্যা না থাকায় বিবাহিতা কন্যাগণ সমস্ত সম্পত্তি পাবেন।'
      );
      rawShares.push({
        relation:
          input.marriedDaughtersCount === 1
            ? 'বিবাহিতা কন্যা'
            : `বিবাহিতা কন্যা (${toBengaliNumerals(input.marriedDaughtersCount)} জন)`,
        count: input.marriedDaughtersCount,
        category: 'অগ্রাধিকার ক্রম ৩ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'দায়ভাগ বিধান মতে পুত্র ও কুমারী কন্যা না থাকলে সন্তানবতী বা সন্তানসম্ভবা বিবাহিতা কন্যা ওয়ারিশ হন।',
      });

      if (input.hasFather) excludedHeirs.push('পিতা (উচ্চতর ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (উচ্চতর ক্রমের ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - বঞ্চিত)`);

    } else if (input.hasFather) {
      // Tier 4: Father
      steps.push('অগ্রাধিকার ক্রম ৪: কোনো অধস্তন ওয়ারিশ না থাকায় পিতা সমস্ত সম্পত্তি পাবেন।');
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'অগ্রাধিকার ক্রম ৪ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০%',
        shareRatio: 1.0,
        explanation: 'সন্তানাদি বা বিধবা স্ত্রী না থাকলে পিতা এককভাবে সমস্ত সম্পত্তির অধিকারী হন।',
      });

      if (input.hasMother) excludedHeirs.push('মাতা (পিতা জীবিত থাকায় বঞ্চিত)');
      if (input.brothersCount > 0) excludedHeirs.push(`सहোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - পিতা থাকায় বঞ্চিত)`);

    } else if (input.hasMother) {
      // Tier 5: Mother
      steps.push('অগ্রাধিকার ক্রম ৫: অধস্তন ও পিতা না থাকায় মাতা সমস্ত সম্পত্তি পাবেন।');
      rawShares.push({
        relation: 'মাতা',
        count: 1,
        category: 'অগ্রাধিকার ক্রম ৫ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০%',
        shareRatio: 1.0,
        explanation: 'পিতার অবর্তমানে মাতা হিন্দু দায়ভাগ আইন মতে সীমিত স্বত্বে সম্পূর্ণ সম্পত্তি পান।',
      });

      if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - মাতা থাকায় বঞ্চিত)`);

    } else if (input.brothersCount > 0) {
      // Tier 6: Full brother
      steps.push('অগ্রাধিকার ক্রম ৬: মাতা-পিতা ও সন্তানাদি না থাকায় সহোদর ভাইগণ সমহারে সমস্ত সম্পত্তি পাবেন।');
      rawShares.push({
        relation:
          input.brothersCount === 1
            ? 'সহোদর ভাই'
            : `সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন)`,
        count: input.brothersCount,
        category: 'অগ্রাধিকার ক্রম ৬ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'নিকটবর্তী ওয়ারিশদের অনুপস্থিতিতে সহোদর ভাই পিণ্ডদানকারী হিসেবে সম্পত্তি পান।',
      });

      if (input.brotherSonsCount > 0) excludedHeirs.push(`ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন - ভাই থাকায় বঞ্চিত)`);
      if (input.sistersCount > 0) excludedHeirs.push(`বোন (${toBengaliNumerals(input.sistersCount)} জন - ভাই থাকায় বঞ্চিত)`);

    } else if (input.brotherSonsCount > 0) {
      // Tier 7: Brother's son
      steps.push('অগ্রাধিকার ক্রম ৭: ভাইয়ের পুত্র (ভাতিজা) সমহারে সমস্ত সম্পত্তি পাবেন।');
      rawShares.push({
        relation:
          input.brotherSonsCount === 1
            ? 'ভাইয়ের পুত্র (ভাতিজা)'
            : `ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন)`,
        count: input.brotherSonsCount,
        category: 'অগ্রাধিকার ক্রম ৭ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'ভাইয়ের অবর্তমানে ভাইয়ের পুত্র দায়ভাগ পিণ্ডদান নীতি অনুযায়ী সম্পত্তি পান।',
      });

      if (input.sistersCount > 0) excludedHeirs.push(`বোন (${toBengaliNumerals(input.sistersCount)} জন - বঞ্চিত)`);

    } else if (input.sistersCount > 0) {
      // Tier 8: Sister
      steps.push('অগ্রাধিকার ক্রম ৮: পূর্ববর্তী কোনো পুরুষ ওয়ারিশ না থাকায় বোন সমহারে সম্পত্তি পাবেন।');
      rawShares.push({
        relation:
          input.sistersCount === 1
            ? 'সহোদর বোন'
            : `সহোদর বোন (${toBengaliNumerals(input.sistersCount)} জন)`,
        count: input.sistersCount,
        category: 'অগ্রাধিকার ক্রম ৮ (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'অন্যান্য নিকটাত্মীয়ের অবর্তমানে বোন উত্তরাধিকারী হন।',
      });
    }

  } else {
    // -------------------------------------------------------------
    // CASE B: DECEASED IS FEMALE (মৃতা নারী - স্ত্রীধন বা সাধারণ সম্পত্তি)
    // -------------------------------------------------------------
    const sons = Math.max(0, input.sonsCount || 0);
    const unmarDaughters = Math.max(0, input.unmarriedDaughtersCount || 0);
    const marDaughters = Math.max(0, input.marriedDaughtersCount || 0);
    const hasHusband = input.hasHusband;

    // Female Tier 1: Sons & Unmarried Daughters (equal shares in Stridhana)
    const femaleTier1Total = sons + unmarDaughters;

    if (femaleTier1Total > 0) {
      steps.push(
        'দায়ভাগ স্ত্রীধন আইন: মৃতা নারীর সম্পত্তিতে পুত্র এবং অবিবাহিতা কন্যাগণ অগ্রাধিকার ভিত্তিতে সমহারে অংশীদার হন।'
      );
      const sharePerChild = 1 / femaleTier1Total;

      if (sons > 0) {
        rawShares.push({
          relation: sons === 1 ? 'পুত্র' : `পুত্র (${toBengaliNumerals(sons)} জন)`,
          count: sons,
          category: 'স্ত্রীধন ১ম অগ্রাধিকার',
          fractionLabel:
            sons === 1
              ? `১/${toBengaliNumerals(femaleTier1Total)} অংশ`
              : `${toBengaliNumerals(sons)}/${toBengaliNumerals(femaleTier1Total)} অংশ`,
          shareRatio: sons * sharePerChild,
          explanation: 'দায়ভাগ স্ত্রীধন নীতি অনুযায়ী পুত্র মাতার সম্পত্তিতে সরাসরি সমহারে অংশ পান।',
        });
      }

      if (unmarDaughters > 0) {
        rawShares.push({
          relation:
            unmarDaughters === 1
              ? 'অবিবাহিতা কন্যা'
              : `অবিবাহিতা কন্যা (${toBengaliNumerals(unmarDaughters)} জন)`,
          count: unmarDaughters,
          category: 'স্ত্রীধন ১ম অগ্রাধিকার',
          fractionLabel:
            unmarDaughters === 1
              ? `১/${toBengaliNumerals(femaleTier1Total)} অংশ`
              : `${toBengaliNumerals(unmarDaughters)}/${toBengaliNumerals(femaleTier1Total)} অংশ`,
          shareRatio: unmarDaughters * sharePerChild,
          explanation: 'দায়ভাগ মতে মাতার স্ত্রীধনে অবিবাহিতা কন্যা পুত্রের সমান অংশ লাভ করেন।',
        });
      }

      if (hasHusband) excludedHeirs.push('স্বামী (পুত্র/অবিবাহিতা কন্যা থাকায় বঞ্চিত)');
      if (marDaughters > 0)
        excludedHeirs.push(`বিবাহিতা কন্যা (${toBengaliNumerals(marDaughters)} জন - ১ম ক্রমের ওয়ারিশ থাকায় বঞ্চিত)`);
      if (input.hasFather) excludedHeirs.push('পিতা (অধস্তন ওয়ারিশ থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (অধস্তন ওয়ারিশ থাকায় বঞ্চিত)');

    } else if (marDaughters > 0) {
      // Female Tier 2: Married daughters (with sons)
      steps.push(
        'স্ত্রীধন ২য় অগ্রাধিকার: পুত্র ও কুমারী কন্যার অবর্তমানে বিবাহিতা কন্যাগণ সম্পূর্ণ সম্পত্তি পান।'
      );
      rawShares.push({
        relation:
          marDaughters === 1
            ? 'বিবাহিতা কন্যা'
            : `বিবাহিতা কন্যা (${toBengaliNumerals(marDaughters)} জন)`,
        count: marDaughters,
        category: 'স্ত্রীধন ২য় অগ্রাধিকার',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'পুত্র ও কুমারী কন্যার অবর্তমানে বিবাহিতা কন্যা মাতার সম্পত্তি লাভ করেন।',
      });

      if (hasHusband) excludedHeirs.push('স্বামী (কন্যা থাকায় বঞ্চিত)');
      if (input.hasFather) excludedHeirs.push('পিতা (কন্যা থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (কন্যা থাকায় বঞ্চিত)');

    } else if (hasHusband) {
      // Female Tier 3: Husband (in default of children)
      steps.push('স্ত্রীধন ৩য় অগ্রাধিকার: সন্তানাদির অবর্তমানে স্বামী সমস্ত সম্পত্তি লাভ করেন।');
      rawShares.push({
        relation: 'স্বামী',
        count: 1,
        category: 'স্ত্রীধন ৩য় অগ্রাধিকার (দায়ভাগ আইন)',
        fractionLabel: 'সম্পূর্ণ ১০০%',
        shareRatio: 1.0,
        explanation: 'সন্তানাদি না থাকলে দায়ভাগ আইন অনুযায়ী স্বামী স্ত্রীর সম্পত্তি লাভ করেন।',
      });

      if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - স্বামী থাকায় বঞ্চিত)`);
      if (input.hasFather) excludedHeirs.push('পিতা (স্বামী থাকায় বঞ্চিত)');
      if (input.hasMother) excludedHeirs.push('মাতা (স্বামী থাকায় বঞ্চিত)');

    } else if (input.brothersCount > 0) {
      // Female Tier 4: Brother
      steps.push('স্ত্রীধন ৪র্থ অগ্রাধিকার: সন্তান ও স্বামী না থাকায় সহোদর ভাই সম্পত্তি পান।');
      rawShares.push({
        relation:
          input.brothersCount === 1
            ? 'সহোদর ভাই'
            : `সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন)`,
        count: input.brothersCount,
        category: 'স্ত্রীধন ৪র্থ অগ্রাধিকার',
        fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
        shareRatio: 1.0,
        explanation: 'সন্তান ও স্বামীর অবর্তমানে সহোদর ভাই মাতার সম্পত্তিতে অংশ পান।',
      });
      if (input.hasMother) excludedHeirs.push('মাতা (ভাই থাকায় বঞ্চিত)');
      if (input.hasFather) excludedHeirs.push('পিতা (ভাই থাকায় বঞ্চিত)');

    } else if (input.hasMother) {
      // Female Tier 5: Mother
      steps.push('স্ত্রীধন ৫ম অগ্রাধিকার: অন্যান্য আত্মীয় না থাকায় মাতা সমস্ত সম্পত্তি পান।');
      rawShares.push({
        relation: 'মাতা',
        count: 1,
        category: 'স্ত্রীধন ৫ম অগ্রাধিকার',
        fractionLabel: 'সম্পূর্ণ ১০০%',
        shareRatio: 1.0,
        explanation: 'সন্তান, স্বামী বা ভাই না থাকলে মাতা কন্যার স্ত্রীধন লাভ করেন।',
      });
      if (input.hasFather) excludedHeirs.push('পিতা (মাতা থাকায় বঞ্চিত)');

    } else if (input.hasFather) {
      // Female Tier 6: Father
      steps.push('স্ত্রীধন ৬ষ্ঠ অগ্রাধিকার: পিতা সমস্ত সম্পত্তি লাভ করেন।');
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'স্ত্রীধন ৬ষ্ঠ অগ্রাধিকার',
        fractionLabel: 'সম্পূর্ণ ১০০%',
        shareRatio: 1.0,
        explanation: 'পূর্ববর্তী ওয়ারিশদের অবর্তমানে পিতা কন্যার সম্পত্তি লাভ করেন।',
      });
    }
  }

  // Convert to Real Assets
  const landInDecimal = convertLandToDecimal(assets.landAmount, assets.landUnit);

  const heirResults: HeirShareResult[] = rawShares.map((item) => {
    const percent = item.shareRatio * 100;
    const safeCount = Math.max(1, item.count);
    const perPersonPercent = percent / safeCount;

    const totalLand = landInDecimal * item.shareRatio;
    const totalGold = (assets.goldVori || 0) * item.shareRatio;
    const totalSilver = (assets.silverVori || 0) * item.shareRatio;
    const totalCash = (assets.cashBDT || 0) * item.shareRatio;

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
      perPersonLand: totalLand / safeCount,
      perPersonGold: totalGold / safeCount,
      perPersonSilver: totalSilver / safeCount,
      perPersonCash: totalCash / safeCount,
      explanation: item.explanation,
    };
  });

  const totalCalculatedShare = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);

  return {
    religion: 'hindu',
    heirResults,
    steps,
    excludedHeirs,
    totalDistributedPercent: totalCalculatedShare * 100,
    disclaimer:
      'এই দায়ভাগ ফলাফল জিমূতবাহনের দায়ভাগ পদ্ধতি এবং ১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন অনুসরণে তৈরি। জমি রেজিস্ট্রি বা নামজারি করার পূর্বে সংশ্লিষ্ট দলিলপত্র বিজ্ঞ আইনজীবীর মাধ্যমে যাচাই করে নেওয়া সমীচীন।',
  };
}
