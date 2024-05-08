export type DowntimeLogs = [Date, Date][];

export function merge(...args: DowntimeLogs[]): DowntimeLogs {
  /**
   * insert your code here
   */

  const downTimePeriods: DowntimeLogs = args.reduce(
    (acc, curr) => acc.concat(curr),
    []
  );

  downTimePeriods.sort((a, b) => a[0].getTime() - b[0].getTime());

  const mergeDowntimeLogs: DowntimeLogs = [];
  let currentDP = downTimePeriods[0];

  for (let i = 1; i < downTimePeriods.length; i++) {
    const nextDP = downTimePeriods[i];

    if (currentDP[1].getTime() >= nextDP[0].getTime()) {
      currentDP[1] = new Date(
        Math.max(currentDP[1].getTime(), nextDP[1].getTime())
      );
    } else {
      mergeDowntimeLogs.push(currentDP);
      currentDP = nextDP;
    }
  }

  mergeDowntimeLogs.push(currentDP);

  return mergeDowntimeLogs;
}
