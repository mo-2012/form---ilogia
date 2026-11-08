const corsHeaders = {
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json; charset=utf-8",
  "Vary": "Origin",
};

const json = (origin: string, body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Access-Control-Allow-Origin": origin },
  });

const allowedStages = ["kindergarten", "primary", "preparatory", "secondary", "multiple"];
const allowedCenterStages = ["kindergarten", "primary", "preparatory", "secondary"];
const allowedSchoolTypes = ["public", "private", "language", "international", "azhar", "other"];
const allowedServices = [
  "digitalContent",
  "institutionManagement",
  "studentFollowUp",
  "teacherDevelopment",
  "digitalClassrooms",
];
const allowedGovernorates = [
  "cairo", "giza", "alexandria", "qalyubia", "sharqia", "dakahlia", "gharbia",
  "monufia", "beheira", "kafr-elsheikh", "damietta", "port-said", "ismailia",
  "suez", "north-sinai", "south-sinai", "fayoum", "beni-suef", "minya",
  "assiut", "sohag", "qena", "luxor", "aswan", "red-sea", "new-valley", "matrouh",
];

type InstitutionType = "school" | "center";
type ApplicationData = Record<string, unknown>;

class InvalidApplication extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(data: ApplicationData, key: string, min: number, max: number): string {
  const value = data[key];
  if (typeof value !== "string") throw new InvalidApplication();
  const normalized = value.trim();
  if (normalized.length < min || normalized.length > max) throw new InvalidApplication();
  return normalized;
}

function optionalText(data: ApplicationData, key: string, max: number): string {
  const value = data[key] ?? "";
  if (typeof value !== "string" || value.trim().length > max) throw new InvalidApplication();
  return value.trim();
}

function enumValue(data: ApplicationData, key: string, allowed: string[]): string {
  const value = data[key];
  if (typeof value !== "string" || !allowed.includes(value)) throw new InvalidApplication();
  return value;
}

function numberValue(data: ApplicationData, key: string, max: number): number {
  const value = data[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > max) {
    throw new InvalidApplication();
  }
  return value;
}

function optionalUrl(data: ApplicationData, key: string): string {
  const value = optionalText(data, key, 500);
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new InvalidApplication();
  } catch {
    throw new InvalidApplication();
  }
  return value;
}

function phoneValue(data: ApplicationData, key: string, required: boolean): string {
  const value = required ? text(data, key, 7, 24) : optionalText(data, key, 24);
  if (!value && !required) return "";
  if (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, "").length < 7) {
    throw new InvalidApplication();
  }
  return value;
}

function listValue(data: ApplicationData, key: string, allowed: string[], required: boolean): string[] {
  const value = data[key] ?? [];
  if (!Array.isArray(value) || value.length > 10 || (required && value.length === 0)) {
    throw new InvalidApplication();
  }
  if (!value.every((item) => typeof item === "string" && allowed.includes(item))) {
    throw new InvalidApplication();
  }
  return [...new Set(value)];
}

