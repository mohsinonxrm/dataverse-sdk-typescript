import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteSalesAgentByTaskKey message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteSalesAgentByTaskKeyRequestParameters {
  msdyn_InputData?: string;
  msdyn_CorrelationParameters?: string;
  msdyn_TaskKey: string;
  msdyn_PartnerSource: string;
}

/**
 * msdyn_ExecuteSalesAgentByTaskKey request message
 *
 * Web API Action: msdyn_ExecuteSalesAgentByTaskKey
 */
export class msdyn_ExecuteSalesAgentByTaskKeyRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteSalesAgentByTaskKeyResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteSalesAgentByTaskKeyRequestParameters>;

  constructor(parameters: msdyn_ExecuteSalesAgentByTaskKeyRequestParameters) {
    super("msdyn_ExecuteSalesAgentByTaskKey", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteSalesAgentByTaskKey`;

    const body = requestBody({
      msdyn_InputData: this.Parameters.msdyn_InputData,
      msdyn_CorrelationParameters: this.Parameters.msdyn_CorrelationParameters,
      msdyn_TaskKey: this.Parameters.msdyn_TaskKey,
      msdyn_PartnerSource: this.Parameters.msdyn_PartnerSource,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteSalesAgentByTaskKeyResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExecuteSalesAgentByTaskKeyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ExecuteSalesAgentByTaskKey action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExecuteSalesAgentByTaskKeyResult {
  "@odata.context"?: string;
  msdyn_ErrorMessage: string;
  msdyn_IsSuccess: boolean;
  msdyn_TaskResponse: string;
}

/**
 * msdyn_ExecuteSalesAgentByTaskKey response message
 *
 * `result` is the value the msdyn_ExecuteSalesAgentByTaskKey action returns (see {@link msdyn_ExecuteSalesAgentByTaskKeyResult}).
 */
export class msdyn_ExecuteSalesAgentByTaskKeyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSalesAgentByTaskKeyResult) {
    super("msdyn_ExecuteSalesAgentByTaskKey");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExecuteSalesAgentByTaskKeyResponse {
    return new msdyn_ExecuteSalesAgentByTaskKeyResponse(
      data as msdyn_ExecuteSalesAgentByTaskKeyResult
    );
  }
}
