export function isCustomFieldRelevant(requestType, field) {
  return !['sound', 'timecode'].includes(field) || ['Isolated Sound', 'Custom Edit'].includes(requestType);
}

export function isSafeReferenceUrl(value) {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password;
  } catch { return false; }
}

// Retain the existing Contact transport schema. No hidden asset IDs are generated.
export function createCustomRequestBody(values, track) {
  const asset = track ? `${track.title} (Catalog ID: ${track.id})`
    : values.asset === 'new' ? 'Original composition — no existing track' : values.asset === 'reference' ? (values.asset_reference || '').trim() : '';
  const details = [
    ['Track / asset reference', asset], ['Request type', values.request_type],
    ['Project description', values.description], ['Intended use', values.intended_use],
    ['Instrument or sound', isCustomFieldRelevant(values.request_type, 'sound') ? values.sound : ''],
    ['Relevant timecode', isCustomFieldRelevant(values.request_type, 'timecode') ? values.timecode : ''],
    ['Territory and distribution', values.distribution], ['Deadline', values.deadline],
    ['Reference URL', values.reference_url],
  ];
  const body = new FormData();
  body.set('name', values.name.trim());
  body.set('email', values.email.trim());
  body.set('project', 'Custom Audio Request');
  body.set('message', details.filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value.trim()}`).join('\n\n'));
  body.set('_gotcha', values._gotcha || '');
  return body;
}
