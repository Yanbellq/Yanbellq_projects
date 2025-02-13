class Student extends User
{
    constructor(username, password, nickname)
    {
        super(username, password);
        this.nickname = nickname;
    }
    getStudentCourses() { return [1, 2]; };
    vadationPassword()
    {
        super.vadationPassword();
        if(this.password.length > 20)
        {
            return true;
        }
        return false;
    };
};