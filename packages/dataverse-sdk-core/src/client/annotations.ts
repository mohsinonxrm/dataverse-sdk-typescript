/**
 * Annotation terms for the `odata.include-annotations` preference:
 * `Prefer.includeAnnotations(Annotations.FormattedValue)`, or
 * `.prefer().formattedValues(Annotations.LookupLogicalName)`. A term may end in `*`
 * (`"Microsoft.Dynamics.CRM.*"`); several are joined with commas.
 */
export const Annotations = {
  /** Every annotation. */
  All: "*",
  /** Display text of choices, lookups, dates, numbers and money (`…@OData.Community.Display.V1.FormattedValue`). */
  FormattedValue: "OData.Community.Display.V1.FormattedValue",
  /** All `Microsoft.Dynamics.CRM` annotations. */
  AllDynamicsCrm: "Microsoft.Dynamics.CRM.*",
  /** The table (logical name) a lookup points to. */
  LookupLogicalName: "Microsoft.Dynamics.CRM.lookuplogicalname",
  /** The single-valued navigation property of a lookup. */
  AssociatedNavigationProperty: "Microsoft.Dynamics.CRM.associatednavigationproperty",
  /** The FetchXML paging cookie of a page. */
  FetchXmlPagingCookie: "Microsoft.Dynamics.CRM.fetchxmlpagingcookie",
  /** Whether a FetchXML query has more rows. */
  MoreRecords: "Microsoft.Dynamics.CRM.morerecords",
  /** The row count of a `$count` or FetchXML `returntotalrecordcount` query. */
  TotalRecordCount: "Microsoft.Dynamics.CRM.totalrecordcount",
  /** Whether the row count passed the limit (5,000). */
  TotalRecordCountLimitExceeded: "Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded",
  /** Details of the failures of a bulk operation (`CreateMultiple`, …) on an elastic table. */
  ErrorDetails: "Microsoft.PowerApps.CDS.ErrorDetails.*",
} as const;

/** An annotation term from `Annotations`. */
export type AnnotationTerm = (typeof Annotations)[keyof typeof Annotations];
