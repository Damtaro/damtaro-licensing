// Same Formspree endpoint, fields and response handling used by the existing Contact form.
export async function sendContactRequest(body, signal) {
  const response = await fetch('https://formspree.io/f/mdekgzng', {
    method: 'POST', body, headers: { Accept: 'application/json' }, signal,
  });
  if (!response.ok) throw new Error('Submission failed');
}
