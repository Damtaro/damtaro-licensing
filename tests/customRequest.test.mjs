import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getVerifiedStemDetails } from '../src/utils/stemMetadata.js';
import { isSafeReferenceUrl, createCustomRequestBody, isCustomFieldRelevant } from '../src/utils/customRequest.js';

test('stem display requires consistent confirmed metadata and supports variable counts', () => {
  assert.equal(getVerifiedStemDetails({ officialStems: { verificationStatus: 'pending', count: 4, labels: ['A', 'B', 'C', 'D'] } }), null);
  for (const count of [1, 3, 6]) {
    const labels = Array.from({ length: count }, (_, index) => `Test export ${index + 1}`);
    assert.deepEqual(getVerifiedStemDetails({ officialStems: { verificationStatus: 'verified', count, labels } }), { count, labels });
  }
  for (const stems of [
    { count: 0, labels: [] }, { count: 2, labels: ['Test', ' test '] },
    { count: 3, labels: ['A', 'B'] }, { count: 1, labels: ['  '] },
  ]) assert.equal(getVerifiedStemDetails({ officialStems: { verificationStatus: 'verified', ...stems } }), null);
});

test('reference URLs reject executable schemes, credentials and malformed values', () => {
  for (const value of ['', 'https://example.com/reference', 'http://example.com/watch?q=1']) assert.equal(isSafeReferenceUrl(value), true);
  for (const value of ['javascript:alert(1)', 'data:text/plain,test', 'file:///secret.wav', 'https://user:password@example.com', '//example.com', 'not a url']) assert.equal(isSafeReferenceUrl(value), false);
});

const values = { name: ' Test User ', email: ' qa@example.com ', request_type: 'Custom Edit', description: 'A test project', intended_use: 'Business', asset: '9' };

test('conditional fields exclude irrelevant retained drafts from submission', () => {
  for (const request_type of ['Isolated Sound', 'Custom Edit', 'Custom Composition', 'Other']) {
    const relevant = ['Isolated Sound', 'Custom Edit'].includes(request_type);
    for (const field of ['sound', 'timecode']) assert.equal(isCustomFieldRelevant(request_type, field), relevant);
    for (const field of ['name', 'email', 'distribution', 'deadline', 'reference_url']) assert.equal(isCustomFieldRelevant(request_type, field), true);
    const body = createCustomRequestBody({ ...values, request_type, sound: 'Lead synth draft', timecode: '00:45–01:10', distribution: 'Worldwide' }, { id: 9, title: 'TITAN' });
    assert.equal(body.get('message').includes('Lead synth draft'), relevant);
    assert.equal(body.get('message').includes('00:45–01:10'), relevant);
    assert.match(body.get('message'), /Territory and distribution: Worldwide/);
  }
});
test('custom requests use only the existing contact schema and existing catalog ID', () => {
  const body = createCustomRequestBody(values, { id: 9, title: 'TITAN' });
  assert.deepEqual([...body.keys()], ['name', 'email', 'project', 'message', '_gotcha']);
  assert.equal(body.get('name'), 'Test User');
  assert.equal(body.get('email'), 'qa@example.com');
  assert.match(body.get('message'), /TITAN \(Catalog ID: 9\)/);
  assert.match(body.get('message'), /Intended use: Business/);
  assert.ok(!body.has('orderId') && !body.has('payment'));
});
test('original compositions and external references do not invent asset identifiers', () => {
  const original = createCustomRequestBody({ ...values, asset: 'new', request_type: 'Custom Composition' });
  assert.match(original.get('message'), /no existing track/);
  assert.doesNotMatch(original.get('message'), /Catalog ID/);
  const reference = createCustomRequestBody({ ...values, asset: 'reference', asset_reference: 'Existing client reference' });
  assert.match(reference.get('message'), /Existing client reference/);
  assert.doesNotMatch(reference.get('message'), /Catalog ID/);
});
