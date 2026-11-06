import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_GetVoiceBiometricsOperationStatusResponse as CCaaS_GetVoiceBiometricsOperationStatusResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_GetVoiceBiometricsOperationStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetVoiceBiometricsOperationStatusRequestParameters {
  OperationId: string;
  Operation: string;
}

/**
 * CCaaS_GetVoiceBiometricsOperationStatus request message
 *
 * Web API Action: CCaaS_GetVoiceBiometricsOperationStatus
 *
 * The first argument is the id of the msdyn_ocliveworkitem record to call it on.
 */
export class CCaaS_GetVoiceBiometricsOperationStatusRequest
  extends OrganizationRequest
  implements Executable<CCaaS_GetVoiceBiometricsOperationStatusResponse>
{
  declare readonly Parameters: Readonly<CCaaS_GetVoiceBiometricsOperationStatusRequestParameters>;

  constructor(
    public msdyn_ocliveworkitemId: string,
    parameters: CCaaS_GetVoiceBiometricsOperationStatusRequestParameters
  ) {
    super("CCaaS_GetVoiceBiometricsOperationStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocliveworkitems(${this.msdyn_ocliveworkitemId})/Microsoft.Dynamics.CRM.CCaaS_GetVoiceBiometricsOperationStatus`;

    const body = requestBody({
      OperationId: this.Parameters.OperationId,
      Operation: this.Parameters.Operation,
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

  async parseResponse(
    response: Response
  ): Promise<CCaaS_GetVoiceBiometricsOperationStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_GetVoiceBiometricsOperationStatusResponse.fromResponse({});
    return CCaaS_GetVoiceBiometricsOperationStatusResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_GetVoiceBiometricsOperationStatus response message
 */
export class CCaaS_GetVoiceBiometricsOperationStatusResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetVoiceBiometricsOperationStatusResponseData) {
    super("CCaaS_GetVoiceBiometricsOperationStatus");
  }

  static fromResponse(data: unknown): CCaaS_GetVoiceBiometricsOperationStatusResponse {
    return new CCaaS_GetVoiceBiometricsOperationStatusResponse(
      responseObject<CCaaS_GetVoiceBiometricsOperationStatusResponseData>(data)
    );
  }
}
