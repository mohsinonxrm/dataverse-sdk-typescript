import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GeocodeAddress request message
 *
 * Web API Action: msdyn_GeocodeAddress
 */
export class msdyn_GeocodeAddressRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeocodeAddressResponse>
{
  constructor(
    public target: EntityReference,
    public version: string,
    public line1: string,
    public city: string,
    public stateOrProvince: string,
    public postalCode: string,
    public country: string,
    public lcid: number
  ) {
    super("msdyn_GeocodeAddress");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GeocodeAddressResponse> {
    const data = await response.json();
    return msdyn_GeocodeAddressResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      Version: this.version,
      Line1: this.line1,
      City: this.city,
      StateOrProvince: this.stateOrProvince,
      PostalCode: this.postalCode,
      Country: this.country,
      Lcid: this.lcid,
    };
  }
}

/**
 * msdyn_GeocodeAddress response message
 */
export class msdyn_GeocodeAddressResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeocodeAddressResponse) {
    super("msdyn_GeocodeAddress");
  }

  static fromResponse(data: unknown): msdyn_GeocodeAddressResponse {
    return new msdyn_GeocodeAddressResponse((data as any).value);
  }
}
