import { describe, expect, it } from 'vitest';
import type { ApiEntry } from '@/data/types';
import {
  getAllTags,
  getDifficultyColor,
  getPricingColor,
  searchApis,
} from '../utils';

const createApi = (overrides: Partial<ApiEntry> = {}): ApiEntry => ({
  id: 'test-api',
  name: 'Test API',
  description: 'Test description',
  longDescription: 'Test long description',
  category: 'test',
  tags: ['test'],
  auth: 'none',
  pricing: 'free',
  https: true,
  cors: 'yes',
  docsUrl: 'https://example.com/docs',
  website: 'https://example.com',
  useCases: ['Testing'],
  sampleRequest: {
    method: 'GET',
    url: 'https://example.com',
  },
  sampleResponse: {
    status: 200,
    body: {},
  },
  difficulty: 'easy',
  apiTranslator: {
    whatItDoes: 'Test',
    dataReturned: 'Test',
    buildWith: ['Test'],
    whenNotToUse: 'Test',
    authExplained: 'None',
    scenarios: ['Test'],
  },
  ...overrides,
});

describe('searchApis', () => {
  const apis = [
    createApi({
      id: 'weather',
      name: 'Weather API',
      description: 'Get weather information',
      category: 'weather',
      tags: ['forecast', 'climate'],
      auth: 'api-key',
      pricing: 'freemium',
      difficulty: 'moderate',
    }),
    createApi({
      id: 'github',
      name: 'GitHub API',
      description: 'Access repositories and users',
      category: 'development',
      tags: ['git', 'code'],
      auth: 'oauth2',
      pricing: 'free',
      difficulty: 'advanced',
    }),
    createApi({
      id: 'cat',
      name: 'Cat Facts API',
      description: 'Interesting facts about cats',
      category: 'animals',
      tags: ['cats', 'facts'],
      auth: 'none',
      pricing: 'paid',
      difficulty: 'easy',
    }),
  ];

  it('matches keywords in the name case-insensitively', () => {
    expect(searchApis(apis, 'WEATHER').map((api) => api.id)).toEqual(['weather']);
  });

  it('matches keywords in the description', () => {
    expect(searchApis(apis, 'repositories').map((api) => api.id)).toEqual(['github']);
  });

  it('matches keywords in tags', () => {
    expect(searchApis(apis, 'FORECAST').map((api) => api.id)).toEqual(['weather']);
  });

  it('matches keywords in the category', () => {
    expect(searchApis(apis, 'ANIMALS').map((api) => api.id)).toEqual(['cat']);
  });

  it('returns all APIs when the query is empty', () => {
    expect(searchApis(apis, '')).toHaveLength(3);
  });

  it('returns an empty array when nothing matches', () => {
    expect(searchApis(apis, 'does-not-exist')).toEqual([]);
  });

  it('filters by category, pricing, auth, and difficulty', () => {
    expect(searchApis(apis, '', 'weather').map((api) => api.id)).toEqual(['weather']);
    expect(searchApis(apis, '', undefined, 'free').map((api) => api.id)).toEqual(['github']);
    expect(searchApis(apis, '', undefined, undefined, 'none').map((api) => api.id)).toEqual(['cat']);
    expect(searchApis(apis, '', undefined, undefined, undefined, 'easy').map((api) => api.id)).toEqual(['cat']);
  });

  it('supports multiple filters together', () => {
    expect(
      searchApis(apis, 'api', 'weather', 'freemium', 'api-key', 'moderate').map(
        (api) => api.id
      )
    ).toEqual(['weather']);
  });

  it('sorts by name alphabetically', () => {
    expect(
      searchApis(apis, '', undefined, undefined, undefined, undefined, 'name').map(
        (api) => api.name
      )
    ).toEqual(['Cat Facts API', 'GitHub API', 'Weather API']);
  });

  it('sorts by difficulty from easy to advanced', () => {
    expect(
      searchApis(apis, '', undefined, undefined, undefined, undefined, 'difficulty').map(
        (api) => api.difficulty
      )
    ).toEqual(['easy', 'moderate', 'advanced']);
  });

  it('sorts by pricing from free to paid', () => {
    expect(
      searchApis(apis, '', undefined, undefined, undefined, undefined, 'pricing').map(
        (api) => api.pricing
      )
    ).toEqual(['free', 'freemium', 'paid']);
  });
});

describe('getAllTags', () => {
  it('returns unique tags in alphabetical order', () => {
    const apis = [
      createApi({ tags: ['weather', 'api', 'common'] }),
      createApi({ tags: ['common', 'animals', 'api'] }),
    ];

    expect(getAllTags(apis)).toEqual(['animals', 'api', 'common', 'weather']);
  });

  it('returns an empty array when there are no APIs', () => {
    expect(getAllTags([])).toEqual([]);
  });
});

describe('getDifficultyColor', () => {
  it('returns the correct color classes for each difficulty', () => {
    expect(getDifficultyColor('easy')).toBe(
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    );
    expect(getDifficultyColor('moderate')).toBe(
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    );
    expect(getDifficultyColor('advanced')).toBe(
      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    );
  });
});

describe('getPricingColor', () => {
  it('returns the correct color classes for each pricing type', () => {
    expect(getPricingColor('free')).toBe(
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    );
    expect(getPricingColor('freemium')).toBe(
      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    );
    expect(getPricingColor('paid')).toBe(
      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    );
  });
});
