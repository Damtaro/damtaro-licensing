// Presentation only. Prices, order data and approved contracts stay in their existing sources.
export const licensePresentation = {
  creator: {
    description: 'For individual creators publishing content on their own channels.',
    benefits: ['Own channels & videos', 'Monetization allowed', 'Multiple own-channel posts', 'No credit required', 'MP3 + WAV'],
    note: 'Own channels only. No client or brand projects.',
    limit: 'Own channels only; no client, company or brand commercial projects. Special uses require Custom Licensing.',
    files: 'MP3 + WAV. Stems are not included.',
  },
  business: {
    description: 'For brands, clients and standard commercial projects.',
    benefits: ['Client & company projects', 'Brands & sponsored content', 'Standard digital advertising', 'Official stems included', 'No credit required'],
    note: 'One commercial project or campaign. Stems subject to availability under License Terms.',
    limit: 'One commercial project or campaign. Independent reuse needs another applicable license. Film, TV, radio, broadcast, games, apps, software, large campaigns and exclusivity require Custom Licensing.',
    files: 'MP3 + WAV, plus official stems when available under License Terms. Stems are for the licensed project only.',
  },
};
