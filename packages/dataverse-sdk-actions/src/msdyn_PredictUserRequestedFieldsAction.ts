import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_PredictUserRequestedFields action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface msdyn_PredictUserRequestedFieldsResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the msdyn_PredictUserRequestedFields action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictUserRequestedFieldsActionParameters {
  msdyn_Target?: EntityReference | AnyEntityPayload;
  msdyn_FieldsToPredict: string[];
  msdyn_ScenarioName?: number;
  msdyn_Sources?: Record<string, unknown>[];
}

/**
 * msdyn_PredictUserRequestedFields action
 *
 * Unbound action
 */
export class msdyn_PredictUserRequestedFieldsAction implements Executable<msdyn_PredictUserRequestedFieldsResponse> {
  constructor(public readonly parameters: msdyn_PredictUserRequestedFieldsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictUserRequestedFields`;

    const body = requestBody({
      msdyn_Target: this.parameters.msdyn_Target,
      msdyn_FieldsToPredict: this.parameters.msdyn_FieldsToPredict,
      msdyn_ScenarioName: this.parameters.msdyn_ScenarioName,
      msdyn_Sources: this.parameters.msdyn_Sources,
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

  async parseResponse(response: Response): Promise<msdyn_PredictUserRequestedFieldsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PredictUserRequestedFieldsResponse;
    return (await response.json()) as msdyn_PredictUserRequestedFieldsResponse;
  }
}
