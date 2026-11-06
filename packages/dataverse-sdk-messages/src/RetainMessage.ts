import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Parameters of the Retain message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetainRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  OperationId?: string;
}

/**
 * Retain request message
 *
 * Web API Action: Retain
 */
export class RetainRequest extends OrganizationRequest implements Executable<RetainResponse> {
  declare readonly Parameters: Readonly<RetainRequestParameters>;

  constructor(parameters: RetainRequestParameters) {
    super("Retain", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Retain`;

    const body = requestBody({
      Target: this.Parameters.Target,
      OperationId: this.Parameters.OperationId,
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

  async parseResponse(response: Response): Promise<RetainResponse> {
    // The body is the complex value, with its @odata.context
    return RetainResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Retain action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetainResult {
  "@odata.context"?: string;
  EntityCountCollection: EntityRecordCountCollection;
}

/**
 * Retain response message
 *
 * `result` is the value the Retain action returns (see {@link RetainResult}).
 */
export class RetainResponse extends OrganizationResponse {
  constructor(public result: RetainResult) {
    super("Retain");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetainResponse {
    return new RetainResponse(data as RetainResult);
  }
}
