import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

it("debería mockear un fetch exitoso", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

  const response = await fetch("/api/test");
  const data = await response.json();

  expect(fetchMock).toHaveBeenCalledWith("/api/test");
  expect(data.success).toBe(true);
});