function normalizeApplication(type: InstitutionType, input: ApplicationData): ApplicationData {
  const email = text(input, "email", 5, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InvalidApplication();
  const normalized: ApplicationData = {
    institutionName: text(input, "institutionName", 2, 180),
    contactName: text(input, "contactName", 2, 120),
    phone: phoneValue(input, "phone", true),
    whatsapp: phoneValue(input, "whatsapp", false),
    email,
    governorate: enumValue(input, "governorate", allowedGovernorates),
    city: text(input, "city", 2, 100),
    address: text(input, "address", 5, 500),
    mapUrl: optionalUrl(input, "mapUrl"),
    services: listValue(input, "services", allowedServices, false),
    website: optionalUrl(input, "website"),
  };

  if (type === "school") {
    normalized.schoolType = enumValue(input, "schoolType", allowedSchoolTypes);
    normalized.educationalStage = enumValue(input, "educationalStage", allowedStages);
    normalized.studentCount = numberValue(input, "studentCount", 1_000_000);
    normalized.teacherCount = numberValue(input, "teacherCount", 1_000_000);
    normalized.contactRole = optionalText(input, "contactRole", 100);
    normalized.schoolIntroduction = optionalText(input, "schoolIntroduction", 2000);
    normalized.additionalNotes = optionalText(input, "additionalNotes", 2000);
  } else {
    normalized.specializations = text(input, "specializations", 2, 1000);
    normalized.subjects = text(input, "subjects", 2, 1000);
    normalized.targetStages = listValue(input, "targetStages", allowedCenterStages, true);
    normalized.studentCount = numberValue(input, "studentCount", 1_000_000);
    normalized.teacherCount = numberValue(input, "teacherCount", 1_000_000);
    normalized.branchCount = numberValue(input, "branchCount", 500);
    normalized.facebookUrl = optionalUrl(input, "facebookUrl");
    normalized.additionalDetails = optionalText(input, "additionalDetails", 2000);
  }

  return normalized;
}

function isUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function clientAddress(request: Request): string | null {
  const candidates = [
    request.headers.get("cf-connecting-ip"),
    request.headers.get("x-real-ip"),
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  ];
  return candidates.find((candidate) => candidate && /^[\da-f:.]+$/i.test(candidate)) ?? null;
}

Deno.serve(async (request: Request) => {
  const origin = request.headers.get("origin") ?? "";
  const allowedOrigin = Deno.env.get("PORTAL_ORIGIN") ?? "https://form.ilogia-eg.com";

  if (request.method === "OPTIONS") {
    if (origin && origin !== allowedOrigin) return new Response(null, { status: 403 });
    return new Response(null, {
      status: 204,
      headers: { ...corsHeaders, "Access-Control-Allow-Origin": allowedOrigin },
    });
  }
  if (request.method !== "POST") return json(allowedOrigin, { error: "Method not allowed" }, 405);
  if (origin && origin !== allowedOrigin) return json(allowedOrigin, { error: "Origin not allowed" }, 403);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase function secrets are missing");
    return json(allowedOrigin, { error: "Registration service is not configured." }, 503);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 64_000) {
    return json(allowedOrigin, { error: "Request too large." }, 413);
  }

  let payload: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json(allowedOrigin, { error: "Invalid request." }, 400);
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > 64_000) {
        await reader.cancel();
        return json(allowedOrigin, { error: "Request too large." }, 413);
      }
      chunks.push(value);
    }
    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return json(allowedOrigin, { error: "Invalid request." }, 400);
  }
  if (!isRecord(payload) || !isUuid(payload.submissionId) ||
      (payload.institutionType !== "school" && payload.institutionType !== "center") ||
      !isRecord(payload.data) || typeof payload.website !== "string" ||
      payload.website.length > 200) {
    return json(allowedOrigin, { error: "Invalid application." }, 400);
  }
  if (payload.website.trim()) return json(allowedOrigin, { error: "Unable to verify application." }, 400);

  let data: ApplicationData;
  try {
    data = normalizeApplication(payload.institutionType, payload.data);
  } catch (error) {
    if (error instanceof InvalidApplication) {
      return json(allowedOrigin, { error: "Please review the required application details." }, 400);
    }
    console.error("Unexpected application validation error");
    return json(allowedOrigin, { error: "Unable to validate application." }, 500);
  }

  const address = clientAddress(request);
  const rateLimitKey = await sha256(address ? `ip:${address}` : `email:${data.email}`);
  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  let rateResponse: Response;
  try {
    rateResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_institution_application_rate_limit`, {
      method: "POST",
      headers,
      body: JSON.stringify({ p_ip_hash: rateLimitKey }),
    });
  } catch {
    console.error("Institution rate-limit database request failed");
    return json(allowedOrigin, { error: "Registration service is temporarily unavailable." }, 503);
  }
  if (!rateResponse.ok) {
    console.error("Institution rate limiter returned HTTP", rateResponse.status);
    return json(allowedOrigin, { error: "Registration service is temporarily unavailable." }, 503);
  }
  if (await rateResponse.json() !== true) {
    return json(allowedOrigin, { error: "Too many attempts. Please try again later." }, 429);
  }

  const row = {
    submission_id: payload.submissionId,
    institution_type: payload.institutionType,
    institution_name: data.institutionName,
    institution_data: data,
    contact_name: data.contactName,
    phone: data.phone,
    whatsapp: data.whatsapp || null,
    email: data.email,
    governorate: data.governorate,
    city: data.city,
    address: data.address,
  };

  let insertResponse: Response;
  try {
    insertResponse = await fetch(`${supabaseUrl}/rest/v1/institution_applications`, {
      method: "POST",
      headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=representation" },
      body: JSON.stringify(row),
    });
  } catch {
    console.error("Institution application database request failed");
    return json(allowedOrigin, { error: "Unable to save application." }, 500);
  }
  if (!insertResponse.ok) {
    console.error("Institution application insert returned HTTP", insertResponse.status);
    return json(allowedOrigin, { error: "Unable to save application." }, 500);
  }

  const inserted = await insertResponse.json();
  if (!Array.isArray(inserted) || inserted.length === 0) {
    const lookupUrl = new URL(`${supabaseUrl}/rest/v1/institution_applications`);
    lookupUrl.searchParams.set("select", "id");
    lookupUrl.searchParams.set("submission_id", `eq.${payload.submissionId}`);
    let lookupResponse: Response;
    try {
      lookupResponse = await fetch(lookupUrl, { headers });
    } catch {
      console.error("Institution duplicate submission lookup failed");
      return json(allowedOrigin, { error: "Unable to confirm application." }, 500);
    }
    let existing: unknown;
    try {
      existing = await lookupResponse.json();
    } catch {
      console.error("Institution duplicate submission response was invalid");
      return json(allowedOrigin, { error: "Unable to confirm application." }, 500);
    }
    if (!lookupResponse.ok || !Array.isArray(existing) || existing.length === 0) {
      console.error("Institution duplicate submission could not be verified");
      return json(allowedOrigin, { error: "Unable to confirm application." }, 500);
    }
  }

  return json(allowedOrigin, { ok: true });
});
