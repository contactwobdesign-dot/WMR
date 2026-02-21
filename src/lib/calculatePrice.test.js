/**
 * Test examples for calculatePrice functions
 * These are example usage patterns, not automated tests
 */

import { calculateFullPrice, evaluateOffer } from './calculatePrice';

// Example 1: Tech YouTuber with mid-tier stats
console.log('=== Example 1: Tech YouTuber ===');
const example1 = calculateFullPrice({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6, // 6%
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'us',
});

console.log('Fair Rate:', example1.average);
console.log('Range: $', example1.min, '-', example1.max);
console.log('Breakdown:', example1.breakdown);
console.log('\n');

// Example 2: Finance YouTuber (highest CPM niche)
console.log('=== Example 2: Finance YouTuber ===');
const example2 = calculateFullPrice({
  platform: 'youtube',
  niche: 'finance',
  subscribers: 100000,
  averageViews: 50000,
  engagementRate: 8, // 8%
  contentType: 'dedicated',
  companySize: 'enterprise',
  audienceLocation: 'us',
});

console.log('Fair Rate:', example2.average);
console.log('Range: $', example2.min, '-', example2.max);
console.log('Breakdown:', example2.breakdown);
console.log('\n');

// Example 3: Gaming streamer (lower CPM)
console.log('=== Example 3: Gaming Streamer ===');
const example3 = calculateFullPrice({
  platform: 'youtube',
  niche: 'gaming',
  subscribers: 200000,
  averageViews: 30000,
  engagementRate: 4, // 4%
  contentType: 'mention',
  companySize: 'medium',
  audienceLocation: 'mixed',
});

console.log('Fair Rate:', example3.average);
console.log('Range: $', example3.min, '-', example3.max);
console.log('Breakdown:', example3.breakdown);
console.log('\n');

// Example 4: Evaluate a good offer
console.log('=== Example 4: Evaluating a GOOD offer ===');
const evaluation1 = evaluateOffer({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'us',
  offeredPrice: 600, // Close to fair value
});

console.log('Verdict:', evaluation1.verdict);
console.log('Title:', evaluation1.verdictConfig.title);
console.log('Percentage:', evaluation1.percentageOfValue + '%');
console.log('Message:', evaluation1.message);
console.log('Company Context:', evaluation1.companyContext);
console.log('\n');

// Example 5: Evaluate a lowball offer
console.log('=== Example 5: Evaluating a WAY TOO LOW offer ===');
const evaluation2 = evaluateOffer({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'enterprise',
  audienceLocation: 'us',
  offeredPrice: 200, // Way too low
});

console.log('Verdict:', evaluation2.verdict);
console.log('Title:', evaluation2.verdictConfig.title);
console.log('Percentage:', evaluation2.percentageOfValue + '%');
console.log('Message:', evaluation2.message);
console.log('Company Context:', evaluation2.companyContext);
console.log('Leaving on table: $', evaluation2.difference);
console.log('\n');

// Example 6: Small nano creator
console.log('=== Example 6: Nano Creator (< 10k) ===');
const example6 = calculateFullPrice({
  platform: 'instagram',
  niche: 'beauty',
  subscribers: 8000,
  averageViews: 3000,
  engagementRate: 9, // Excellent engagement
  contentType: 'integration',
  companySize: 'startup',
  audienceLocation: 'us',
});

console.log('Fair Rate:', example6.average);
console.log('Range: $', example6.min, '-', example6.max);
console.log('Note: Nano creators get 1.2x multiplier for high engagement');
console.log('\n');

// Example 7: Mega creator (1M+)
console.log('=== Example 7: Mega Creator (1M+) ===');
const example7 = calculateFullPrice({
  platform: 'youtube',
  niche: 'lifestyle',
  subscribers: 2000000,
  averageViews: 500000,
  engagementRate: 3, // Lower engagement at scale
  contentType: 'integration',
  companySize: 'enterprise',
  audienceLocation: 'us',
});

console.log('Fair Rate:', example7.average);
console.log('Range: $', example7.min, '-', example7.max);
console.log('Note: Mega creators get 0.7x multiplier but massive reach');
console.log('\n');

// Example 8: International audience impact
console.log('=== Example 8: India/SEA audience ===');
const example8 = calculateFullPrice({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 100000,
  averageViews: 50000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'sea_india',
});

console.log('Fair Rate:', example8.average);
console.log('Location Advice:', example8.breakdown.locationAdvice);
console.log('Note: 0.2x multiplier for India/SEA, but consider volume');
console.log('\n');

/**
 * To run these examples:
 * 1. Uncomment the console.logs
 * 2. Import this file in your app
 * 3. Or use Node.js: node src/lib/calculatePrice.test.js
 */
