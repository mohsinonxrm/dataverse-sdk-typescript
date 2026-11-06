import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExecuteSalesAgentByTaskKeyResponse as msdyn_ExecuteSalesAgentByTaskKeyResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ExecuteSalesAgentByTaskKeyResponse.fromResponse({});
    return msdyn_ExecuteSalesAgentByTaskKeyResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ExecuteSalesAgentByTaskKey response message
 */
export class msdyn_ExecuteSalesAgentByTaskKeyResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExecuteSalesAgentByTaskKeyResponseData) {
    super("msdyn_ExecuteSalesAgentByTaskKey");
  }

  static fromResponse(data: unknown): msdyn_ExecuteSalesAgentByTaskKeyResponse {
    return new msdyn_ExecuteSalesAgentByTaskKeyResponse(
      responseObject<msdyn_ExecuteSalesAgentByTaskKeyResponseData>(data)
    );
  }
}
