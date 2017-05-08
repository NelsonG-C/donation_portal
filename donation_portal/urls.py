"""donation_portal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from donation.views import upload_donations_file, accounting_reconciliation, download_transactions, download_all_data, donation_counter, PledgeView, download_receipt, export_page

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^upload_donations', upload_donations_file, name='upload-donations-file'),
    url(r'^accounting_reconciliation', accounting_reconciliation, name='accounting-reconciliation'),
    url(r'^export', export_page, name='export-page'),
    url(r'^secret_donation_counter', donation_counter, name='donation-counter'),
    url(r'^download_all_data', download_all_data, name='download-all-data'),
    url(r'^download_transactions', download_transactions, name='download-transactions'),
    # url(r'^pledge/([0-9])/$', pledge, name='pledge')
    url(r'^pledge', PledgeView.as_view(), name='pledge'),
    url(r'^receipt/(?P<pk>[0-9]+)/(?P<secret>[a-zA-Z0-9]+)', download_receipt, name='download-receipt'),
    url(r'^paypal/', include('paypal.standard.ipn.urls')),
]

urlpatterns += staticfiles_urlpatterns()

urlpatterns.append(url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}))
