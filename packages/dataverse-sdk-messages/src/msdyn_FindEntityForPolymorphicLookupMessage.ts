import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FindEntityForPolymorphicLookup request message
 *
 * Web API Action: msdyn_FindEntityForPolymorphicLookup
 */
export class msdyn_FindEntityForPolymorphicLookupRequest
  extends OrganizationRequest
  implements Executable<msdyn_FindEntityForPolymorphicLookupResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string,
    public listOfPolymorphicLookupsFromJSON: string
  ) {
    super("msdyn_FindEntityForPolymorphicLookup");
  }

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
    return msdyn_FindEntityForPolymorphicLookupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
      ListOfPolymorphicLookupsFromJSON: this.listOfPolymorphicLookupsFromJSON,
    };
  }
}

/**
 * msdyn_FindEntityForPolymorphicLookup response message
 */
export class msdyn_FindEntityForPolymorphicLookupResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindEntityForPolymorphicLookupResponse) {
    super("msdyn_FindEntityForPolymorphicLookup");
  }

  static fromResponse(data: unknown): msdyn_FindEntityForPolymorphicLookupResponse {
    return new msdyn_FindEntityForPolymorphicLookupResponse((data as any).value);
  }
}
