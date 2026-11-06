import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GeocodeAddress action
 */
export interface msdyn_GeocodeAddressResponse {
  Latitude: number;
  Longitude: number;
}

/**
 * msdyn_GeocodeAddress action
 *
 * Unbound action
 */
export class msdyn_GeocodeAddressAction implements Executable<msdyn_GeocodeAddressResponse> {
  constructor(
    public readonly target: EntityReference | AnyEntityPayload | undefined,
    public readonly version: string | undefined,
    public readonly line1: string,
    public readonly city: string,
    public readonly stateOrProvince: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly lcid?: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeocodeAddress`;

    const body: Record<string, unknown> = {
      Target: this.target,
      Version: this.version,
      Line1: this.line1,
      City: this.city,
      StateOrProvince: this.stateOrProvince,
      PostalCode: this.postalCode,
      Country: this.country,
      Lcid: this.lcid,
    };

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
    const data = await response.json();
    return data as msdyn_GeocodeAddressResponse;
  }
}
