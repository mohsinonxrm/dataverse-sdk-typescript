import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FindEntityForPolymorphicLookup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FindEntityForPolymorphicLookupResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FindEntityForPolymorphicLookupResponse;
  }
}
