import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_PredictUserRequestedFields action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_PredictUserRequestedFieldsResponse = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_PredictUserRequestedFieldsResponse;
  }
}
