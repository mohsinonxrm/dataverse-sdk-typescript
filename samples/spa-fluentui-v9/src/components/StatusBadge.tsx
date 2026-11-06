import { Badge, Spinner } from "@fluentui/react-components";

const REASON: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  304: "Not Modified",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  412: "Precondition Failed",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

/** An HTTP status as a badge: green for 2xx, yellow for 3xx and 429, red for errors. */
export function StatusBadge({ status, error }: { status?: number; error?: string }) {
  if (status === undefined) {
    if (error) {
      return (
        <Badge appearance="tint" color="danger" shape="rounded">
          No response
        </Badge>
      );
    }
    return <Spinner size="extra-tiny" aria-label="Waiting for the response" />;
  }
  const color = status < 300 ? "success" : status < 400 || status === 429 ? "warning" : "danger";
  return (
    <Badge appearance="filled" color={color} shape="rounded" title={REASON[status]}>
      {status}
    </Badge>
  );
}

export function MethodBadge({ method }: { method: string }) {
  const color = method === "GET" ? "informative" : method === "DELETE" ? "danger" : "brand";
  return (
    <Badge appearance="tint" color={color} shape="rounded">
      {method}
    </Badge>
  );
}
