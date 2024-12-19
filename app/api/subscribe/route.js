import crypto from 'crypto';
import { mailchimpClient } from '@/utils/mailchimp';

// Bottleneck limiter configuration
const limiter = new Bottleneck({
  maxConcurrent: 10, // Number of simultaneous requests
  minTime: 100,      // Minimum time between requests (in ms)
});
const listID = process.env.MAILCHIMP_LIST_ID; 

//adding the subscriber
const addSubscriber = async (email, name) => {
  return limiter.schedule(() => mailchimpClient.lists.addListMember(listID, {
    email_address: subscribingUser.email,
    status: "pending",
    merge_fields: {
      FNAME: subscribingUser.name
      }
    })
  );
}


export async function POST(request) {
  const result = await request.json();
  console.log("recieved data ", result);
  
  const name = result.name;
  const email = result.email;
  const subscribingUser = {
    name: name,
    email: email
  };

  try {
    

    return new Response(
      JSON.stringify({ message: 'Data received successfully!', data: result }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({useremail: subscribingUser.email})
      }
    );
    } catch (error) {
      console.error('Error handling POST request', error['response']);

      return new Response(JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    }
  
}

