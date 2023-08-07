from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

#from .forms import UserCreationForm, UserChangeForm
from accounts.user.models import User


class UserAdmin(UserAdmin):
    #add_form = UserCreationForm
    #form = UserChangeForm
    model = User
    list_display = [
        "email",
        "username",
        "is_professor",
        
    ]
    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("user_bio", "is_professor",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + ((None, {"fields": ("user_bio",)}),)


admin.site.register(User, UserAdmin)
