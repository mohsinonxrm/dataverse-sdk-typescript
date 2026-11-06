import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_FindEntityForPolymorphicLookupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FindEntityForPolymorphicLookup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FindEntityForPolymorphicLookupResult {
  "@odata.context"?: string;
  ListOfEntityValuesOnPolyLookup: string;
}

/**
 * msdyn_FindEntityForPolymorphicLookup response message
 *
 * `result` is the value the msdyn_FindEntityForPolymorphicLookup action returns (see {@link msdyn_FindEntityForPolymorphicLookupResult}).
 */
export class msdyn_FindEntityForPolymorphicLookupResponse extends OrganizationResponse {
  constructor(public result: msdyn_FindEntityForPolymorphicLookupResult) {
    super("msdyn_FindEntityForPolymorphicLookup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FindEntityForPolymorphicLookupResponse {
    return new msdyn_FindEntityForPolymorphicLookupResponse(
      data as msdyn_FindEntityForPolymorphicLookupResult
    );
  }
}
