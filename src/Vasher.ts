import { Serie } from './Serie';

type VasherOptions = {
  baseUrl: string;
  maxRequests: number;
  freeSpaceTime: number;
  freeSpaceSize: number;
};

export class Vasher {
  public static series: Serie[];

  public static options: VasherOptions;

  constructor({
    baseUrl,
    maxRequests,
    freeSpaceSize,
    freeSpaceTime,
  }: {
    baseUrl: string;
    maxRequests?: number;
    freeSpaceTime?: number;
    freeSpaceSize?: number;
  }) {
    Vasher.options.baseUrl = baseUrl;
    Vasher.options.maxRequests = maxRequests ?? 20;
    Vasher.options.freeSpaceSize = freeSpaceSize ?? 1;
    Vasher.options.freeSpaceTime = freeSpaceTime ?? 1;
  }

  protected clearSpaceWithTimer = (): void => {
    const time = Date.now();
    let allSeriesSize = 0;
    Vasher.series.forEach(({ bytes, timestamp, serieID }) => {
      if (time - timestamp > Vasher.options.freeSpaceTime) {
        this.removeFromCache(serieID);
        return;
      }
      allSeriesSize += bytes;
    });

    if (allSeriesSize > Vasher.options.freeSpaceSize) {
      let oldestSerieID;
      let oldestTimeStamp = Number.POSITIVE_INFINITY;
      Vasher.series.forEach(({ timestamp, serieID }) => {
        if (timestamp < oldestTimeStamp) {
          oldestSerieID = serieID;
          oldestTimeStamp = timestamp;
        }
      });
      if (oldestSerieID) this.removeFromCache(oldestSerieID);
    }
  };

  public removeFromCache = (serieID: string): void => {
    Vasher.series.forEach((serie, i) => {
      if (serie.serieID === serieID) {
        // const queueSerie = Vasher.queue.getSerie();
        // if (queueSerie && queueSerie.serieID === serieID)
        // DcmLoader.queue.stop(true);
        Vasher.series.splice(i, 1);
      }
    });
  };
}
