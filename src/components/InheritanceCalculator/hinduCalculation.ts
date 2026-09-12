import {
  HinduHeirsInput,
  PropertyAssets,
  HeirShareResult,
  CalculationOutcome,
} from './types';
import { toBengaliNumerals } from './muslimCalculation';

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

  // Tier 1: Sons, Grandsons, Great-grandsons, and Widow (1937 Act)
  const tier1WidowCount = isMaleDeceased && input.hasWidow ? 1 : 0;
  const tier1SonsCount = Math.max(0, input.sonsCount);
  const tier1GrandsonsCount = Math.max(0, input.grandsonsCount);
  const tier1GreatGrandsonsCount = Math.max(0, input.greatGrandsonsCount);

  const totalTier1Count =
    tier1WidowCount + tier1SonsCount + tier1GrandsonsCount + tier1GreatGrandsonsCount;

  if (totalTier1Count > 0) {
    steps.push(
      'অগ্রাধিকার ক্রম ১ (দায়ভাগ ও ১৯৩৭ সালের আইন): পুত্র, পৌত্র ও বিধবা স্ত্রী উপস্থিত থাকলে তারা সমহারে সম্পত্তি বণ্টন করবেন।'
    );

    const sharePerHead = 1 / totalTier1Count;

    if (tier1WidowCount > 0) {
      const widowRatio = tier1WidowCount * sharePerHead;
      rawShares.push({
        relation: 'বিধবা স্ত্রী',
        count: 1,
        category: 'অগ্রাধিকার ক্রম ১ (১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন)',
        fractionLabel: `১/${toBengaliNumerals(totalTier1Count)} অংশ`,
        shareRatio: widowRatio,
        explanation:
          '১৯৩৭ সালের হিন্দু নারী সম্পত্তি অধিকার আইন অনুযায়ী বিধবা স্ত্রী পুত্রের সমান এক অংশ পান।',
      });
    }

    if (tier1SonsCount > 0) {
      const sonsRatio = tier1SonsCount * sharePerHead;
      rawShares.push({
        relation: `পুত্র (${toBengaliNumerals(tier1SonsCount)} জন)`,
        count: tier1SonsCount,
        category: 'অগ্রাধিকার ক্রম ১ (দায়ভাগ মূল ওয়ারিশ)',
        fractionLabel:
          tier1SonsCount === 1
            ? `১/${toBengaliNumerals(totalTier1Count)} অংশ`
            : `${toBengaliNumerals(tier1SonsCount)}/${toBengaliNumerals(totalTier1Count)} অংশ (সমহারে)`,
        shareRatio: sonsRatio,
        explanation: 'দায়ভাগ আইন অনুযায়ী পুত্রগণ সমহারে প্রধান ওয়ারিশ হিসেবে সম্পত্তি পান।',
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
        category: 'অগ্রাধিকার ক্রম ১',
        fractionLabel: `${toBengaliNumerals(tier1GreatGrandsonsCount)}/${toBengaliNumerals(totalTier1Count)} অংশ`,
        shareRatio: ggsRatio,
        explanation: 'প্রপৌত্র পুং বংশীয় সরাসরি বংশধর হিসেবে সমহারে অংশ পান।',
      });
    }

    // List all excluded lower tiers
    if (input.unmarriedDaughtersCount > 0)
      excludedHeirs.push(`অবিবাহিতা কন্যা (${toBengaliNumerals(input.unmarriedDaughtersCount)} জন - ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)`);
    if (input.marriedDaughtersCount > 0)
      excludedHeirs.push(`বিবাহিতা কন্যা (${toBengaliNumerals(input.marriedDaughtersCount)} জন - ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)`);
    if (input.hasFather) excludedHeirs.push('পিতা (ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)');
    if (input.hasMother) excludedHeirs.push('মাতা (ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)');
    if (input.brothersCount > 0)
      excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)`);
    if (input.brotherSonsCount > 0)
      excludedHeirs.push(`ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন - ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)`);
    if (input.sistersCount > 0)
      excludedHeirs.push(`বোন (${toBengaliNumerals(input.sistersCount)} জন - ক্রম ১ এর ওয়ারিশ থাকায় বঞ্চিত)`);

  } else if (input.unmarriedDaughtersCount > 0) {
    // Tier 2: Unmarried daughter
    steps.push(
      'অগ্রাধিকার ক্রম ২: পুত্র/স্ত্রী না থাকায় অবিবাহিতা কন্যা একক ওয়ারিশ হিসেবে সমস্ত সম্পত্তি পাবেন।'
    );
    rawShares.push({
      relation: `অবিবাহিতা কন্যা (${toBengaliNumerals(input.unmarriedDaughtersCount)} জন)`,
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
      relation: `বিবাহিতা কন্যা (${toBengaliNumerals(input.marriedDaughtersCount)} জন)`,
      count: input.marriedDaughtersCount,
      category: 'অগ্রাধিকার ক্রম ৩ (দায়ভাগ আইন)',
      fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
      shareRatio: 1.0,
      explanation: 'দায়ভাগ বিধান মতে পুত্র ও অবিবাহিতা কন্যা না থাকলে বিবাহিতা কন্যা ওয়ারিশ হন।',
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
    if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - পিতা থাকায় বঞ্চিত)`);

  } else if (input.hasMother) {
    // Tier 5: Mother
    steps.push('অগ্রাধিকার ক্রম ৫: অধস্তন ও পিতা না থাকায় মাতা সমস্ত সম্পত্তি পাবেন।');
    rawShares.push({
      relation: 'মাতা',
      count: 1,
      category: 'অগ্রাধিকার ক্রম ৫ (দায়ভাগ আইন)',
      fractionLabel: 'সম্পূর্ণ ১০০%',
      shareRatio: 1.0,
      explanation: 'পিতার অবর্তমানে মাতা হিন্দু দায়ভাগ আইন মতে সম্পূর্ণ সম্পত্তি পান।',
    });

    if (input.brothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন - মাতা থাকায় বঞ্চিত)`);

  } else if (input.brothersCount > 0) {
    // Tier 6: Full brother
    steps.push('অগ্রাধিকার ক্রম ৬: মাতা-পিতা ও সন্তানাদি না থাকায় সহোদর ভাইগণ সমহারে সমস্ত সম্পত্তি পাবেন।');
    rawShares.push({
      relation: `সহোদর ভাই (${toBengaliNumerals(input.brothersCount)} জন)`,
      count: input.brothersCount,
      category: 'অগ্রাধিকার ক্রম ৬ (দায়ভাগ আইন)',
      fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
      shareRatio: 1.0,
      explanation: 'নিকটবর্তী ওয়ারিশদের অনুপস্থিতিতে সহোদর ভাই সম্পত্তি পান।',
    });

    if (input.brotherSonsCount > 0) excludedHeirs.push(`ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন - ভাই থাকায় বঞ্চিত)`);
    if (input.sistersCount > 0) excludedHeirs.push(`বোন (${toBengaliNumerals(input.sistersCount)} জন - ভাই থাকায় বঞ্চিত)`);

  } else if (input.brotherSonsCount > 0) {
    // Tier 7: Brother's son
    steps.push('অগ্রাধিকার ক্রম ৭: ভাইয়ের পুত্র (ভাতিজা) সমহারে সমস্ত সম্পত্তি পাবেন।');
    rawShares.push({
      relation: `ভাইয়ের পুত্র (${toBengaliNumerals(input.brotherSonsCount)} জন)`,
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
      relation: `বোন (${toBengaliNumerals(input.sistersCount)} জন)`,
      count: input.sistersCount,
      category: 'অগ্রাধিকার ক্রম ৮ (দায়ভাগ আইন)',
      fractionLabel: 'সম্পূর্ণ ১০০% (সমহারে)',
      shareRatio: 1.0,
      explanation: 'অন্যান্য নিকটাত্মীয়ের অবর্তমানে বোন উত্তরাধিকারী হন।',
    });
  }

  // Convert to Real Assets
  const landInDecimal = assets.landUnit === 'acre' ? assets.landAmount * 100 : assets.landAmount;

  const heirResults: HeirShareResult[] = rawShares.map((item) => {
    const percent = item.shareRatio * 100;
    const perPersonPercent = percent / item.count;

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
      perPersonLand: totalLand / item.count,
      perPersonGold: totalGold / item.count,
      perPersonSilver: totalSilver / item.count,
      perPersonCash: totalCash / item.count,
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
      'এই ক্যালকুলেটরের ফলাফল প্রাথমিক ধারণা মাত্র। জটিল পারিবারিক কাঠামোর ক্ষেত্রে অভিজ্ঞ আইনজীবীর পরামর্শ নেওয়া উচিত।',
  };
}
