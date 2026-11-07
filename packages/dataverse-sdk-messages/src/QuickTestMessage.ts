import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the QuickTest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface QuickTestRequestParameters {
  version: string;
  request?: string;
  requestv2?: EntityReference | AnyEntityPayload;
  source?: string;
}

/**
 * QuickTest request message
 *
 * Web API Action: QuickTest
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class QuickTestRequest extends OrganizationRequest implements Executable<QuickTestResponse> {
  declare readonly Parameters: Readonly<QuickTestRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: QuickTestRequestParameters
  ) {
    super("QuickTest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${odataLiteral.guid(this.msdyn_aiconfigurationId)})/Microsoft.Dynamics.CRM.QuickTest`;

    const body = requestBody({
      version: this.Parameters.version,
      request: this.Parameters.request,
      requestv2: this.Parameters.requestv2,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<QuickTestResponse> {
    // The body is the complex value, with its @odata.context
    return QuickTestResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the QuickTest action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface QuickTestResult {
  "@odata.context"?: string;
  overrideHttpStatusCode: string;
  overrideLocation: string;
  overrideRetryAfter: string;
  response: string;
}

/**
 * QuickTest response message
 *
 * `result` is the value the QuickTest action returns (see {@link QuickTestResult}).
 */
export class QuickTestResponse extends OrganizationResponse {
  constructor(public result: QuickTestResult) {
    super("QuickTest");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): QuickTestResponse {
    return new QuickTestResponse(data as QuickTestResult);
  }
}
