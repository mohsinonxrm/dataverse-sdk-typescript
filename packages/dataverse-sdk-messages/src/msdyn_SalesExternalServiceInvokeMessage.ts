import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesExternalServiceInvoke message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesExternalServiceInvokeRequestParameters {
  msdyn_entityName: string;
  msdyn_id: string;
  msdyn_activityId?: string;
}

/**
 * msdyn_SalesExternalServiceInvoke request message
 *
 * Web API Action: msdyn_SalesExternalServiceInvoke
 */
export class msdyn_SalesExternalServiceInvokeRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesExternalServiceInvokeResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesExternalServiceInvokeRequestParameters>;

  constructor(parameters: msdyn_SalesExternalServiceInvokeRequestParameters) {
    super("msdyn_SalesExternalServiceInvoke", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesExternalServiceInvoke`;

    const body = requestBody({
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_id: this.Parameters.msdyn_id,
      msdyn_activityId: this.Parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesExternalServiceInvokeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesExternalServiceInvoke action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesExternalServiceInvokeResult {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
}

/**
 * msdyn_SalesExternalServiceInvoke response message
 *
 * `result` is the value the msdyn_SalesExternalServiceInvoke action returns (see {@link msdyn_SalesExternalServiceInvokeResult}).
 */
export class msdyn_SalesExternalServiceInvokeResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesExternalServiceInvokeResult) {
    super("msdyn_SalesExternalServiceInvoke");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesExternalServiceInvokeResponse {
    return new msdyn_SalesExternalServiceInvokeResponse(
      data as msdyn_SalesExternalServiceInvokeResult
    );
  }
}
