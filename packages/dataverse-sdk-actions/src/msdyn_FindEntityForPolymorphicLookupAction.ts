import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FindEntityForPolymorphicLookup action
 */
export interface msdyn_FindEntityForPolymorphicLookupResponse {
  ListOfEntityValuesOnPolyLookup: string;
}

/**
 * msdyn_FindEntityForPolymorphicLookup action
 *
 * Unbound action
 */
export class msdyn_FindEntityForPolymorphicLookupAction implements Executable<msdyn_FindEntityForPolymorphicLookupResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly recordId: string,
    public readonly listOfPolymorphicLookupsFromJSON: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindEntityForPolymorphicLookup`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      ListOfPolymorphicLookupsFromJSON: this.listOfPolymorphicLookupsFromJSON,
    };

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
    const data = await response.json();
    return data as msdyn_FindEntityForPolymorphicLookupResponse;
  }
}
