import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateEffortModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateEffortModelStatusRequestParameters {
  AiConfigId: string;
  EffortModelId: string;
}

/**
 * msdyn_UpdateEffortModelStatus request message
 *
 * Web API Action: msdyn_UpdateEffortModelStatus
 */
export class msdyn_UpdateEffortModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateEffortModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateEffortModelStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateEffortModelStatusRequestParameters) {
    super("msdyn_UpdateEffortModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateEffortModelStatus`;

    const body = requestBody({
      AiConfigId: this.Parameters.AiConfigId,
      EffortModelId: this.Parameters.EffortModelId,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateEffortModelStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_UpdateEffortModelStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdateEffortModelStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdateEffortModelStatusResult {
  "@odata.context"?: string;
  ErrorDetail: string;
}

/**
 * msdyn_UpdateEffortModelStatus response message
 *
 * `result` is the value the msdyn_UpdateEffortModelStatus action returns (see {@link msdyn_UpdateEffortModelStatusResult}).
 */
export class msdyn_UpdateEffortModelStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateEffortModelStatusResult) {
    super("msdyn_UpdateEffortModelStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdateEffortModelStatusResponse {
    return new msdyn_UpdateEffortModelStatusResponse(data as msdyn_UpdateEffortModelStatusResult);
  }
}
