console.log(`You arrived from: '${document.referrer}'`);

document.getElementById('form').addEventListener('submit', function(event ){
    event.preventDefault();

    let name = document.getElementById('name').value;
    let password = document.getElementById('password').value;

    console.log(`You entered in form:\nName: ${name}\nPassword: ${password}`);
    
    if (name == "Yanbellq" && password === "32165478") {
        const user = new User(name, password);

        let log = user.vadationPassword();
        console.log(log);
    }
})





// let a = "Maksym";
// let b = "32165478@yanbellq";
// let nick = "Yanbellq_L"

// const gamer = new User(a, b);

// console.log(gamer);
// console.log(gamer.password);
// console.log(gamer.vadationPassword());


// const firstStudent = new Student(a, b, nick);
// console.log(firstStudent);
// console.log(firstStudent.getStudentCourses());
// console.log(firstStudent.vadationPassword());


