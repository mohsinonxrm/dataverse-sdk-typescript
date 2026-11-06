import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * Response from the msdyn_BusinessClosureRetrieve action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_BusinessClosureRetrieveResponse =
  | (msdyn_businessclosure & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * Parameters of the msdyn_BusinessClosureRetrieve action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureRetrieveActionParameters {
  Id: string;
}

/**
 * msdyn_BusinessClosureRetrieve action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureRetrieveAction implements Executable<msdyn_BusinessClosureRetrieveResponse> {
  constructor(public readonly parameters: msdyn_BusinessClosureRetrieveActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body = requestBody({
      Id: this.parameters.Id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as msdyn_BusinessClosureRetrieveResponse;
  }
}
