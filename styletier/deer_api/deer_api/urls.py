from django.contrib import admin
from django.urls import path, include
#from product import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('product/', include('products.urls')),
    path('account/', include('allauth.urls')),
    path('order/',include('orders.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('user/',include('accounts.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)