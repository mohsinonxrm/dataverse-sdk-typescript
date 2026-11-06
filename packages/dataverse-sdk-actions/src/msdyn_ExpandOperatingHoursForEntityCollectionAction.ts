import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExpandOperatingHoursForEntityCollection action
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionResponse {
  msdyn_Result: string;
}

/**
 * Parameters of the msdyn_ExpandOperatingHoursForEntityCollection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionActionParameters {
  msdyn_EntityCollection: Record<string, unknown>[];
  msdyn_Start: string;
  msdyn_End: string;
}

/**
 * msdyn_ExpandOperatingHoursForEntityCollection action
 *
 * Unbound action
 */
export class msdyn_ExpandOperatingHoursForEntityCollectionAction implements Executable<msdyn_ExpandOperatingHoursForEntityCollectionResponse> {
  constructor(
    public readonly parameters: msdyn_ExpandOperatingHoursForEntityCollectionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExpandOperatingHoursForEntityCollection`;

    const body = requestBody({
      msdyn_EntityCollection: this.parameters.msdyn_EntityCollection,
      msdyn_Start: this.parameters.msdyn_Start,
      msdyn_End: this.parameters.msdyn_End,
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
    if (response.status === 204) return {} as msdyn_ExpandOperatingHoursForEntityCollectionResponse;
    return (await response.json()) as msdyn_ExpandOperatingHoursForEntityCollectionResponse;
  }
}
