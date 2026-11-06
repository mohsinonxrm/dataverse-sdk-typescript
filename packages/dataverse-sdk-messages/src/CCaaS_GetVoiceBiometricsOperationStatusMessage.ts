import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_GetVoiceBiometricsOperationStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_GetVoiceBiometricsOperationStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_GetVoiceBiometricsOperationStatusResult {
  "@odata.context"?: string;
  ResponseData: string;
}

/**
 * CCaaS_GetVoiceBiometricsOperationStatus response message
 *
 * `result` is the value the CCaaS_GetVoiceBiometricsOperationStatus action returns (see {@link CCaaS_GetVoiceBiometricsOperationStatusResult}).
 */
export class CCaaS_GetVoiceBiometricsOperationStatusResponse extends OrganizationResponse {
  constructor(public result: CCaaS_GetVoiceBiometricsOperationStatusResult) {
    super("CCaaS_GetVoiceBiometricsOperationStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_GetVoiceBiometricsOperationStatusResponse {
    return new CCaaS_GetVoiceBiometricsOperationStatusResponse(
      data as CCaaS_GetVoiceBiometricsOperationStatusResult
    );
  }
}
