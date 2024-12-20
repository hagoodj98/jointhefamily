import crypto from 'crypto';
import { mailchimpClient } from '@/utils/mailchimp';
import Bottleneck from 'bottleneck';

// Bottleneck limiter configuration
const limiter = new Bottleneck({
  maxConcurrent: 10, // Number of simultaneous requests
  minTime: 100,      // Minimum time between requests (in ms)
});
const listID = process.env.MAILCHIMP_LIST_ID; 

//adding the subscriber
const addSubscriber = async (email, name) => {
  return limiter.schedule(() => mailchimpClient.lists.addListMember(listID, {
    email_address: email,
    status: "pending",
    merge_fields: {
      FNAME: name
      }
    })
  );
}

export async function POST(request) {
  try {

    const { email, name } = await request.json();
    await addSubscriber(email, name);

    return new Response(JSON.stringify({ message: 'Pending subscription added'}),{status: 200});
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to process request' }),{status: 500});
    }
}

