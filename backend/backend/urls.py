from django.contrib import admin
from django.urls import path, include
from core.views import CreateUserView, HomeDataView, user_info
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import MyTokenObtainPairView 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('api-auth/', include("rest_framework.urls")),
    path('api/home/', HomeDataView.as_view(), name='home_data'),
    path('api/user/', user_info, name='user_info'),
]

# nie uzywaj localstorage tylko zrób tak zeby pobierał z api Token