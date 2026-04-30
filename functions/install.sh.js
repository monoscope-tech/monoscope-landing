export async function onRequest() {
  const upstream = "https://raw.githubusercontent.com/monoscope-tech/monoscope/master/scripts/install.sh";
  const res = await fetch(upstream, {
    cf: { cacheTtl: 300, cacheEverything: true }
  });
  return new Response(res.body, {
    status: res.status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=300"
    }
  });
}
