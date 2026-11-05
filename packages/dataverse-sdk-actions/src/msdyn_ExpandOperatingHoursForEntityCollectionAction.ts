import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ExpandOperatingHoursForEntityCollection action
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionResponse {
  msdyn_Result: string;
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection action
 *
 * Unbound action
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionAction implements Executable<msdyn_ExpandOperatingHoursForEntityCollectionResponse> {
  constructor(
    public readonly msdyn_EntityCollection: Record<string, unknown>[],
    public readonly msdyn_Start: string,
    public readonly msdyn_End: string
  ) {}

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
    return data as msdyn_ExpandOperatingHoursForEntityCollectionResponse;
  }
}
