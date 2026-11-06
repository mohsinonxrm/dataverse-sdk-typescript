import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_RetrieveKPIvaluesfromDCI action
 */
export interface msdyn_RetrieveKPIvaluesfromDCIResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_RetrieveKPIvaluesfromDCIResponse;
    return (await response.json()) as msdyn_RetrieveKPIvaluesfromDCIResponse;
  }
}
