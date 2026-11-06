import type { ReactNode } from "react";
import {
  Caption1,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  makeStyles,
  TableCellLayout,
  tokens,
  type TableColumnDefinition,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  wrap: {
    overflowX: "auto",
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  grid: { minWidth: "36rem" },
  empty: { color: tokens.colorNeutralForeground3 },
});

export interface GridColumn<T> {
  key: string;
  label: string;
  /** How to show the cell; by default the formatted value when there is one, else the value. */
  render?: (row: T) => ReactNode;
}

const FORMATTED = "@OData.Community.Display.V1.FormattedValue";

/** A cell as text: Dataverse's formatted value when the response has one. */
export function cellText(row: object, key: string): string {
  const record = row as Record<string, unknown>;
  const formatted = record[`${key}${FORMATTED}`];
  if (typeof formatted === "string") return formatted;
  const value = record[key];
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

interface RecordsGridProps<T extends object> {
  rows: T[];
  columns: GridColumn<T>[];
  /** Accessible name of the grid, e.g. "Accounts". */
  label: string;
  getRowId?: (row: T, index: number) => string;
}

/** Records in a sortable Fluent `DataGrid`, scrolling sideways on narrow screens. */
export function RecordsGrid<T extends object>({
  rows,
  columns,
  label,
  getRowId,
}: RecordsGridProps<T>) {
  const styles = useStyles();
  if (!rows.length) return <Caption1 className={styles.empty}>No records.</Caption1>;
  const definitions: TableColumnDefinition<T>[] = columns.map((c) =>
    createTableColumn<T>({
      columnId: c.key,
      compare: (a, b) =>
        cellText(a, c.key).localeCompare(cellText(b, c.key), undefined, { numeric: true }),
      renderHeaderCell: () => c.label,
      renderCell: (row) => (
        <TableCellLayout truncate>
          {c.render ? c.render(row) : cellText(row, c.key)}
        </TableCellLayout>
      ),
    })
  );
  const ids = new Map(rows.map((row, i) => [row, getRowId ? getRowId(row, i) : String(i)]));
  return (
    <div className={styles.wrap}>
      <DataGrid
        className={styles.grid}
        items={rows}
        columns={definitions}
        sortable
        getRowId={(row: T) => ids.get(row) ?? ""}
        aria-label={label}
        size="small"
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<T>>
          {({ item, rowId }) => (
            <DataGridRow<T> key={rowId}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}
