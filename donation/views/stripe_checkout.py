import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

from donation.models import PartnerCharity

stripe.api_key = settings.STRIPE_API_KEY

@csrf_exempt
@require_POST
def create_checkout_session(request):
    data = json.loads(request.body)
    line_items = []
    for slug, amount in data['donations'].items():
        line_items.append(
            {'price_data': {'currency': 'aud', 'product': PartnerCharity.objects.get(slug_id=slug).stripe_product_id,
                            'unit_amount': amount * 100, 'recurring': {'interval': 'month'} if data['recurring'] else None},
             'quantity': 1, }
        )
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=line_items,
        mode='subscription' if data['recurring'] else 'payment',
        success_url='https://example.com/success',
        cancel_url='https://example.com/cancel',
    )

    return JsonResponse({'id': session.id})
