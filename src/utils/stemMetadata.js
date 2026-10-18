// Editorial metadata only. Authorized rights/asset records remain outside the frontend.
// A UI status is not evidence of ownership or permission to deliver a file.
export function getVerifiedStemDetails(track) {
  const stems = track?.officialStems;
  if (stems?.verificationStatus !== 'verified' || !Number.isInteger(stems.count) || stems.count < 1 ||
    !Array.isArray(stems.labels) || stems.labels.length !== stems.count ||
    !stems.labels.every(label => typeof label === 'string' && label.trim()) ||
    new Set(stems.labels.map(label => label.trim().toLowerCase())).size !== stems.count) return null;
  return { count: stems.count, labels: stems.labels.map(label => label.trim()) };
}
