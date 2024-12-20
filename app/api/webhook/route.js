

export async function POST(req) {
    try{
         // Detect and handle different content types
        const contentType = req.headers.get('content-type');

        let body; 
        if (contentType === 'application/json') {
             // Parse JSON payload
            body = await req.json();
        } else if (contentType === 'application/x-www-form-urlencoded') {
            // Parse form-urlencoded payload
            const text = await req.text();
            const params = new URLSearchParams(text);
            body = Object.fromEntries(params.entries());
          } else {
            throw new Error('Unsupported content type');
          }
        // Log the full payload for debugging
        console.log('Webhook received:', body);

        // Extract specific data for your use case
    if (body.type === 'subscribe') {
        console.log(`User confirmed subscription: ${body.data?.email}`);
      }
      return new Response('Webhook received', { status: 200 }); //Respond to Mailchimp
    }catch (error){
        console.error('Error handling webhook:', error);
        return new Response(JSON.stringify({error: error.message}), { status: 500})
    }
    
}
export function GET() {
    // Respond to GET requests (used for Mailchimp verification)
    return new Response('Webhook endpoint is live', { status: 200 });
  }
/*
// Handle unsupported methods
export function GET() {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }*/