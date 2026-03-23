const { app } = require('@azure/functions');

/**
 * GET /api/dataset
 *
 * This endpoint is OPTIONAL.
 * - If you set DATASET_URL in App Settings, the function fetches it server-side and returns JSON.
 * - Otherwise it returns 404, and the front-end falls back to /data/latest.json.
 */
app.http('dataset', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'dataset',
  handler: async (request, context) => {
    const url = process.env.DATASET_URL;
    if (!url) {
      return { status: 404, jsonBody: { error: 'DATASET_URL not configured' } };
    }

    const res = await fetch(url, { headers: { 'accept': 'application/json' } });
    if (!res.ok) {
      return { status: 502, jsonBody: { error: 'Upstream fetch failed', status: res.status } };
    }
    const data = await res.json();
    return {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
      },
      jsonBody: data
    };
  }
});
