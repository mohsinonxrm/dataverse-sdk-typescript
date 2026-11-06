import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExpandOperatingHoursForEntityCollection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionResponse {
  "@odata.context"?: string;
  msdyn_Result: string;
}

/**
 * Parameters of the msdyn_ExpandOperatingHoursForEntityCollection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExpandOperatingHoursForEntityCollectionActionParameters {
  msdyn_Start: string;
  msdyn_EntityCollection: Record<string, unknown>[];
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
      msdyn_Start: this.parameters.msdyn_Start,
      msdyn_EntityCollection: this.parameters.msdyn_EntityCollection,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ExpandOperatingHoursForEntityCollectionResponse;
  }
}
