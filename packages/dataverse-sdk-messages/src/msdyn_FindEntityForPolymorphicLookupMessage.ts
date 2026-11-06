import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FindEntityForPolymorphicLookupResponse as msdyn_FindEntityForPolymorphicLookupResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FindEntityForPolymorphicLookup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FindEntityForPolymorphicLookupRequestParameters {
  EntityLogicalName: string;
  RecordId: string;
  ListOfPolymorphicLookupsFromJSON: string;
}

/**
 * msdyn_FindEntityForPolymorphicLookup request message
 *
 * Web API Action: msdyn_FindEntityForPolymorphicLookup
 */
export class msdyn_FindEntityForPolymorphicLookupRequest
  extends OrganizationRequest
  implements Executable<msdyn_FindEntityForPolymorphicLookupResponse>
{
  declare readonly Parameters: Readonly<msdyn_FindEntityForPolymorphicLookupRequestParameters>;

  constructor(parameters: msdyn_FindEntityForPolymorphicLookupRequestParameters) {
    super("msdyn_FindEntityForPolymorphicLookup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FindEntityForPolymorphicLookup`;

    const body = requestBody({
      EntityLogicalName: this.Parameters.EntityLogicalName,
      RecordId: this.Parameters.RecordId,
      ListOfPolymorphicLookupsFromJSON: this.Parameters.ListOfPolymorphicLookupsFromJSON,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FindEntityForPolymorphicLookupResponse.fromResponse(text ? JSON.parse(text) : {});
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
