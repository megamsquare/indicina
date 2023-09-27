import { Request, Response } from "express";
import Services from "../service";
import IP from "ip";
import { NewDecoder } from "../dto/urlStat.dto";

async function encodingURL(req: Request, res: Response) {
  const { long_url } = req.body;
  if (!long_url || long_url === "") {
    return res.status(400).json({ error: "Long URL is required" });
  }

  const saveURLs = await Services.ShortURLService.encodingURL(long_url);
  if (saveURLs instanceof Error) {
    return res.status(400).json({ error: saveURLs.message });
  }

  res.status(201).json({ data: saveURLs });
}

async function decodingURL(req: Request, res: Response) {
  const { short_url } = req.body;
  if (!short_url || short_url === "") {
    return res.status(400).json({ error: "Short URL is required" });
  }
  const ip_address = IP.address();

  const newStats: NewDecoder = {
    short_url,
    ip_address,
  };

  const getLongUrl = await Services.ShortURLService.decodingURL(newStats);
  if (getLongUrl instanceof Error) {
    return res.status(400).json({ error: getLongUrl.message });
  }

  res.status(200).json({ data: getLongUrl });
}

async function statistics(req: Request, res: Response) {
  const { url_path } = req.params;
  if (!url_path || url_path === "") {
    return res.status(400).json({ error: "URL Path is required" });
  }

  const getStats = await Services.ShortURLService.statistics(url_path);
  if (getStats instanceof Error) {
    return res.status(400).json({ error: getStats.message });
  }
  
  res.status(200).json({ data: getStats });
}

const ShortURLController = {
  encodingURL,
  decodingURL,
  statistics,
};

export default ShortURLController;
