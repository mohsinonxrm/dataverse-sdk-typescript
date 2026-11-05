import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { MessageRequest, MessageResponse } from "./types.js";

/** Options for a generic {@link OrganizationRequest}. */
export interface OrganizationRequestOptions {
  /**
   * Bind the action to a record. The request then goes to
   * `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}` instead of
   * `POST /{messageName}`.
   */
  boundTo?: {
    /** Entity set name of the record, e.g. `"accounts"`. */
    entitySetName: string;
    /** Id of the record (braces are removed). */
    id: string;
  };
}

/**
 * Generic organization request for custom actions, custom APIs, or unimplemented messages.
 * Provides an escape hatch when strongly-typed messages are not available.
 *
 * It runs as a Web API action: `POST /{messageName}` with `Parameters` as the JSON body (or, with
 * `boundTo`, `POST /{entitySetName}({id})/Microsoft.Dynamics.CRM.{messageName}`). The response's
 * properties, without the `@odata.*` annotations, become `OrganizationResponse.Results`.
 *
 * Parameter values are sent as given, so use the Web API shapes: an entity parameter is
 * `{ "@odata.type": "Microsoft.Dynamics.CRM.account", accountid: id }`. For a function (GET),
 * use the typed classes from `@mohsinonxrm/dataverse-sdk-functions` or `client.api()`.
 *
 * @example
 * ```typescript
 * const request = new OrganizationRequest('new_CustomAction', {
 *   StringParameter: 'value',
 *   IntParameter: 42,
 * });
 *
 * const response = await service.execute<OrganizationResponse>(request);
 * console.log(response.Results['OutputParameter']);
 *
 * // Bound to a record
 * const bound = new OrganizationRequest('new_BoundAction', {}, {
 *   boundTo: { entitySetName: 'accounts', id: accountId },
 * });
 * ```
 */
export class OrganizationRequest implements MessageRequest, Executable<OrganizationResponse> {
  readonly messageName: string;
  readonly Parameters: Record<string, unknown>;
  readonly #options: OrganizationRequestOptions;

  /**
   * Creates a new organization request
   *
   * @param messageName - The name of the message/action to execute
   * @param parameters - The parameters for the message
   * @param options - Optional settings, such as the record a bound action runs on
   */
  constructor(
    messageName: string,
    parameters: Record<string, unknown> = {},
    options: OrganizationRequestOptions = {}
  ) {
    this.messageName = messageName;
    this.Parameters = parameters;
    this.#options = options;
  }

  /**
   * Builds the Web API request: an action call with `Parameters` as the JSON body.
   * Typed message classes override this.
   */
  toRequestInformation(baseUrl: string): RequestInformation {
    const root = baseUrl.replace(/\/+$/, "");
    const bound = this.#options.boundTo;
    const url = bound
      ? `${root}/${bound.entitySetName}(${bound.id.replace(/[{}]/g, "")})/Microsoft.Dynamics.CRM.${this.messageName}`
      : `${root}/${this.messageName}`;
    return {
      method: "POST",
      url,
      headers: { "content-type": "application/json" },
      body: { ...this.Parameters },
    };
  }

  /**
   * Reads the action's response: its properties (without `@odata.*` annotations) become
   * `Results`. A `204 No Content` gives empty `Results`. Typed message classes override this.
   */
  async parseResponse(response: Response): Promise<OrganizationResponse> {
    const text = response.status === 204 ? "" : await response.text();
    const results: Record<string, unknown> = {};
    if (text.trim() !== "") {
      const data: unknown = JSON.parse(text);
      if (data !== null && typeof data === "object" && !Array.isArray(data)) {
        for (const [key, value] of Object.entries(data)) {
          if (!key.startsWith("@odata.")) results[key] = value;
        }
      } else {
        results.value = data;
      }
    }
    return new OrganizationResponse(this.messageName, results);
  }
}

/**
 * Generic organization response for custom actions, custom APIs, or unimplemented messages.
 *
 * @example
 * ```typescript
 * const response = await service.execute(request);
 * if (response instanceof OrganizationResponse) {
 *   console.log(response.Results);
 * }
 * ```
 */
export class OrganizationResponse implements MessageResponse {
  readonly messageName: string;
  readonly Results: Record<string, unknown>;

  /**
   * Creates a new organization response
   *
   * @param messageName - The name of the message that generated this response
   * @param results - The result values from the message execution
   */
  constructor(messageName: string, results: Record<string, unknown> = {}) {
    this.messageName = messageName;
    this.Results = results;
  }
}
