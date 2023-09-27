
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

  const ShortURLService = {
    encodingURL,
  }

  export default ShortURLService;