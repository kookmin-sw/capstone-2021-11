from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.utils import user_email, user_username, user_field


class CustomAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        """
        Saves a new `User` instance using information provided in the
        signup form.
        """

        data = form.cleaned_data
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        username = data.get("username")
        name = data.get("name")
        phone_num = data.get("phone_num")
        address = data.get("address")
        postal_code = data.get("postal_code")
        user_email(user, email)
        user_username(user, username)

        if first_name:
            user_field(user, "first_name", first_name)
        if last_name:
            user_field(user, "last_name", last_name)
        if "password1" in data:
            user.set_password(data["password1"])
        if name:
            user_field(user, "name", name) 
        if phone_num:
            user_field(user, "phone_num", phone_num)
        if address:
            user_field(user, "address", address)     
        if postal_code:
            user_field(user, "postal_code", postal_code)  
        else:
            user.set_unusable_password()
        self.populate_username(request, user)
        if commit:
            # Ability not to commit makes it easier to derive from
            # this adapter by adding
            user.save()
        return user