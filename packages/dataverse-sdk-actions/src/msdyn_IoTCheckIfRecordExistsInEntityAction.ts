import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IoTCheckIfRecordExistsInEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityResponse {
  "@odata.context"?: string;
  IsRecordExists: boolean;
}

/**
 * Parameters of the msdyn_IoTCheckIfRecordExistsInEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityActionParameters {
  EntitiesLogicalNames?: string;
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity action
 *
 * Unbound action
 */
export class msdyn_IoTCheckIfRecordExistsInEntityAction implements Executable<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
  constructor(
    public readonly parameters: msdyn_IoTCheckIfRecordExistsInEntityActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTCheckIfRecordExistsInEntity`;

    const body = requestBody({
      EntitiesLogicalNames: this.parameters.EntitiesLogicalNames,
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

  async parseResponse(response: Response): Promise<msdyn_IoTCheckIfRecordExistsInEntityResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IoTCheckIfRecordExistsInEntityResponse;
  }
}
