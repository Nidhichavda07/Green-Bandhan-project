from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, WasteReport, Campaign, VolunteerParticipation, 
    Park, ParkFeedback, Donation, ImpactScore
)

# ----------------------------
# Custom User Admin
# ----------------------------
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'phone', 'age', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'phone')
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'phone', 'address', 'age', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'phone', 'address', 'age', 'is_staff', 'is_active')}
        ),
    )

admin.site.register(User, UserAdmin)


# ----------------------------
# Other Models Admin
# ----------------------------
@admin.register(WasteReport)
class WasteReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'reporter', 'issue_type', 'status', 'created_at')
    list_filter = ('status', 'issue_type')
    search_fields = ('title', 'description', 'location', 'reporter__username')
    ordering = ('-created_at',)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description', 'organizer__username')
    ordering = ('-start_date',)


@admin.register(VolunteerParticipation)
class VolunteerParticipationAdmin(admin.ModelAdmin):
    list_display = ('volunteer', 'campaign', 'hours_contributed', 'joined_at')
    search_fields = ('volunteer__username', 'campaign__title')
    ordering = ('-joined_at',)



@admin.register(Park)
class ParkAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "oxygen_rating", "latitude", "longitude", "created_at")
    search_fields = ("name", "address", "features")
    list_filter = ("oxygen_rating", "created_at")
    ordering = ("-created_at",)


@admin.register(ParkFeedback)
class ParkFeedbackAdmin(admin.ModelAdmin):
    list_display = ('park', 'user', 'rating', 'created_at')
    search_fields = ('park__name', 'user__username', 'comment')
    ordering = ('-created_at',)


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donation_type', 'donor', 'volunteer', 'status', 'created_at')
    list_filter = ('donation_type', 'status')
    search_fields = ('donor__username', 'volunteer__username', 'description', 'pickup_address')
    ordering = ('-created_at',)


@admin.register(ImpactScore)
class ImpactScoreAdmin(admin.ModelAdmin):
    list_display = ('user', 'points', 'level', 'last_updated')
    search_fields = ('user__username',)
    ordering = ('-points',)
