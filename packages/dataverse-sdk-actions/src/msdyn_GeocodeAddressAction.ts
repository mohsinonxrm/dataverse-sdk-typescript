import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GeocodeAddress action
 */
export interface msdyn_GeocodeAddressResponse {
  Latitude: number;
  Longitude: number;
}

/**
 * Parameters of the msdyn_GeocodeAddress action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GeocodeAddressActionParameters {
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
 * msdyn_GeocodeAddress action
 *
 * Unbound action
 */
export class msdyn_GeocodeAddressAction implements Executable<msdyn_GeocodeAddressResponse> {
  constructor(public readonly parameters: msdyn_GeocodeAddressActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeocodeAddress`;

    const body = requestBody({
      Target: this.parameters.Target,
      Version: this.parameters.Version,
      Line1: this.parameters.Line1,
      City: this.parameters.City,
      StateOrProvince: this.parameters.StateOrProvince,
      PostalCode: this.parameters.PostalCode,
      Country: this.parameters.Country,
      Lcid: this.parameters.Lcid,
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
    return (text ? JSON.parse(text) : {}) as msdyn_GeocodeAddressResponse;
  }
}
