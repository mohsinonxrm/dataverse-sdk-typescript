import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ExpandOperatingHoursForEntityCollectionResponse as msdyn_ExpandOperatingHoursForEntityCollectionResponseData } from "./types/index.js";

/**
 * msdyn_ExpandOperatingHoursForEntityCollection request message
 *
 * Web API Action: msdyn_ExpandOperatingHoursForEntityCollection
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExpandOperatingHoursForEntityCollectionResponse>
{
  constructor(
    public msdyn_EntityCollection: Record<string, unknown>[],
    public msdyn_Start: string,
    public msdyn_End: string
  ) {
    super("msdyn_ExpandOperatingHoursForEntityCollection");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExpandOperatingHoursForEntityCollection`;

    const body: Record<string, unknown> = {
      msdyn_EntityCollection: this.msdyn_EntityCollection,
      msdyn_Start: this.msdyn_Start,
      msdyn_End: this.msdyn_End,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ExpandOperatingHoursForEntityCollectionResponse> {
    const data = await response.json();
    return msdyn_ExpandOperatingHoursForEntityCollectionResponse.fromResponse(data);
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
