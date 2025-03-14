import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(key,{
    apiVersion:'2024-12-18.acacia',
});

export async function POST(request:NextRequest) {
    const body = await request.json();
    console.log(body)


    try {
        const headersList = request.headers
        const origin = headersList.get('origin')
    if (body.length > 0) {
      

            const session = await stripe.checkout.sessions.create({
                submit_type:'pay',
                mode: 'payment',
                payment_method_types:['card'],
                billing_address_collection:'auto',
                shipping_options:[{shipping_rate:"shr_1R1UdNPr4PzPbGsCJXuMUGzY"},{shipping_rate:"shr_1R1UaEPr4PzPbGsCORnCpqf2"}],
                invoice_creation: {
                  enabled: true,
                },
                line_items: body.map((item:any) => {
                   return{
                       price_data:{
                         currency : 'pkr',
                         product_data: {
                          name : item.name,

                         },
                         unit_amount: item.price * 100,
                       },
                       quantity : item.quantity,
                      //  addjust product qantity
                       adjustable_quantity: {
                        enabled: true,
                        maximum: 100,
                        minimum: 0,
                      },
                      }
                }),
                phone_number_collection: {
                  enabled: true,
                },
                success_url: `${request.headers.get("origin")}/checkout?session_id={CHECKOUT_SESSION_ID}`, // ✅ Payment ke baad session_id pass hoga
                cancel_url: `${request.headers.get("origin")}/checkout?canceled=true`,
              });
      
              // use this condition on time when u want to redidirect with stripe build page
              // if (session.url) {
              //     return NextResponse.redirect(session.url, 303);
              // } else {
              //     return NextResponse.json(
              //         { error: 'Session URL is null' },
              //         { status: 500 }
              //     );
              // }
      
              // other wise use this return method for custom page
              return NextResponse.json({session});
        }
        else{
            return NextResponse.json({message:'NO Data Found'})

        }
        // Create Checkout Sessions from body params.
       

      } catch (err:any) {
        console.log(err)
        return NextResponse.json(
          { error: err.message },
          { status: err.statusCode || 500 }
        )
      }
}