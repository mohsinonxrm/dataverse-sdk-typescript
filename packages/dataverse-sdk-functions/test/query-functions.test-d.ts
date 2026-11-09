/**
 * #342: type tests (tsd) for `queryFunctions`. The parameters are the `$metadata` ones, typed from
 * it: `PropertyName` is required, a value has its CSDL type, and the result is a `$filter` string
 * that `.filter()` and `odata.and()` take.
 */
import { expectAssignable, expectError, expectType } from "tsd";
import { odata, type DataverseClient } from "@mohsinonxrm/dataverse-sdk-core";
import { queryFunctions } from "../src/index.js";
import * as functions from "../src/index.js";

declare const client: DataverseClient;

// The result is a string, for .filter() and the odata helpers
expectType<string>(queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }));
client
  .api("accounts")
  .filter(
    odata.and(
      queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: 7 }),
      queryFunctions.equalUserId({ PropertyName: "ownerid" })
    )
  );

// PropertyName is required, for every helper
expectError(queryFunctions.lastXDays({ PropertyValue: 7 }));
expectError(queryFunctions.equalUserId({}));
expectError(queryFunctions.equalUserId());
expectError(queryFunctions.in({ PropertyValues: ["a"] }));

// The other parameters are required and typed: Edm.Int64 is a number, Edm.String a string,
// Collection(Edm.String) an array of strings (a readonly one too)
expectError(queryFunctions.lastXDays({ PropertyName: "createdon" }));
expectError(queryFunctions.lastXDays({ PropertyName: "createdon", PropertyValue: "7" }));
expectError(queryFunctions.under({ PropertyName: "accountid", PropertyValue: 1 }));
expectError(queryFunctions.in({ PropertyName: "name", PropertyValues: "a" }));
expectError(queryFunctions.in({ PropertyName: "name", PropertyValues: [1, 2] }));
expectError(queryFunctions.inFiscalPeriodAndYear({ PropertyName: "createdon", PropertyValue1: 1 }));
expectError(queryFunctions.lastXDays({ PropertyName: 1, PropertyValue: 7 }));
const cities = ["Redmond", "Seattle"] as const;
expectType<string>(queryFunctions.in({ PropertyName: "address1_city", PropertyValues: cities }));
expectType<string>(
  queryFunctions.between({
    PropertyName: "createdon",
    PropertyValues: ["2024-01-01", "2024-12-31"],
  })
);
expectType<string>(
  queryFunctions.inFiscalPeriodAndYear({
    PropertyName: "createdon",
    PropertyValue1: 1,
    PropertyValue2: 2024,
  })
);

// Unknown parameters are refused
expectError(queryFunctions.today({ PropertyName: "createdon", PropertyValue: 1 }));

// The helper object can't be changed
expectError((queryFunctions.today = () => ""));

// The 1.0 classes and their types are gone (#342)
expectError(functions.LastXDaysFunction);
expectError(functions.AboveFunction);
expectError(functions.InFunction);
expectAssignable<typeof functions.WhoAmIFunction>(functions.WhoAmIFunction);
