import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SalesDataQualityAgent_ProcessRCSInput action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesDataQualityAgent_ProcessRCSInputResponse;
  }
}
