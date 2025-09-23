/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.comick.dev/category/", {
      headers: {
        "User-Agent": "ComickProxy/1.0",
      },
    });

    const isHealthy = response.ok;

    return NextResponse.json(
      {
        status: isHealthy ? "healthy" : "unhealthy",
        timestamp: new Date().toISOString(),
        comickApi: {
          status: response.status,
          accessible: isHealthy,
        },
      },
      {
        status: isHealthy ? 200 : 503,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Unable to reach Comick API",
        comickApi: {
          accessible: false,
        },
      },
      {
        status: 503,
      }
    );
  }
}
