class User
{
    constructor(username, password)
    {
        this.username = username;
        this.password = password;

    };
    vadationPassword()
    {
        console.log('Called parent foo')
        if(this.password.length > 6)
        {
            return true;
        }
        return false;
    };
}
