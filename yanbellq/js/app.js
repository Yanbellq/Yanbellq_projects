let a = "Maksym";
let b = "32165478@yanbellq";
let nick = "Yanbellq_L"

const gamer = new User(a, b);

console.log(gamer);
console.log(gamer.password);
console.log(gamer.vadationPassword());


const firstStudent = new Student(a, b, nick);
console.log(firstStudent);
console.log(firstStudent.getStudentCourses());
console.log(firstStudent.vadationPassword());
