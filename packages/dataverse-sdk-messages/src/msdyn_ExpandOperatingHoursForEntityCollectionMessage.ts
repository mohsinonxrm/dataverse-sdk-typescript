import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ExpandOperatingHoursForEntityCollectionResponse as msdyn_ExpandOperatingHoursForEntityCollectionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ExpandOperatingHoursForEntityCollection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionRequestParameters {
  msdyn_EntityCollection: Record<string, unknown>[];
  msdyn_Start: string;
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
      msdyn_EntityCollection: this.Parameters.msdyn_EntityCollection,
      msdyn_Start: this.Parameters.msdyn_Start,
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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ExpandOperatingHoursForEntityCollectionResponse.fromResponse({});
    return msdyn_ExpandOperatingHoursForEntityCollectionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection response message
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExpandOperatingHoursForEntityCollectionResponseData) {
    super("msdyn_ExpandOperatingHoursForEntityCollection");
  }

  static fromResponse(data: unknown): msdyn_ExpandOperatingHoursForEntityCollectionResponse {
    return new msdyn_ExpandOperatingHoursForEntityCollectionResponse(
      responseObject<msdyn_ExpandOperatingHoursForEntityCollectionResponseData>(data)
    );
  }
}
