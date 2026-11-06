import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IoTCheckIfRecordExistsInEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityRequestParameters {
  EntitiesLogicalNames?: string;
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity request message
 *
 * Web API Action: msdyn_IoTCheckIfRecordExistsInEntity
 */
export class msdyn_IoTCheckIfRecordExistsInEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTCheckIfRecordExistsInEntityResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTCheckIfRecordExistsInEntityRequestParameters>;

  constructor(parameters: msdyn_IoTCheckIfRecordExistsInEntityRequestParameters = {}) {
    super("msdyn_IoTCheckIfRecordExistsInEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTCheckIfRecordExistsInEntity`;

    const body = requestBody({
      EntitiesLogicalNames: this.Parameters.EntitiesLogicalNames,
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
    return msdyn_IoTCheckIfRecordExistsInEntityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IoTCheckIfRecordExistsInEntity action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IoTCheckIfRecordExistsInEntityResult {
  "@odata.context"?: string;
  IsRecordExists: boolean;
}

/**
 * msdyn_IoTCheckIfRecordExistsInEntity response message
 *
 * `result` is the value the msdyn_IoTCheckIfRecordExistsInEntity action returns (see {@link msdyn_IoTCheckIfRecordExistsInEntityResult}).
 */
export class msdyn_IoTCheckIfRecordExistsInEntityResponse extends OrganizationResponse {
  constructor(public result: msdyn_IoTCheckIfRecordExistsInEntityResult) {
    super("msdyn_IoTCheckIfRecordExistsInEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IoTCheckIfRecordExistsInEntityResponse {
    return new msdyn_IoTCheckIfRecordExistsInEntityResponse(
      data as msdyn_IoTCheckIfRecordExistsInEntityResult
    );
  }
}
