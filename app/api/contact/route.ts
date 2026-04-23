import { NextResponse } from "next/server";

const HUBSPOT_API = "https://api.truintelreform.org/api/hubspot/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { firstName, lastName, email, description } = body;
    if (!firstName || !lastName || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const hubspotRes = await fetch(HUBSPOT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        phone: body.phone || "",
        city: body.city || "",
        concerns: description,
      }),
    });

    if (!hubspotRes.ok) {
      const errorData = await hubspotRes.text();
      console.error("HubSpot API error:", hubspotRes.status, errorData);
      return NextResponse.json(
        { error: "Failed to submit contact" },
        { status: 502 }
      );
    }

    const result = await hubspotRes.json();
    return NextResponse.json({ success: true, contactId: result.data?.contactId });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
