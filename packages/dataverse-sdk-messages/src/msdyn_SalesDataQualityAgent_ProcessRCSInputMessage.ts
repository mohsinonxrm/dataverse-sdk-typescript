import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_SalesDataQualityAgent_ProcessRCSInputResponse as msdyn_SalesDataQualityAgent_ProcessRCSInputResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ProcessRCSInput message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters {
  msdyn_RCSTrigger: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SalesDataQualityAgent_ProcessRCSInput request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ProcessRCSInput
 */
export class msdyn_SalesDataQualityAgent_ProcessRCSInputRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ProcessRCSInputResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters) {
    super("msdyn_SalesDataQualityAgent_ProcessRCSInput", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ProcessRCSInput`;

    const body = requestBody({
      msdyn_RCSTrigger: this.Parameters.msdyn_RCSTrigger,
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
  ): Promise<msdyn_SalesDataQualityAgent_ProcessRCSInputResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesDataQualityAgent_ProcessRCSInputResponse.fromResponse({});
    return msdyn_SalesDataQualityAgent_ProcessRCSInputResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesDataQualityAgent_ProcessRCSInput response message
 */
export class msdyn_SalesDataQualityAgent_ProcessRCSInputResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ProcessRCSInputResponseData) {
    super("msdyn_SalesDataQualityAgent_ProcessRCSInput");
  }

  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ProcessRCSInputResponse {
    return new msdyn_SalesDataQualityAgent_ProcessRCSInputResponse(
      responseObject<msdyn_SalesDataQualityAgent_ProcessRCSInputResponseData>(data)
    );
  }
}
