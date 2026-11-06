import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GeocodeAddressResponse as msdyn_GeocodeAddressResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GeocodeAddress message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeocodeAddressRequestParameters {
  Target?: EntityReference | AnyEntityPayload;
  Version?: string;
  Line1: string;
  City: string;
  StateOrProvince: string;
  PostalCode: string;
  Country: string;
  Lcid?: number;
}

/**
 * msdyn_GeocodeAddress request message
 *
 * Web API Action: msdyn_GeocodeAddress
 */
export class msdyn_GeocodeAddressRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeocodeAddressResponse>
{
  declare readonly Parameters: Readonly<msdyn_GeocodeAddressRequestParameters>;

  constructor(parameters: msdyn_GeocodeAddressRequestParameters) {
    super("msdyn_GeocodeAddress", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeocodeAddress`;

    const body = requestBody({
      Target: this.Parameters.Target,
      Version: this.Parameters.Version,
      Line1: this.Parameters.Line1,
      City: this.Parameters.City,
      StateOrProvince: this.Parameters.StateOrProvince,
      PostalCode: this.Parameters.PostalCode,
      Country: this.Parameters.Country,
      Lcid: this.Parameters.Lcid,
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

  async parseResponse(response: Response): Promise<msdyn_GeocodeAddressResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GeocodeAddressResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GeocodeAddress response message
 */
export class msdyn_GeocodeAddressResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeocodeAddressResponseData) {
    super("msdyn_GeocodeAddress");
  }

  static fromResponse(data: unknown): msdyn_GeocodeAddressResponse {
    return new msdyn_GeocodeAddressResponse(responseObject<msdyn_GeocodeAddressResponseData>(data));
  }
}
