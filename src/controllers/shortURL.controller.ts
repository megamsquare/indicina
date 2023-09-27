import { Request, Response } from "express";
import Services from "../service";

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

  const ShortURLController = {
    encodingURL,
  };

  export default ShortURLController;