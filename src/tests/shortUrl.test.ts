import request from "supertest";
import app from "../../server";

describe("Short URL", () => {
  const urlData = {
    long_url: "https://longurl.com",
  };

  let shortToken: string;

  const shortUrlData = {
    short_url: "",
  }

  it("should create a short url", async () => {
    const encodeURL = await request(app).post("/api/v1/encode").send(urlData);
    shortUrlData.short_url = encodeURL.body.data;
    const tokens = encodeURL.body.data.split("/");
    shortToken = tokens[tokens.length - 1];
    expect(encodeURL.status).toBe(201);
  });

  it("should return a long url", async () => {
    const encodeURL = await request(app).post("/api/v1/decode").send(shortUrlData);
    expect(encodeURL.status).toBe(200);
  });

  it("should give url statistic", async () => {
    const encodeURL = await request(app).get(`/api/v1/statistic/${shortToken}`);
    expect(encodeURL.status).toBe(200);
  });
});
