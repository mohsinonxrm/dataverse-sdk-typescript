import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { product, uom } from "./types/index.js";

/**
 * Parameters of the GetQuantityDecimal message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetQuantityDecimal_invoiceRequestParameters {
  Product: product;
  UoM: uom;
}

/**
 * GetQuantityDecimal request message
 *
 * Web API Function: GetQuantityDecimal
 *
 * The first argument is the id of the invoice record to call it on.
 */
export class GetQuantityDecimal_invoiceRequest
  extends OrganizationRequest
  implements Executable<GetQuantityDecimal_invoiceResponse>
{
  declare readonly Parameters: Readonly<GetQuantityDecimal_invoiceRequestParameters>;

  constructor(
    public invoiceId: string,
    parameters: GetQuantityDecimal_invoiceRequestParameters
  ) {
    super("GetQuantityDecimal", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/invoices(${odataLiteral.guid(this.invoiceId)})/Microsoft.Dynamics.CRM.GetQuantityDecimal`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Product !== undefined) {
      aliases.push(`Product=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Product, "mscrm.product", "EntityType")
      );
    }
    if (this.Parameters.UoM !== undefined) {
      aliases.push(`UoM=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.UoM, "mscrm.uom", "EntityType"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<GetQuantityDecimal_invoiceResponse> {
    // The body is the complex value, with its @odata.context
    return GetQuantityDecimal_invoiceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetQuantityDecimal function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetQuantityDecimal_invoiceResult {
  "@odata.context"?: string;
  Quantity: number;
}

/**
 * GetQuantityDecimal response message
 *
 * `result` is the value the GetQuantityDecimal function returns (see {@link GetQuantityDecimal_invoiceResult}).
 */
export class GetQuantityDecimal_invoiceResponse extends OrganizationResponse {
  constructor(public result: GetQuantityDecimal_invoiceResult) {
    super("GetQuantityDecimal");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetQuantityDecimal_invoiceResponse {
    return new GetQuantityDecimal_invoiceResponse(data as GetQuantityDecimal_invoiceResult);
  }
}
