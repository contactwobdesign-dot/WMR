import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno"

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2022-11-15",
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get("Stripe-Signature")
  const body = await req.text()
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")

  let event: Stripe.Event
  try {
    if (!signature || !webhookSecret) {
      throw new Error("Missing Stripe signature or webhook secret")
    }
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_email

    if (!email) {
      console.error("checkout.session.completed: missing customer_email")
    } else {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      )

      const { error } = await supabase
        .from("profiles")
        .update({
          is_pro: true,
          stripe_customer_id: session.customer ?? null,
          stripe_subscription_id: session.subscription ?? null,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email)

      if (error) {
        console.error("Error updating profile after checkout:", error)
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  })
})
