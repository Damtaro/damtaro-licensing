// Run after npm run build: node scripts/validate-catalog.js
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const expectedLinks = {
  "CTRL ME": "https://push.fm/fl/f055lrzw",
  "FEEL AGAIN": "https://push.fm/fl/43trjtxw",
  BLIND: "https://push.fm/fl/qzfsxadb",
  CONTROL: "https://push.fm/fl/522p2z4e",
  ELEVATION: "https://push.fm/fl/camai58z",
  CRAZY: "https://push.fm/fl/xmgmxpqs",
  GRAVITY: "https://push.fm/fl/rddiiwzb",
  REGAIN: "https://push.fm/fl/kiq1kuru",
  TITAN: "https://push.fm/fl/yknvvqxz",
};
// Exact encoded option values supplied for each permanent track ID.
const expectedOptions = {
  1: ["iVqgskMFFEY4umbdgkWd7w%3D%3D", "9JAK-Dqy7T5U73vL6fk__Q%3D%3D"],
  2: ["SFQ_c_3qx6x4rRQgMhpW4w%3D%3D", "Gk-u85_dZN5jsmrMKxbYug%3D%3D"],
  3: ["SplyuJZ7f-tRFBNHUCNcog%3D%3D", "Z51sAJIV0rUJ9oAWQw_J6g%3D%3D"],
  4: ["ZxoUcnKMaY-oGqsUihgNAw%3D%3D", "NhmSOlNPBPEeQkxFBSK03w%3D%3D"],
  5: ["epj8kkPJevFMc4mAX6TccQ%3D%3D", "OWE-3PoUhuiKANnX15TziA%3D%3D"],
  6: ["v-zen6436OhzNY4LnxVB5Q%3D%3D", "_pqVZPBx-ImwY-qRUZV2XQ%3D%3D"],
  7: ["6rwuJV6593-1IJrmhkhumQ%3D%3D", "pKAIlEYD8xk3XljiFzF50g%3D%3D"],
  8: ["RmyHKJZuxltAdj8jWTv-KA%3D%3D", "pKYtglRi5ilU_ekr7pA_ZA%3D%3D"],
  9: ["hQVYbEfHfOUiLE-E6iVtfg%3D%3D", "dV2JDVVszfUGF5NIk6UY_Q%3D%3D"],
};
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const approved = JSON.parse(await readFile(new URL('./approved-integrity-v1-4.json', import.meta.url), 'utf8'));
const server = await createServer({
  server: { host: "127.0.0.1", port: 0, hmr: false },
});
try {
  await server.listen();
  const origin = server.resolvedUrls.local[0];
  const { default: tracks } = await server.ssrLoadModule("/src/data/tracks.js");
  assert.equal(tracks.length, 9);
  assert.equal(new Set(tracks.map((track) => track.id)).size, 9);
  assert.deepEqual(tracks.map((track) => track.title), [
    "TITAN", "REGAIN", "GRAVITY", "CRAZY", "CTRL ME",
    "FEEL AGAIN", "BLIND", "CONTROL", "ELEVATION",
  ]);
  // Exercise the actual search/filter callback without a browser or a second implementation.
  const appSource = await readFile("src/App.jsx", "utf8");
  const filterBody = appSource.split("const filteredTracks = useMemo(() => {")[1]
    .split("}, [filters, query]);")[0];
  const search = (query, filters = {}) => runInNewContext(`(function () {${filterBody}})()`, {
    tracks, query, filters,
  });
  for (const track of tracks) assert.equal(search(track.title)[0].id, track.id);
  assert.equal(search("", { bpm: "85" }).map((track) => track.title).join(","), "GRAVITY,CRAZY");
  assert.equal(search("", { mood: "Relaxing" })[0].title, "TITAN");
  assert.ok(search("", { mood: "Energetic" }).some((track) => track.title === "REGAIN"));
  assert.equal(search("", { genre: "Melodic Drum & Bass" }).length, 5);
  assert.equal(search("no matching track").length, 0);
  const { default: MusicCard } = await server.ssrLoadModule("/src/components/music/MusicCard.jsx");
  const { default: TrackDetailView } = await server.ssrLoadModule("/src/components/music/TrackDetailView.jsx");
  const { PlayerProvider } = await server.ssrLoadModule("/src/context/PlayerContext.jsx");
  const { getPaymentProvider } = await server.ssrLoadModule("/src/services/payment/paymentProviders.js");
  const { createOrder } = await server.ssrLoadModule("/src/services/orderService.js");
  const { startPayment } = await server.ssrLoadModule("/src/services/payment/paymentOperations.js");
  const { default: LicenseModal } = await server.ssrLoadModule("/src/components/licensing/LicenseModal.jsx");
  const { default: licenses } = await server.ssrLoadModule("/src/data/licenses.js");
  const provider = getPaymentProvider("gumroad");
  const distNames = await readdir("dist/assets");
  const productionJs = (await Promise.all(distNames.filter((name) => name.endsWith(".js"))
    .map((name) => readFile(`dist/assets/${name}`, "utf8")))).join("\n");
  assert.equal(distNames.filter((name) => name.endsWith(".mp3")).length, 9);
  assert.ok(!distNames.some((name) => /\.(wav|flac|aiff|zip)$/i.test(name)));
  const builtAssets = new Map(await Promise.all(distNames
    .filter((name) => /\.(mp3|png|jpg|webp)$/.test(name))
    .map(async (name) => [hash(await readFile(`dist/assets/${name}`)), name])));
  const catalogAssets = new Set();
  const checkoutUrls = new Set();
  for (const item of [
    { trackId: 999, licenseType: "creator" },
    { trackId: 6, licenseType: "unknown" },
    { trackId: null, licenseType: "business" },
  ]) assert.throws(() => provider.createPayment({ currency: "USD", items: [item] }), /not configured/);
  assert.throws(() => provider.createPayment({ currency: "USD", items: [] }), /exactly one/);
  assert.throws(() => provider.createPayment({ currency: "USD", items: [{}, {}] }), /exactly one/);
  assert.throws(() => provider.createPayment({ currency: "EUR", items: [{ trackId: 6, licenseType: "creator" }] }), /requires USD/);

  for (const track of tracks) {
    assert.equal(track.id, approved.tracks[track.title]?.id, `Approved ID: ${track.title}`);
    assert.equal(track.smartlinkUrl, expectedLinks[track.title]);
    const draft = track.releaseReady === false;
    assert.equal(draft, false);
    assert.ok(productionJs.includes(track.title));
    assert.ok(productionJs.includes(track.smartlinkUrl));
    const html = renderToStaticMarkup(createElement(PlayerProvider, null,
      createElement(MusicCard, { track })));
    const buttons = html.match(/<button\b[^>]*>[\s\S]*?<\/button>/g);
    const download = buttons.find((button) => button.includes(`aria-label="Download ${track.title}"`));
    const license = buttons.find((button) => button.includes(">License "));
    assert.equal(download.includes('disabled=""'), draft);
    assert.equal(license.includes('disabled=""'), draft);
    assert.ok(buttons.some((button) => button.includes("Stream") && !button.includes('disabled=""')));
    assert.ok(buttons.some((button) => button.includes("Preview") && !button.includes('disabled=""')));
    const detail = renderToStaticMarkup(createElement(PlayerProvider, null,
      createElement(TrackDetailView, { open: true, track })));
    const detailLicense = detail.match(/<button\b[^>]*>License this track<\/button>/)[0];
    assert.equal(detailLicense.includes('disabled=""'), draft);

    for (const type of ["creator", "business"]) {
      const license = licenses.find((entry) => entry.type === type);
      const order = createOrder({ items: [{ id: `check-${track.id}-${type}`, track, license }] });
      const payment = startPayment({ order });
      const product = type === "creator" ? "cxmwf" : "mzitdy";
      const option = expectedOptions[track.id][type === "creator" ? 0 : 1];
      const expectedUrl = `https://damtarooff.gumroad.com/l/${product}?option=${option}&wanted=true`;
      assert.equal(payment.checkoutUrl, expectedUrl);
      assert.equal(new URL(payment.checkoutUrl).searchParams.getAll("wanted").length, 1);
      assert.equal(payment.amount, type === "creator" ? 17 : 149);
      assert.equal(payment.currency, "USD");
      assert.equal(payment.status, "pending");
      assert.equal(order.status, "pending");
      assert.equal(order.licenseIssued, false);
      assert.ok(productionJs.includes(option));
      checkoutUrls.add(payment.checkoutUrl);
    }
    for (const accepted of [false, true]) {
      const licenseHtml = renderToStaticMarkup(createElement(LicenseModal, {
        open: true, track, termsAccepted: accepted,
      }));
      // Selection is available before consent; checkout and consent belong to the next step.
      // Interactive tests exercise both license summaries and block checkout until acceptance.
      const choiceButtons = licenseHtml.match(/<button\b[^>]*>Choose (Creator|Business)<\/button>/g);
      assert.equal(choiceButtons.length, 2);
      assert.ok(choiceButtons.every((button) => !button.includes('disabled=""')));
      assert.ok(!licenseHtml.includes('Continue to Secure Checkout'));
      assert.ok(!licenseHtml.includes('type="checkbox"'));
    }
    for (const [field, asset] of [['cover', track.cover], ['preview', track.preview]]) {
      const response = await fetch(new URL(asset, origin));
      assert.equal(response.status, 200, asset);
      assert.ok(Number(response.headers.get("content-length")) > 0, asset);
      await response.arrayBuffer();
      const sourceAsset = await readFile(decodeURIComponent(asset.split("?")[0]).replace(/^\//, ""));
      const expected = approved.tracks[track.title][field];
      assert.equal(decodeURIComponent(asset.split('?')[0]).replace(/^\//, ''), expected.path);
      assert.equal(hash(sourceAsset), expected.sha256, `Approved asset integrity: ${asset}`);
      const builtName = builtAssets.get(hash(sourceAsset));
      assert.ok(builtName, `Missing or altered production asset: ${asset}`);
      assert.ok(productionJs.includes(encodeURI(builtName)), `Unreferenced production asset: ${builtName}`);
      catalogAssets.add(builtName);
    }
    if (track.id >= 6) {
      const slug = track.title.toLowerCase();
      assert.ok(track.cover.endsWith(`/${slug}.jpg`));
      assert.ok(!distNames.some(name => name.toLowerCase().startsWith(`${slug}-`) && name.endsWith('.png')), `No original PNG published: ${slug}`);
      assert.equal(track.key, undefined);
      assert.equal(track.description, undefined);
      assert.equal(track.potentialUses, undefined);
    }
  }
  assert.equal(catalogAssets.size, 18);
  assert.equal(checkoutUrls.size, 18);
  console.log("PASS: nine approved IDs/tracks/Smartlinks, chronological order, search/filters, enabled controls, legal consent, 18 exact checkout URLs, USD prices, pending payment status, invalid checkout rejection, and 18 approved asset hashes in production; no original cover filenames or WAVs. Private-original provenance is a separate optional audit.");
} finally {
  await server.close();
}
