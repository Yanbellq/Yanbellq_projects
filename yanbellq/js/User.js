class User
{
    constructor(username, password)
    {
        this.username = username;
        this.password = password;

    };
    vadationPassword()
    {
        if(this.password.length > 6)
            {
            console.log(`Your password is: '${this.password}', and it's valid`)

            return true;
        }
        console.log(`Your password is: '${this.password}', and it's invalid`)
        return false;
    };
}
