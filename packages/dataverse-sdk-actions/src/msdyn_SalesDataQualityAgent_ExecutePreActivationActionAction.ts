import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesDataQualityAgent_ExecutePreActivationAction action
 */
export interface msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse {
  ResponseJson: string;
}

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ExecutePreActivationAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ExecutePreActivationActionActionParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_ExecutePreActivationAction action
 *
 * Unbound action
 */
export class msdyn_SalesDataQualityAgent_ExecutePreActivationActionAction implements Executable<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse> {
  constructor(
    public readonly parameters: msdyn_SalesDataQualityAgent_ExecutePreActivationActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ExecutePreActivationAction`;

    const body = requestBody({
      RequestJson: this.parameters.RequestJson,
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
  ): Promise<msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return {} as msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse;
    return (await response.json()) as msdyn_SalesDataQualityAgent_ExecutePreActivationActionResponse;
  }
}
