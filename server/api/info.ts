export default defineEventHandler(async (event) => {
  const forwarded_for = getHeader(event, "x-forwarded-for");
  const real_ip = getHeader(event, "x-real-ip");
  const connecting_ip = getHeader(event, "cf-connecting-ip");
  const ray = getHeader(event, "cf-ray");
  const worker = getHeader(event, "cf-worker");
  const ipcountry = getHeader(event, "cf-ipcountry");

  const res = await fetch("https://cloudflare-dns.com/dns-query", {
    method: "OPTIONS",
  });
  const region = res?.headers?.get("cf-ray")?.split("-")[1]; // LHR

  return {
    forwarded_for: forwarded_for || "-",
    real_ip: real_ip || "-",
    connecting_ip: connecting_ip || "-",
    ray: ray || "-",
    worker: worker || "-",
    ipcountry: ipcountry || "-",

    region: region || "-",
  };
});
