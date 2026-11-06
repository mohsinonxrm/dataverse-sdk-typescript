import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_RetrieveKPIvaluesfromDCI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveKPIvaluesfromDCIResponse {
  "@odata.context"?: string;
  Errors: string;
  KPIValues: string;
}

/**
 * Parameters of the msdyn_RetrieveKPIvaluesfromDCI action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveKPIvaluesfromDCIActionParameters {
  CrmRecord?: EntityReference | AnyEntityPayload;
  KPINameFilterMap?: string;
  SimilarEntities?: string;
}

/**
 * msdyn_RetrieveKPIvaluesfromDCI action
 *
 * Unbound action
 */
export class msdyn_RetrieveKPIvaluesfromDCIAction implements Executable<msdyn_RetrieveKPIvaluesfromDCIResponse> {
  constructor(public readonly parameters: msdyn_RetrieveKPIvaluesfromDCIActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveKPIvaluesfromDCI`;

    const body = requestBody({
      CrmRecord: this.parameters.CrmRecord,
      KPINameFilterMap: this.parameters.KPINameFilterMap,
      SimilarEntities: this.parameters.SimilarEntities,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveKPIvaluesfromDCIResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_RetrieveKPIvaluesfromDCIResponse;
  }
}
