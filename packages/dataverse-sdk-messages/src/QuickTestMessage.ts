import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { QuickTestResponse as QuickTestResponseData } from "./types/index.js";

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
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.QuickTest`;

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
    // 204 No Content is an empty result
    if (response.status === 204) return QuickTestResponse.fromResponse({});
    return QuickTestResponse.fromResponse(await response.json());
  }
}

/**
 * QuickTest response message
 */
export class QuickTestResponse extends OrganizationResponse {
  constructor(public result: QuickTestResponseData) {
    super("QuickTest");
  }

  static fromResponse(data: unknown): QuickTestResponse {
    return new QuickTestResponse(responseObject<QuickTestResponseData>(data));
  }
}
