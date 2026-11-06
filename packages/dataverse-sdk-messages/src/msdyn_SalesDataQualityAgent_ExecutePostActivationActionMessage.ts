import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse as msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecutePostActivationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePostActivationAction request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ExecutePostActivationAction
 */
export class msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters>;

  constructor(
    parameters: msdyn_SalesDataQualityAgent_ExecutePostActivationActionRequestParameters
  ) {
    super("msdyn_SalesDataQualityAgent_ExecutePostActivationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecutePostActivationAction`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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
  ): Promise<msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePostActivationAction response message
 */
export class msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponseData) {
    super("msdyn_SalesDataQualityAgent_ExecutePostActivationAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse {
    return new msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponse(
      responseObject<msdyn_SalesDataQualityAgent_ExecutePostActivationActionResponseData>(data)
    );
  }
}
