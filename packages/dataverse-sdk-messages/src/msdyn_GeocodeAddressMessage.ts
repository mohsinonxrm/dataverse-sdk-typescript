import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_GeocodeAddressResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GeocodeAddress action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GeocodeAddressResult {
  "@odata.context"?: string;
  Latitude: number;
  Longitude: number;
}

/**
 * msdyn_GeocodeAddress response message
 *
 * `result` is the value the msdyn_GeocodeAddress action returns (see {@link msdyn_GeocodeAddressResult}).
 */
export class msdyn_GeocodeAddressResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeocodeAddressResult) {
    super("msdyn_GeocodeAddress");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GeocodeAddressResponse {
    return new msdyn_GeocodeAddressResponse(data as msdyn_GeocodeAddressResult);
  }
}
