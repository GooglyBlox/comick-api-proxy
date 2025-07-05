"use client";

import { useEffect, useState } from "react";

interface EndpointProps {
  method: string;
  path: string;
  description: string;
  parameters?: Parameter[];
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  enum?: string[];
}

const endpoints: EndpointProps[] = [
  {
    method: "GET",
    path: "/api/health",
    description: "Check API health and Comick API connectivity",
  },
  {
    method: "GET",
    path: "/api/top",
    description: "Get trending comics",
    parameters: [
      {
        name: "gender",
        type: "integer",
        required: false,
        description: "Gender filter (1 or 2)",
        enum: ["1", "2"],
      },
      {
        name: "day",
        type: "integer",
        required: false,
        description: "Time period in days",
        enum: ["180", "270", "360", "720"],
      },
      {
        name: "type",
        type: "string",
        required: false,
        description: "Trending type",
        enum: ["trending", "newfollow", "follow"],
      },
      {
        name: "comic_types",
        type: "array",
        required: false,
        description: "Comic types filter",
        enum: ["manga", "manhwa", "manhua"],
      },
      {
        name: "accept_mature_content",
        type: "boolean",
        required: false,
        description: "Include mature content",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/category",
    description: "Get list of categories/tags",
  },
  {
    method: "GET",
    path: "/api/genre",
    description: "Get list of genres",
  },
  {
    method: "GET",
    path: "/api/chapter",
    description: "Get latest chapters",
    parameters: [
      {
        name: "lang",
        type: "array",
        required: false,
        description: "Language codes",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number (max 200)",
      },
      {
        name: "gender",
        type: "integer",
        required: false,
        description: "Gender filter (1 or 2)",
        enum: ["1", "2"],
      },
      {
        name: "order",
        type: "string",
        required: false,
        description: "Sort order",
        enum: ["hot", "new"],
      },
      {
        name: "tachiyomi",
        type: "boolean",
        required: false,
        description: "Tachiyomi compatibility flag",
      },
      {
        name: "type",
        type: "array",
        required: false,
        description: "Comic types",
        enum: ["manga", "manhwa", "manhua"],
      },
      {
        name: "accept_erotic_content",
        type: "boolean",
        required: false,
        description: "Include erotic content",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/chapter/{hid}",
    description: "Get chapter information by ID",
    parameters: [
      {
        name: "hid",
        type: "string",
        required: true,
        description: "Chapter hash ID",
      },
      {
        name: "tachiyomi",
        type: "boolean",
        required: false,
        description: "Tachiyomi compatibility flag",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/chapter/{hid}/get_images",
    description: "Get chapter images by ID",
    parameters: [
      {
        name: "hid",
        type: "string",
        required: true,
        description: "Chapter hash ID",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/comic/{hid}/chapters",
    description: "Get chapters of a comic",
    parameters: [
      {
        name: "hid",
        type: "string",
        required: true,
        description: "Comic hash ID",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Number of chapters to return (default: 60)",
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number",
      },
      {
        name: "chap-order",
        type: "integer",
        required: false,
        description: "Chapter order (0 is default)",
      },
      {
        name: "date-order",
        type: "integer",
        required: false,
        description: "Date order",
      },
      {
        name: "lang",
        type: "string",
        required: false,
        description: "Language code (gb, fr, de, etc.)",
      },
      {
        name: "chap",
        type: "string",
        required: false,
        description: "Specific chapter",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/comic/{slug}",
    description: "Get comic information by slug",
    parameters: [
      {
        name: "slug",
        type: "string",
        required: true,
        description: "Comic slug",
      },
      {
        name: "t",
        type: "integer",
        required: false,
        description: "Timestamp parameter",
      },
      {
        name: "tachiyomi",
        type: "boolean",
        required: false,
        description: "Tachiyomi compatibility flag",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/people/{slug}",
    description: "Get author/artist information",
    parameters: [
      {
        name: "slug",
        type: "string",
        required: true,
        description: "Person slug",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/v1.0/comic/{slug}",
    description: "Get comic information (v1.0 endpoint)",
    parameters: [
      {
        name: "slug",
        type: "string",
        required: true,
        description: "Comic slug",
      },
      {
        name: "t",
        type: "integer",
        required: false,
        description: "Timestamp parameter",
      },
      {
        name: "tachiyomi",
        type: "boolean",
        required: false,
        description: "Tachiyomi compatibility flag",
      },
    ],
  },
  {
    method: "GET",
    path: "/api/v1.0/search",
    description: "Search comics with advanced filters",
    parameters: [
      {
        name: "q",
        type: "string",
        required: false,
        description: "Search query (overrides other parameters)",
      },
      {
        name: "genres",
        type: "array",
        required: false,
        description: "Genre slugs to include",
      },
      {
        name: "excludes",
        type: "array",
        required: false,
        description: "Genre slugs to exclude",
      },
      {
        name: "tags",
        type: "array",
        required: false,
        description: "Tag slugs to include",
      },
      {
        name: "excluded-tags",
        type: "array",
        required: false,
        description: "Tag slugs to exclude",
      },
      {
        name: "demographic",
        type: "array",
        required: false,
        description:
          "Demographics (1=shounen, 2=shoujo, 3=seinen, 4=josei, 5=none)",
      },
      {
        name: "country",
        type: "array",
        required: false,
        description: "Country codes (kr, jp, cn, etc.)",
      },
      {
        name: "status",
        type: "integer",
        required: false,
        description:
          "Publication status (1=Ongoing, 2=Completed, 3=Cancelled, 4=Hiatus)",
      },
      {
        name: "content_rating",
        type: "string",
        required: false,
        description: "Content rating",
        enum: ["safe", "suggestive", "erotica"],
      },
      {
        name: "sort",
        type: "string",
        required: false,
        description: "Sort order",
        enum: [
          "view",
          "created_at",
          "uploaded",
          "rating",
          "follow",
          "user_follow_count",
        ],
      },
      {
        name: "page",
        type: "integer",
        required: false,
        description: "Page number (default: 1)",
      },
      {
        name: "limit",
        type: "integer",
        required: false,
        description: "Results per page (default: 15)",
      },
      {
        name: "from",
        type: "integer",
        required: false,
        description: "From year",
      },
      { name: "to", type: "integer", required: false, description: "To year" },
      {
        name: "minimum",
        type: "integer",
        required: false,
        description: "Minimum chapter count",
      },
      {
        name: "completed",
        type: "boolean",
        required: false,
        description: "Completed translation only",
      },
      {
        name: "tachiyomi",
        type: "boolean",
        required: false,
        description: "Tachiyomi compatibility flag",
      },
    ],
  },
];

function MethodBadge({ method }: { method: string }) {
  const styles = {
    GET: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    POST: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    PUT: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    DELETE: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-md ${
        styles[method as keyof typeof styles] || styles.GET
      }`}
    >
      {method}
    </span>
  );
}

function ParameterTable({ parameters }: { parameters: Parameter[] }) {
  return (
    <div className="overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Parameter
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Required
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {parameters.map((param) => (
              <tr key={param.name}>
                <td className="px-4 py-3">
                  <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100">
                    {param.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {param.type}
                  </span>
                  {param.enum && (
                    <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                      {param.enum.join(" | ")}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      param.required
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {param.required ? "required" : "optional"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {param.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
        {parameters.map((param) => (
          <div key={param.name} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-zinc-900 dark:text-zinc-100">
                {param.name}
              </code>
              <span
                className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                  param.required
                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {param.required ? "required" : "optional"}
              </span>
            </div>
            <div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {param.type}
              </span>
              {param.enum && (
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {param.enum.join(" | ")}
                </div>
              )}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {param.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: EndpointProps }) {
  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 md:p-6 bg-white dark:bg-zinc-900/30">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <MethodBadge method={endpoint.method} />
        <code className="text-base md:text-lg font-mono text-zinc-900 dark:text-zinc-100 break-all">
          {endpoint.path}
        </code>
      </div>

      <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm md:text-base">
        {endpoint.description}
      </p>

      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Parameters
          </h4>
          <ParameterTable parameters={endpoint.parameters} />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setBaseUrl(window.location.origin);
    setMounted(true);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <header className="mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 md:mb-6 tracking-tight">
            Comick API
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            CORS-enabled proxy for accessing the Comick manga database from your
            applications.
          </p>

          <div className="mt-8 md:mt-12 p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Base URL
              </span>
              <button
                onClick={copyToClipboard}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                Copy
              </button>
            </div>
            <code className="text-zinc-900 dark:text-zinc-100 font-mono text-sm md:text-base break-all">
              {baseUrl}
            </code>
          </div>
        </header>

        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8">
            Quick Start
          </h2>
          <div className="bg-zinc-900 dark:bg-zinc-800 rounded-xl p-4 md:p-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm">
              <code className="text-zinc-100">
                {`// Check API health
const health = await fetch('${baseUrl}/api/health');
const status = await health.json();

// Search for manga
const response = await fetch('${baseUrl}/api/v1.0/search?q=naruto');
const data = await response.json();

// Get trending comics  
const trending = await fetch('${baseUrl}/api/top?type=trending');
const comics = await trending.json();`}
              </code>
            </pre>
          </div>
        </section>

        <section className="mb-12 md:mb-16">
          <h2 className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6 md:mb-8">
            Endpoints
          </h2>
          <div className="space-y-4 md:space-y-6">
            {endpoints.map((endpoint, index) => (
              <EndpointCard key={index} endpoint={endpoint} />
            ))}
          </div>
        </section>

        <footer className="pt-8 md:pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-500">
            This service provides a CORS-enabled interface to the Comick API.
            All requests are forwarded to{" "}
            <code className="text-zinc-900 dark:text-zinc-100">
              api.comick.fun
            </code>
          </p>
        </footer>
      </div>
    </div>
  );
}
