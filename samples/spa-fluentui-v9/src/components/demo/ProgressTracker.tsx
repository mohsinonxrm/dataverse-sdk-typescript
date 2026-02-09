import {
  Card,
  CardHeader,
  makeStyles,
  tokens,
  ProgressBar,
  Text,
} from "@fluentui/react-components";
import { CheckmarkCircle24Filled, ErrorCircle24Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  progress: {
    marginTop: "8px",
  },
  stats: {
    display: "flex",
    gap: "24px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  statValue: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  successIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  errorIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
});

interface ProgressTrackerProps {
  total: number;
  current: number;
  label?: string;
  successCount?: number;
  errorCount?: number;
  customStats?: { label: string; value: string | number }[];
}

/**
 * ProgressTracker Component
 *
 * Visual progress tracking for bulk/batch/file operations.
 * Shows progress bar, success/error counts, and custom statistics.
 *
 * @example
 * ```tsx
 * <ProgressTracker
 *   total={100}
 *   current={45}
 *   label="Creating accounts..."
 *   successCount={43}
 *   errorCount={2}
 *   customStats={[
 *     { label: 'Records/sec', value: '12.5' },
 *     { label: 'Elapsed', value: '3.6s' }
 *   ]}
 * />
 * ```
 */
export function ProgressTracker({
  total,
  current,
  label,
  successCount,
  errorCount,
  customStats,
}: ProgressTrackerProps) {
  const styles = useStyles();
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <Card>
      <CardHeader header={<Text weight="semibold">{label || "Progress"}</Text>} />

      <div className={styles.container}>
        <div>
          <Text>
            {current} / {total} ({percentage.toFixed(1)}%)
          </Text>
          <ProgressBar className={styles.progress} value={percentage / 100} />
        </div>

        <div className={styles.stats}>
          {successCount !== undefined && (
            <div className={styles.stat}>
              <Text className={styles.statLabel}>Success</Text>
              <Text className={styles.statValue}>
                <CheckmarkCircle24Filled className={styles.successIcon} /> {successCount}
              </Text>
            </div>
          )}

          {errorCount !== undefined && errorCount > 0 && (
            <div className={styles.stat}>
              <Text className={styles.statLabel}>Errors</Text>
              <Text className={styles.statValue}>
                <ErrorCircle24Filled className={styles.errorIcon} /> {errorCount}
              </Text>
            </div>
          )}

          {customStats?.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <Text className={styles.statLabel}>{stat.label}</Text>
              <Text className={styles.statValue}>{stat.value}</Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
