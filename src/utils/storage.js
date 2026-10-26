export const DEFAULT_LOBOLA_ITEMS = [
  {
    id: 'izibizo',
    name: 'Izibizo',
    description: "Gifts for the bride's mother & elders",
    amount: 5000,
    category: 'gifts',
  },
  {
    id: 'ilobolo',
    name: 'Ilobolo',
    description: 'Main bride price agreement (cattle equivalent)',
    amount: 70000,
    category: 'bride_price',
  },
  {
    id: 'attire',
    name: 'Traditional Attire',
    description: 'Umembeso & ceremonial garments',
    amount: 10000,
    category: 'attire',
  },
  {
    id: 'gifts',
    name: 'Gifts and Tokens',
    description: 'Blankets, shawls, and family tokens',
    amount: 5000,
    category: 'tokens',
  },
  {
    id: 'transport',
    name: 'Transport & Logistics',
    description: 'Delegation travel & hospitality',
    amount: 5000,
    category: 'logistics',
  },
];

export const REGIONS_INFO = {
  'KwaZulu-Natal': {
    priceRange: 'R9,500 – R12,000 / beast',
    minPrice: 9500,
    maxPrice: 12000,
  },
  Gauteng: {
    priceRange: 'R10,000 – R13,500 / beast',
    minPrice: 10000,
    maxPrice: 13500,
  },
  'Eastern Cape': {
    priceRange: 'R9,000 – R11,500 / beast',
    minPrice: 9000,
    maxPrice: 11500,
  },
  'Western Cape': {
    priceRange: 'R10,500 – R14,000 / beast',
    minPrice: 10500,
    maxPrice: 14000,
  },
  Limpopo: {
    priceRange: 'R8,500 – R11,000 / beast',
    minPrice: 8500,
    maxPrice: 11000,
  },
  'Free State': {
    priceRange: 'R9,200 – R11,800 / beast',
    minPrice: 9200,
    maxPrice: 11800,
  },
  Mpumalanga: {
    priceRange: 'R9,000 – R12,200 / beast',
    minPrice: 9000,
    maxPrice: 12200,
  },
};

export const DEFAULT_STATE = {
  planningType: 'Both — Lobola then Wedding',
  journeyType: 'Me and my partner — joint planning',
  userCulture: 'Zulu',
  partnerCulture: 'Xhosa',
  userRegion: 'KwaZulu-Natal',
  userName: 'Thandazani',
  partnerName: 'Lindiwe',
  fundBalance: 30000,
  lobolaTarget: 95000,
  weddingGoal: 120000,
  groomNet: 25000,
  familyExpectation: 'Moderate',
  customItems: DEFAULT_LOBOLA_ITEMS,
};

const STORAGE_KEYS = {
  planningType: 'planningType',
  journeyType: 'journeyType',
  userCulture: 'userCulture',
  partnerCulture: 'partnerCulture',
  userRegion: 'userRegion',
  userName: 'userName',
  partnerName: 'partnerName',
  fundBalance: 'fundBalance',
  lobolaTarget: 'lobolaTarget',
  weddingGoal: 'weddingGoal',
  groomNet: 'groomNet',
  familyExpectation: 'familyExpectation',
  customItems: 'customItems',
};

export function getStoredState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;

  try {
    const planningType =
      localStorage.getItem(STORAGE_KEYS.planningType) || DEFAULT_STATE.planningType;
    const journeyType =
      localStorage.getItem(STORAGE_KEYS.journeyType) || DEFAULT_STATE.journeyType;
    const userCulture =
      localStorage.getItem(STORAGE_KEYS.userCulture) || DEFAULT_STATE.userCulture;
    const partnerCulture =
      localStorage.getItem(STORAGE_KEYS.partnerCulture) ||
      DEFAULT_STATE.partnerCulture;
    const userRegion =
      localStorage.getItem(STORAGE_KEYS.userRegion) || DEFAULT_STATE.userRegion;
    const userName =
      localStorage.getItem(STORAGE_KEYS.userName) || DEFAULT_STATE.userName;
    const partnerName =
      localStorage.getItem(STORAGE_KEYS.partnerName) || DEFAULT_STATE.partnerName;
    const fundBalance = Number(
      localStorage.getItem(STORAGE_KEYS.fundBalance) || DEFAULT_STATE.fundBalance
    );
    const lobolaTarget = Number(
      localStorage.getItem(STORAGE_KEYS.lobolaTarget) || DEFAULT_STATE.lobolaTarget
    );
    const weddingGoal = Number(
      localStorage.getItem(STORAGE_KEYS.weddingGoal) || DEFAULT_STATE.weddingGoal
    );
    const groomNet = Number(
      localStorage.getItem(STORAGE_KEYS.groomNet) || DEFAULT_STATE.groomNet
    );
    const familyExpectation =
      localStorage.getItem(STORAGE_KEYS.familyExpectation) ||
      DEFAULT_STATE.familyExpectation;

    let customItems = DEFAULT_LOBOLA_ITEMS;
    const storedItems = localStorage.getItem(STORAGE_KEYS.customItems);
    if (storedItems) {
      try {
        customItems = JSON.parse(storedItems);
      } catch {
        customItems = DEFAULT_LOBOLA_ITEMS;
      }
    }

    return {
      planningType,
      journeyType,
      userCulture,
      partnerCulture,
      userRegion,
      userName,
      partnerName,
      fundBalance,
      lobolaTarget,
      weddingGoal,
      groomNet,
      familyExpectation,
      customItems,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveStateKey(key, value) {
  if (typeof window === 'undefined') return;
  try {
    if (key === 'customItems') {
      localStorage.setItem(STORAGE_KEYS.customItems, JSON.stringify(value));
    } else {
      localStorage.setItem(STORAGE_KEYS[key], String(value));
    }
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
}

export function resetToDefaultState() {
  if (typeof window === 'undefined') return;
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.error('Error resetting state', e);
  }
}
