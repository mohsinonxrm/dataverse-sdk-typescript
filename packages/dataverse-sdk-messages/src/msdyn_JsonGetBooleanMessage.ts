import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_JsonGetBoolean message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_JsonGetBooleanRequestParameters {
  Json?: string;
  PropertyPath: string;
  DefaultReturnValue?: boolean;
}

/**
 * msdyn_JsonGetBoolean request message
 *
 * Web API Action: msdyn_JsonGetBoolean
 */
export class msdyn_JsonGetBooleanRequest
  extends OrganizationRequest
  implements Executable<msdyn_JsonGetBooleanResponse>
{
  declare readonly Parameters: Readonly<msdyn_JsonGetBooleanRequestParameters>;

  constructor(parameters: msdyn_JsonGetBooleanRequestParameters) {
    super("msdyn_JsonGetBoolean", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_JsonGetBoolean`;

    const body = requestBody({
      Json: this.Parameters.Json,
      PropertyPath: this.Parameters.PropertyPath,
      DefaultReturnValue: this.Parameters.DefaultReturnValue,
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

  async parseResponse(response: Response): Promise<msdyn_JsonGetBooleanResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_JsonGetBooleanResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_JsonGetBoolean action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_JsonGetBooleanResult {
  "@odata.context"?: string;
  Value: boolean;
}

/**
 * msdyn_JsonGetBoolean response message
 *
 * `result` is the value the msdyn_JsonGetBoolean action returns (see {@link msdyn_JsonGetBooleanResult}).
 */
export class msdyn_JsonGetBooleanResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetBooleanResult) {
    super("msdyn_JsonGetBoolean");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_JsonGetBooleanResponse {
    return new msdyn_JsonGetBooleanResponse(data as msdyn_JsonGetBooleanResult);
  }
}
