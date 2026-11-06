import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExpandOperatingHoursForEntityCollection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionRequestParameters {
  msdyn_Start: string;
  msdyn_EntityCollection: Record<string, unknown>[];
  msdyn_End: string;
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection request message
 *
 * Web API Action: msdyn_ExpandOperatingHoursForEntityCollection
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExpandOperatingHoursForEntityCollectionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExpandOperatingHoursForEntityCollectionRequestParameters>;

  constructor(parameters: msdyn_ExpandOperatingHoursForEntityCollectionRequestParameters) {
    super("msdyn_ExpandOperatingHoursForEntityCollection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExpandOperatingHoursForEntityCollection`;

    const body = requestBody({
      msdyn_Start: this.Parameters.msdyn_Start,
      msdyn_EntityCollection: this.Parameters.msdyn_EntityCollection,
      msdyn_End: this.Parameters.msdyn_End,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExpandOperatingHoursForEntityCollectionResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ExpandOperatingHoursForEntityCollectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_ExpandOperatingHoursForEntityCollection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionResult {
  "@odata.context"?: string;
  msdyn_Result: string;
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection response message
 *
 * `result` is the value the msdyn_ExpandOperatingHoursForEntityCollection action returns (see {@link msdyn_ExpandOperatingHoursForEntityCollectionResult}).
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExpandOperatingHoursForEntityCollectionResult) {
    super("msdyn_ExpandOperatingHoursForEntityCollection");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ExpandOperatingHoursForEntityCollectionResponse {
    return new msdyn_ExpandOperatingHoursForEntityCollectionResponse(
      data as msdyn_ExpandOperatingHoursForEntityCollectionResult
    );
  }
}
