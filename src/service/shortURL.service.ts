import { NewDecoder, Visit } from "../dto/urlStat.dto";

const urlMap = new Map();
const urlStats = new Map();

function generateShortToken(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset.charAt(randomIndex);
  }

  return token;
}

async function encodingURL(long_url: string) {
  try {
    const existingShortToken = Array.from(urlMap.keys()).find(
      (key) => urlMap.get(key) === long_url
    );

    if (existingShortToken) {
      throw new Error("URL already exist");
    }

    const shortToken = generateShortToken(6);

    urlMap.set(shortToken, long_url);

    urlStats.set(shortToken, { visits: [] });

    const shortUrl = `http://short.est/${shortToken}`;

    return shortUrl;
  } catch (error) {
    return error as Error;
  }
}

async function decodingURL(decodeData: NewDecoder) {
  try {
    const tokens = decodeData.short_url.split("/");
    const shortToken = tokens[tokens.length - 1];

    const long_url = urlMap.get(shortToken);

    if (!long_url) {
      throw new Error(`No URL found for ${shortToken}`);
    }

    const timestamp = new Date();
    const stats = urlStats.get(shortToken);

    const existingVisit = stats.visits.find(
      (visit: Visit) => visit.ip_address === decodeData.ip_address
    );

    if (existingVisit) {
      existingVisit.update_date = timestamp;
      existingVisit.visit_count += 1;
    } else {
      stats.visits.push({
        ip_address: decodeData.ip_address,
        visit_count: 1,
        create_date: timestamp,
        update_date: timestamp,
      });
    }

    return long_url;
  } catch (error) {
    return error as Error;
  }
}

async function statistics(short_token: string) {
  try {
    const stats = urlStats.get(short_token);

    if (stats && stats.visits && stats.visits.length > 0) {
      const total_visit_count = stats.visits.reduce(
        (total: number, visit: any) => total + visit.visit_count,
        0
      );
      const result = {
        total_visit_count,
        visit_stats: stats.visits,
      };
      return result;
    } else {
      throw new Error("Statistics not found for this short URL");
    }
  } catch (error) {
    return error as Error;
  }
}

const ShortURLService = {
  encodingURL,
  decodingURL,
  statistics,
};

export default ShortURLService;
