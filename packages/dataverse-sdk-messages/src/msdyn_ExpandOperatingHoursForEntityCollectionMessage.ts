import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_EntityCollection: this.msdyn_EntityCollection,
      msdyn_Start: this.msdyn_Start,
      msdyn_End: this.msdyn_End,
    };
  }
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection response message
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ExpandOperatingHoursForEntityCollectionResponse) {
    super("msdyn_ExpandOperatingHoursForEntityCollection");
  }

  static fromResponse(data: unknown): msdyn_ExpandOperatingHoursForEntityCollectionResponse {
    return new msdyn_ExpandOperatingHoursForEntityCollectionResponse((data as any).value);
  }
}
