import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FindEntityForPolymorphicLookup action
 */
export interface msdyn_FindEntityForPolymorphicLookupResponse {
  ListOfEntityValuesOnPolyLookup: string;
}

/**
 * Parameters of the msdyn_FindEntityForPolymorphicLookup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FindEntityForPolymorphicLookupActionParameters {
  EntityLogicalName: string;
  RecordId: string;
  ListOfPolymorphicLookupsFromJSON: string;
}

/**
 * msdyn_FindEntityForPolymorphicLookup action
 *
 * Unbound action
 */
export class msdyn_FindEntityForPolymorphicLookupAction implements Executable<msdyn_FindEntityForPolymorphicLookupResponse> {
  constructor(public readonly parameters: msdyn_FindEntityForPolymorphicLookupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindEntityForPolymorphicLookup`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
      RecordId: this.parameters.RecordId,
      ListOfPolymorphicLookupsFromJSON: this.parameters.ListOfPolymorphicLookupsFromJSON,
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

  async parseResponse(response: Response): Promise<msdyn_FindEntityForPolymorphicLookupResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FindEntityForPolymorphicLookupResponse;
    return (await response.json()) as msdyn_FindEntityForPolymorphicLookupResponse;
  }
}
