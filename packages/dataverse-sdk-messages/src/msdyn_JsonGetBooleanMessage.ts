import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_JsonGetBooleanResponse as msdyn_JsonGetBooleanResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_JsonGetBooleanResponse.fromResponse({});
    return msdyn_JsonGetBooleanResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_JsonGetBoolean response message
 */
export class msdyn_JsonGetBooleanResponse extends OrganizationResponse {
  constructor(public result: msdyn_JsonGetBooleanResponseData) {
    super("msdyn_JsonGetBoolean");
  }

  static fromResponse(data: unknown): msdyn_JsonGetBooleanResponse {
    return new msdyn_JsonGetBooleanResponse(responseObject<msdyn_JsonGetBooleanResponseData>(data));
  }
}
