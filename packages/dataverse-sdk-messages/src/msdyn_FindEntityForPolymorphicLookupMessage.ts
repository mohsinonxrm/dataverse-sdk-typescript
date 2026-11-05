import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FindEntityForPolymorphicLookupResponse as msdyn_FindEntityForPolymorphicLookupResponseData } from "./types/index.js";

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
}

/**
 * msdyn_FindEntityForPolymorphicLookup response message
 */
export class msdyn_FindEntityForPolymorphicLookupResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindEntityForPolymorphicLookupResponseData) {
    super("msdyn_FindEntityForPolymorphicLookup");
  }

  static fromResponse(data: unknown): msdyn_FindEntityForPolymorphicLookupResponse {
    return new msdyn_FindEntityForPolymorphicLookupResponse(
      responseObject<msdyn_FindEntityForPolymorphicLookupResponseData>(data)
    );
  }
}
