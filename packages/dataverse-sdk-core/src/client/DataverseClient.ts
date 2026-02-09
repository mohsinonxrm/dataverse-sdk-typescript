import type { Executable } from "../abstractions/executable.js";
import type {
  FetchProvider,
  MiddlewareContext,
  RequestAdapter,
  RequestInformation,
} from "../abstractions/http.js";
import type { DataverseClientOptions, RequestOptions } from "../abstractions/options.js";
import { normalizeBaseUrl } from "../utils/url.js";
import { Pipeline } from "../pipeline/Pipeline.js";
import { FetchRequestAdapter } from "../pipeline/FetchRequestAdapter.js";
import { buildDefaultMiddleware } from "../pipeline/DefaultMiddleware.js";
import { DataverseRequestBuilder } from "./DataverseRequestBuilder.js";
import { parseODataError } from "../errors/parseODataError.js";

export class DataverseClient {
  private readonly baseUrl: string;
  private readonly pipeline: Pipeline;
  private readonly adapter: RequestAdapter;
  private readonly ctx: MiddlewareContext;

  constructor(private options: DataverseClientOptions) {
    const apiVersion = options.apiVersion ?? "v9.2";
    this.baseUrl = normalizeBaseUrl(options.baseUrl, apiVersion);

    const fetchProvider: FetchProvider = options.fetchProvider ?? {
      fetch: globalThis.fetch.bind(globalThis),
    };
    this.adapter = new FetchRequestAdapter(fetchProvider);

    const middleware = buildDefaultMiddleware(options);
    this.pipeline = new Pipeline(middleware);

    this.ctx = {
      logger: options.logger,
      telemetry: options.telemetry,
    };
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  api(pathOrAbsoluteUrl: string): DataverseRequestBuilder {
    return new DataverseRequestBuilder(this, pathOrAbsoluteUrl);
  }

  /**
   * Create binding payload for single-valued navigation properties
   * @param navigationProperty - The navigation property name
   * @param entitySetName - The target entity set (e.g., 'accounts')
   * @param id - The target record ID
   * @returns Object to spread into POST/PATCH body
   */
  bind(navigationProperty: string, entitySetName: string, id: string): Record<string, string> {
    return {
      [`${navigationProperty}@odata.bind`]: `/${entitySetName}(${id})`,
    };
  }

  async execute<T>(request: Executable<T>, options?: RequestOptions): Promise<T> {
    const info = request.toRequestInformation(this.baseUrl);
    applyOptions(info, options);
    const res = await this.send(info);
    if (!res.ok) {
      const err = await parseODataError(res);
      throw err;
    }
    return request.parseResponse(res);
  }

  async send(request: RequestInformation): Promise<Response> {
    return this.pipeline.execute(request, this.ctx, (r, c) => this.adapter.send(r, c));
  }
}

function applyOptions(req: RequestInformation, opt?: RequestOptions) {
  if (!opt) return;
  req.headers = { ...req.headers, ...opt.headers };
  if (opt.timeoutMs !== undefined) req.timeoutMs = opt.timeoutMs;
  if (opt.signal) req.signal = opt.signal;
  if (opt.prefer?.length) {
    // Prefer header can be a single header with comma-separated values
    // Check both casings as headers can be case-insensitive
    const existing = req.headers.prefer || req.headers.Prefer;
    const merged = existing ? `${existing}, ${opt.prefer.join(", ")}` : opt.prefer.join(", ");
    req.headers = { ...req.headers, prefer: merged };
  }
}
