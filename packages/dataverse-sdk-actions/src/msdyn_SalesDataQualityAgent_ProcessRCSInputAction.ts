import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SalesDataQualityAgent_ProcessRCSInput action
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputResponse {
  msdyn_Emails: string;
  msdyn_Opportunities: string;
  msdyn_ShouldUseStaticRules: boolean;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ProcessRCSInput action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputActionParameters {
  msdyn_RCSTrigger: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SalesDataQualityAgent_ProcessRCSInput action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_ProcessRCSInputAction implements Executable<msdyn_SalesDataQualityAgent_ProcessRCSInputResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_ProcessRCSInputActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ProcessRCSInput`;

    const body = requestBody({
      msdyn_RCSTrigger: this.parameters.msdyn_RCSTrigger,
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
    if (response.status === 204) return {} as msdyn_SalesDataQualityAgent_ProcessRCSInputResponse;
    return (await response.json()) as msdyn_SalesDataQualityAgent_ProcessRCSInputResponse;
  }
}
