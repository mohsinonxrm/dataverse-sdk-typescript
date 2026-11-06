import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the Restore message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RestoreRequestParameters {
  Target: EntityReference | AnyEntityPayload;
}

/**
 * Restore request message
 *
 * Web API Action: Restore
 */
export class RestoreRequest extends OrganizationRequest implements Executable<RestoreResponse> {
  declare readonly Parameters: Readonly<RestoreRequestParameters>;

  constructor(parameters: RestoreRequestParameters) {
    super("Restore", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Restore`;

    const body = requestBody({
      Target: this.Parameters.Target,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RestoreResponse> {
    // The body is the complex value, with its @odata.context
    return RestoreResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Restore action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RestoreResult {
  "@odata.context"?: string;
  id: string;
}

/**
 * Restore response message
 *
 * `result` is the value the Restore action returns (see {@link RestoreResult}).
 */
export class RestoreResponse extends OrganizationResponse {
  constructor(public result: RestoreResult) {
    super("Restore");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RestoreResponse {
    return new RestoreResponse(data as RestoreResult);
  }
}
