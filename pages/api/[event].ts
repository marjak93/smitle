import type { NextApiRequest, NextApiResponse } from "next";
import { Events, track } from "../../lib/analytics";

interface Status {
  status: "error" | "success";
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Status>,
) {
  const eventName = req.query.event as keyof Events;
  const payload = req.body;

  track(eventName, payload);

  res.status(200).json({ status: "success" });
}
