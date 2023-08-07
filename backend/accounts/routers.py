from rest_framework.routers import SimpleRouter
from accounts.user.viewsets import UserViewSet
from accounts.auth.viewsets import LoginViewSet, RegistrationViewSet


routes = SimpleRouter()

# AUTHENTICATION
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
#routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER
routes.register(r'users', UserViewSet, basename='users')


urlpatterns = [
    *routes.urls
]