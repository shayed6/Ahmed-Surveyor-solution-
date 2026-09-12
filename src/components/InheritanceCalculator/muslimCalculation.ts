import {
  MuslimHeirsInput,
  PropertyAssets,
  HeirShareResult,
  CalculationOutcome,
} from './types';

// Helper to convert to Bengali numerals
export function toBengaliNumerals(num: number | string): string {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)]);
}

export function formatDecimalBn(val: number, maxDecimals: number = 3): string {
  const rounded = parseFloat(val.toFixed(maxDecimals));
  return toBengaliNumerals(rounded);
}

export function calculateMuslimInheritance(
  input: MuslimHeirsInput,
  assets: PropertyAssets
): CalculationOutcome {
  const steps: string[] = [];
  const excludedHeirs: string[] = [];
  const rawShares: {
    relation: string;
    count: number;
    category: string;
    fractionLabel: string;
    shareRatio: number; // raw share (e.g. 1/8 = 0.125)
    explanation: string;
    isAsaba?: boolean;
    isSpouse?: boolean;
  }[] = [];

  const hasChildren =
    input.sonsCount > 0 ||
    input.daughtersCount > 0 ||
    input.orphanedGrandsonsCount > 0 ||
    input.orphanedGranddaughtersCount > 0;

  const totalSiblings = input.fullBrothersCount + input.fullSistersCount;

  // 1. Spouse Share (স্বামী / স্ত্রী)
  if (input.deceasedGender === 'male') {
    const wives = Math.min(Math.max(input.wivesCount, 0), 4);
    if (wives > 0) {
      const share = hasChildren ? 1 / 8 : 1 / 4;
      const fractionLabel = hasChildren ? '১/৮' : '১/৪';
      steps.push(
        hasChildren
          ? `মৃত ব্যক্তির সন্তান থাকায় স্ত্রী/স্ত্রীগণ সম্মিলিতভাবে পাবেন ১/৮ অংশ (${fractionLabel})।`
          : `মৃত ব্যক্তির কোনো সন্তান না থাকায় স্ত্রী/স্ত্রীগণ সম্মিলিতভাবে পাবেন ১/৪ অংশ (${fractionLabel})।`
      );
      rawShares.push({
        relation: wives > 1 ? `স্ত্রী (${toBengaliNumerals(wives)} জন)` : 'স্ত্রী',
        count: wives,
        category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত অংশীদার)',
        fractionLabel,
        shareRatio: share,
        explanation: hasChildren
          ? 'সন্তান থাকায় স্ত্রী ১/৮ অংশ পান (সূরা আন-নিসা: ১২)'
          : 'সন্তান না থাকায় স্ত্রী ১/৪ অংশ পান (সূরা আন-নিসা: ১২)',
        isSpouse: true,
      });
    }
  } else {
    if (input.hasHusband) {
      const share = hasChildren ? 1 / 4 : 1 / 2;
      const fractionLabel = hasChildren ? '১/৪' : '১/২';
      steps.push(
        hasChildren
          ? `মৃত ব্যক্তির সন্তান থাকায় স্বামী পাবেন ১/৪ অংশ (${fractionLabel})।`
          : `মৃত ব্যক্তির কোনো সন্তান না থাকায় স্বামী পাবেন ১/২ অংশ (${fractionLabel})।`
      );
      rawShares.push({
        relation: 'স্বামী',
        count: 1,
        category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত অংশীদার)',
        fractionLabel,
        shareRatio: share,
        explanation: hasChildren
          ? 'সন্তান থাকায় স্বামী ১/৪ অংশ পান (সূরা আন-নিসা: ১২)'
          : 'সন্তান না থাকায় স্বামী ১/২ অংশ পান (সূরা আন-নিসা: ১২)',
        isSpouse: true,
      });
    }
  }

  // 2. Mother Share (মাতা)
  if (input.hasMother) {
    let motherShare = 1 / 6;
    let motherFraction = '১/৬';
    let motherExpl = '';

    if (hasChildren || totalSiblings >= 2) {
      motherShare = 1 / 6;
      motherFraction = '১/৬';
      motherExpl = hasChildren
        ? 'মৃত ব্যক্তির সন্তান থাকায় মাতা ১/৬ অংশ পান (সূরা আন-নিসা: ১১)'
        : 'একাধিক ভাই/বোন থাকায় মাতা ১/৬ অংশ পান (সূরা আন-নিসা: ১১)';
    } else {
      // Check Umariyyatan special case: only Spouse + Father + Mother
      const spouseExists =
        (input.deceasedGender === 'male' && input.wivesCount > 0) ||
        (input.deceasedGender === 'female' && input.hasHusband);

      if (spouseExists && input.hasFather && !hasChildren && totalSiblings === 0) {
        // Mother gets 1/3 of remainder after spouse
        const spouseShare = input.deceasedGender === 'male' ? 1 / 4 : 1 / 2;
        motherShare = (1 - spouseShare) * (1 / 3);
        motherFraction = 'অবশিষ্টের ১/৩';
        motherExpl = 'উমারিয়্যাতান নিয়ম অনুযায়ী স্বামী/স্ত্রীকে দেওয়ার পর অবশিষ্ট সম্পত্তির ১/৩ অংশ মাতা পান।';
      } else {
        motherShare = 1 / 3;
        motherFraction = '১/৩';
        motherExpl = 'সন্তান না থাকায় এবং একাধিক ভাই-বোন না থাকায় মাতা ১/৩ অংশ পান (সূরা আন-নিসা: ১১)';
      }
    }

    steps.push(`মাতা হিসেবে প্রাপ্য নির্ধারিত অংশ: ${motherFraction}।`);
    rawShares.push({
      relation: 'মাতা',
      count: 1,
      category: 'যাবিল ফুরুজ (কুরআন নির্ধারিত অংশীদার)',
      fractionLabel: motherFraction,
      shareRatio: motherShare,
      explanation: motherExpl,
    });
  }

  // 3. Father Share (পিতা)
  let fatherTakesResidualAsAsaba = false;
  if (input.hasFather) {
    if (input.sonsCount > 0 || input.orphanedGrandsonsCount > 0) {
      // With son: Father gets 1/6 only as Zabil Furuz
      steps.push('পুত্র বর্তমান থাকায় পিতা নির্ধারিত ১/৬ অংশ পাবেন।');
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '১/৬',
        shareRatio: 1 / 6,
        explanation: 'পুত্র/পৌত্র থাকায় পিতা নির্ধারিত ১/৬ অংশ পান।',
      });
    } else if (input.daughtersCount > 0 || input.orphanedGranddaughtersCount > 0) {
      // With daughters only: Father gets 1/6 + residual
      steps.push('কন্যা বর্তমান থাকায় পিতা প্রথমে ১/৬ অংশ এবং অন্যান্য ফুরুজ বণ্টনের পর অবশিষ্ট থাকলে তা আসাবা হিসেবে পাবেন।');
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'যাবিল ফুরুজ ও আসাবা',
        fractionLabel: '১/৬ + অবশিষ্ট',
        shareRatio: 1 / 6,
        explanation: 'পুত্র না থাকায় শুধু কন্যাদের ক্ষেত্রে পিতা ১/৬ এর পর অবশিষ্ট অংশও পান।',
      });
      fatherTakesResidualAsAsaba = true;
    } else {
      // No children: Father is Asaba (takes all remaining)
      steps.push('সন্তান না থাকায় পিতা আসাবা (অবশিষ্টভোগী) হিসেবে যাবিল ফুরুজের পর সমস্ত অবশিষ্ট সম্পত্তি পাবেন।');
      fatherTakesResidualAsAsaba = true;
    }
  }

  // 4. Grandparents Exclusion (দাদা / দাদী / নানী)
  if (input.hasPaternalGrandfather) {
    if (input.hasFather) {
      excludedHeirs.push('দাদা (পিতা জীবিত থাকায় মাহজুব/বঞ্চিত)');
    } else if (!input.hasFather && !hasChildren && rawShares.every((s) => s.relation !== 'পিতা')) {
      // Grandfather takes father's role
      fatherTakesResidualAsAsaba = true;
      steps.push('পিতা না থাকায় দাদা আসাবা হিসেবে অন্তর্ভুক্ত হবেন।');
    }
  }

  if (input.hasPaternalGrandmother) {
    if (input.hasMother || input.hasFather) {
      excludedHeirs.push('দাদী (পিতা অথবা মাতা জীবিত থাকায় বঞ্চিত)');
    } else {
      rawShares.push({
        relation: 'দাদী (পিতার মাতা)',
        count: 1,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '১/৬',
        shareRatio: 1 / 6,
        explanation: 'মাতা ও পিতা না থাকায় দাদী ১/৬ পান।',
      });
    }
  }

  if (input.hasMaternalGrandmother) {
    if (input.hasMother) {
      excludedHeirs.push('নানী (মাতা জীবিত থাকায় বঞ্চিত)');
    } else {
      rawShares.push({
        relation: 'নানী (মাতার মাতা)',
        count: 1,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '১/৬',
        shareRatio: 1 / 6,
        explanation: 'মাতা না থাকায় নানী ১/৬ পান।',
      });
    }
  }

  // 5. Daughters when NO sons exist
  const totalSons = input.sonsCount + input.orphanedGrandsonsCount;
  if (totalSons === 0 && input.daughtersCount > 0) {
    if (input.daughtersCount === 1) {
      steps.push('একমাত্র কন্যা হওয়ায় নির্ধারিত ১/২ অংশ পাবেন।');
      rawShares.push({
        relation: 'একমাত্র কন্যা',
        count: 1,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '১/২',
        shareRatio: 1 / 2,
        explanation: 'পুত্রবিহীন একমাত্র কন্যা ১/২ অংশ পান (সূরা আন-নিসা: ১১)',
      });
    } else {
      steps.push(
        `একাধিক কন্যা (${toBengaliNumerals(input.daughtersCount)} জন) থাকায় তারা সম্মিলিতভাবে ২/৩ অংশ পাবেন।`
      );
      rawShares.push({
        relation: `কন্যা (${toBengaliNumerals(input.daughtersCount)} জন)`,
        count: input.daughtersCount,
        category: 'যাবিল ফুরুজ',
        fractionLabel: '২/৩',
        shareRatio: 2 / 3,
        explanation: 'দুই বা ততোধিক কন্যা সম্মিলিতভাবে ২/৩ অংশ পান (সূরা আন-নিসা: ১১)',
      });
    }
  }

  // 6. Exclusion of Siblings & Uncles by Sons or Father
  if (input.sonsCount > 0 || input.orphanedGrandsonsCount > 0 || input.hasFather) {
    if (input.fullBrothersCount > 0) excludedHeirs.push(`সহোদর ভাই (${toBengaliNumerals(input.fullBrothersCount)} জন - পুত্র/পিতা থাকায় বঞ্চিত)`);
    if (input.fullSistersCount > 0) excludedHeirs.push(`সহোদর বোন (${toBengaliNumerals(input.fullSistersCount)} জন - পুত্র/পিতা থাকায় বঞ্চিত)`);
    if (input.paternalUnclesCount > 0) excludedHeirs.push(`চাচা (${toBengaliNumerals(input.paternalUnclesCount)} জন - পুত্র/পিতা থাকায় বঞ্চিত)`);
  }

  // Calculate sum of fixed Zabil Furuz shares so far
  const fixedSharesSum = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);

  // 7. Check Residuary (Asaba) distribution
  let remainingAfterFixed = Math.max(0, 1 - fixedSharesSum);

  if (totalSons > 0) {
    // Sons are Asaba!
    if (input.daughtersCount > 0) {
      // Both Sons and Daughters share residual in 2:1 ratio
      const sonWeight = input.sonsCount * 2 + input.orphanedGrandsonsCount * 2;
      const daughterWeight = input.daughtersCount * 1 + input.orphanedGranddaughtersCount * 1;
      const totalUnits = sonWeight + daughterWeight;

      const sonsTotalRatio = remainingAfterFixed * (sonWeight / totalUnits);
      const daughtersTotalRatio = remainingAfterFixed * (daughterWeight / totalUnits);

      steps.push(
        `পুত্র (${toBengaliNumerals(input.sonsCount)}) ও কন্যা (${toBengaliNumerals(input.daughtersCount)}) অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পাবেন।`
      );

      rawShares.push({
        relation: `পুত্র (${toBengaliNumerals(input.sonsCount)} জন)`,
        count: input.sonsCount,
        category: 'আসাবা বিল গাইর (অবশিষ্টভোগী)',
        fractionLabel: `অবশিষ্টের ${(sonWeight / totalUnits * 100).toFixed(1)}% (প্রতি পুত্র ২ ভাগ)`,
        shareRatio: sonsTotalRatio,
        explanation: 'পুত্র ও কন্যা একত্রে অবশিষ্ট সম্পত্তি ২:১ অনুপাতে ভোগ করে (সূরা আন-নিসা: ১১)',
        isAsaba: true,
      });

      rawShares.push({
        relation: `কন্যা (${toBengaliNumerals(input.daughtersCount)} জন)`,
        count: input.daughtersCount,
        category: 'আসাবা বিল গাইর (অবশিষ্টভোগী)',
        fractionLabel: `অবশিষ্টের ${(daughterWeight / totalUnits * 100).toFixed(1)}% (প্রতি কন্যা ১ ভাগ)`,
        shareRatio: daughtersTotalRatio,
        explanation: 'পুত্র ও কন্যা একত্রে অবশিষ্ট সম্পত্তি ২:১ অনুপাতে ভোগ করে (সূরা আন-নিসা: ১১)',
        isAsaba: true,
      });
      remainingAfterFixed = 0;
    } else {
      // Only Sons (No daughters)
      steps.push(
        `পুত্র (${toBengaliNumerals(input.sonsCount)} জন) আসাবা হিসেবে নির্ধারিত অংশের পর সমস্ত অবশিষ্ট পাবেন।`
      );
      rawShares.push({
        relation: `পুত্র (${toBengaliNumerals(input.sonsCount)} জন)`,
        count: input.sonsCount,
        category: 'আসাবা (অবশিষ্টভোগী)',
        fractionLabel: 'সম্পূর্ণ অবশিষ্ট অংশ',
        shareRatio: remainingAfterFixed,
        explanation: 'কোনো কন্যা না থাকায় পুত্রগণ সমহারে অবশিষ্ট সম্পত্তি পান।',
        isAsaba: true,
      });
      remainingAfterFixed = 0;
    }
  } else if (fatherTakesResidualAsAsaba && remainingAfterFixed > 0) {
    // Father gets residual
    const fatherIdx = rawShares.findIndex((s) => s.relation.startsWith('পিতা'));
    if (fatherIdx >= 0) {
      rawShares[fatherIdx].shareRatio += remainingAfterFixed;
      rawShares[fatherIdx].fractionLabel = '১/৬ + অবশিষ্ট সম্পূর্ণ';
    } else {
      rawShares.push({
        relation: 'পিতা',
        count: 1,
        category: 'আসাবা (অবশিষ্টভোগী)',
        fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
        shareRatio: remainingAfterFixed,
        explanation: 'কোনো সন্তান না থাকায় পিতা সমস্ত অবশিষ্ট সম্পত্তি আসাবা হিসেবে পান।',
        isAsaba: true,
      });
    }
    steps.push('পিতা আসাবা হিসেবে সমুদয় অবশিষ্ট সম্পত্তি পেয়েছেন।');
    remainingAfterFixed = 0;
  } else if (!hasChildren && !input.hasFather) {
    // Siblings or Uncles can take Asaba
    if (input.fullBrothersCount > 0 || input.fullSistersCount > 0) {
      if (input.fullBrothersCount > 0 && input.fullSistersCount > 0) {
        const broUnits = input.fullBrothersCount * 2;
        const sisUnits = input.fullSistersCount * 1;
        const totalU = broUnits + sisUnits;

        rawShares.push({
          relation: `সহোদর ভাই (${toBengaliNumerals(input.fullBrothersCount)} জন)`,
          count: input.fullBrothersCount,
          category: 'আসাবা বিল গাইর',
          fractionLabel: 'অবশিষ্টের ২ ভাগ',
          shareRatio: remainingAfterFixed * (broUnits / totalU),
          explanation: 'সন্তান ও পিতা না থাকায় ভাই-বোন অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পান।',
          isAsaba: true,
        });
        rawShares.push({
          relation: `সহোদর বোন (${toBengaliNumerals(input.fullSistersCount)} জন)`,
          count: input.fullSistersCount,
          category: 'আসাবা বিল গাইর',
          fractionLabel: 'অবশিষ্টের ১ ভাগ',
          shareRatio: remainingAfterFixed * (sisUnits / totalU),
          explanation: 'সন্তান ও পিতা না থাকায় ভাই-বোন অবশিষ্ট সম্পত্তি ২:১ অনুপাতে পান।',
          isAsaba: true,
        });
        remainingAfterFixed = 0;
      } else if (input.fullBrothersCount > 0) {
        rawShares.push({
          relation: `সহোদর ভাই (${toBengaliNumerals(input.fullBrothersCount)} জন)`,
          count: input.fullBrothersCount,
          category: 'আসাবা',
          fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
          shareRatio: remainingAfterFixed,
          explanation: 'সন্তান ও পিতা না থাকায় ভাই সমহারে অবশিষ্ট সম্পত্তি পান।',
          isAsaba: true,
        });
        remainingAfterFixed = 0;
      } else if (input.fullSistersCount > 0) {
        // Sisters alone: 1 sister = 1/2, 2+ = 2/3
        const sisShare = input.fullSistersCount === 1 ? 1 / 2 : 2 / 3;
        rawShares.push({
          relation: `সহোদর বোন (${toBengaliNumerals(input.fullSistersCount)} জন)`,
          count: input.fullSistersCount,
          category: 'যাবিল ফুরুজ',
          fractionLabel: input.fullSistersCount === 1 ? '১/২' : '২/৩',
          shareRatio: sisShare,
          explanation: 'কোনো ভাই বা সন্তান না থাকায় বোনগণ নির্ধারিত অংশ পান।',
        });
      }
    } else if (input.paternalUnclesCount > 0) {
      rawShares.push({
        relation: `চাচা (${toBengaliNumerals(input.paternalUnclesCount)} জন)`,
        count: input.paternalUnclesCount,
        category: 'আসাবা',
        fractionLabel: 'সম্পূর্ণ অবশিষ্ট',
        shareRatio: remainingAfterFixed,
        explanation: 'উর্ধ্বতন বা অধস্তন কোনো নিকটাত্মীয় না থাকায় চাচা আসাবা হিসেবে অবশিষ্ট পান।',
        isAsaba: true,
      });
      remainingAfterFixed = 0;
    }
  }

  // 8. Awl (আউল) check: sum of shares > 1
  let totalCalculatedShare = rawShares.reduce((acc, curr) => acc + curr.shareRatio, 0);

  if (totalCalculatedShare > 1.0001) {
    steps.push(
      `[আউল / Awl নিয়ম প্রয়োগ]: ওয়ারিশদের নির্ধারিত অংশের যোগফল ${(totalCalculatedShare * 100).toFixed(1)}% (যা ১-এর বেশি)। তাই ফারায়েজ শাস্ত্রের নিয়ম অনুযায়ী প্রত্যেকের অংশ আনুপাতিক হারে হ্রাস করা হয়েছে।`
    );
    rawShares.forEach((s) => {
      s.shareRatio = s.shareRatio / totalCalculatedShare;
    });
    totalCalculatedShare = 1;
  } else if (totalCalculatedShare < 0.9999 && rawShares.length > 0) {
    // 9. Radd (রদ্দ) check: sum < 1 and no Asaba exists
    const nonSpouseShares = rawShares.filter((s) => !s.isSpouse);
    if (nonSpouseShares.length > 0) {
      const spouseShare = rawShares.filter((s) => s.isSpouse).reduce((acc, c) => acc + c.shareRatio, 0);
      const remainingForRadd = 1 - spouseShare;
      const nonSpouseTotal = nonSpouseShares.reduce((acc, c) => acc + c.shareRatio, 0);

      steps.push(
        '[রদ্দ / Radd নিয়ম প্রয়োগ]: আসাবা অনুপস্থিত থাকায় এবং নির্ধারিত অংশ দেওয়ার পর অতিরিক্ত সম্পত্তি থাকায় তা স্বামী/স্ত্রী ছাড়া অন্যান্য ওয়ারিশদের মাঝে তাদের হকের অনুপাতে পুনরায় বণ্টন করা হয়েছে।'
      );

      nonSpouseShares.forEach((s) => {
        s.shareRatio = (s.shareRatio / nonSpouseTotal) * remainingForRadd;
      });
      totalCalculatedShare = 1;
    } else {
      // Only spouse exists: spouse takes remainder in modern state practice
      rawShares.forEach((s) => {
        s.shareRatio = 1.0;
      });
      totalCalculatedShare = 1;
    }
  }

  // Final Conversion to Real Assets
  const landInDecimal = assets.landUnit === 'acre' ? assets.landAmount * 100 : assets.landAmount;

  const heirResults: HeirShareResult[] = rawShares.map((item) => {
    const percent = item.shareRatio * 100;
    const perPersonPercent = percent / item.count;

    const totalLand = (landInDecimal * item.shareRatio);
    const totalGold = (assets.goldVori * item.shareRatio);
    const totalSilver = (assets.silverVori * item.shareRatio);
    const totalCash = (assets.cashBDT * item.shareRatio);

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

  return {
    religion: 'muslim',
    heirResults,
    steps,
    excludedHeirs,
    totalDistributedPercent: totalCalculatedShare * 100,
    disclaimer:
      'এই ক্যালকুলেটরের ফলাফল প্রাথমিক ধারণা মাত্র। জটিল পারিবারিক কাঠামোর ক্ষেত্রে অভিজ্ঞ আইনজীবীর পরামর্শ নেওয়া উচিত।',
  };
}
