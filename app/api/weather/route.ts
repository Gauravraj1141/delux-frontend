import { type NextRequest, NextResponse } from "next/server";

const API_KEY = "e8f0a1b3ebmshb55f2ba42a54e92p111921jsn3e62259cb043";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Location required" },
      { status: 400 },
    );
  }

  const query = encodeURIComponent(`${lat},${lon}`);

  try {
    const res = await fetch(
      `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
        next: { revalidate: 600 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Weather API error" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({
      location: data.location.name,
      temp_c: Math.round(data.current.temp_c),
      feelslike_c: Math.round(data.current.feelslike_c),
      condition: data.current.condition.text,
      condition_icon: `https:${data.current.condition.icon.replace("64x64", "128x128")}`,
      wind_kph: Math.round(data.current.wind_kph),
      humidity: data.current.humidity,
      uv: data.current.uv,
      chance_of_rain: data.current.chance_of_rain ?? 0,
      localtime: data.location.localtime,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 },
    );
  }
}
