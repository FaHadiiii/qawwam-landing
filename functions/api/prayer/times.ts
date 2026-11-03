import { forwardPrayer, type PrayerEnv } from "../../_lib/prayer";

export const onRequestGet: PagesFunction<PrayerEnv> = (context) =>
  forwardPrayer(context, "times", 3600);
