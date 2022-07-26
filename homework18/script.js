const roles = {
	admin: "https://cdn-icons-png.flaticon.com/512/1424/1424453.png",
	student: "https://cdn-icons-png.flaticon.com/512/1424/1424424.png",
	lector: "https://cdn-icons-png.flaticon.com/512/1424/1424450.png"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922522.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},

    {
		name: "Amal Smith",
		age: 20,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922661.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
    {
		name: "Charlie Smith",
		age: 18,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
    {
		name: "Emily Smith",
		age: 30,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922565.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
    {
		name: "Leo Smith",
		age: 25,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922719.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];
class User {
    constructor(name, age, img, role,courses) {
        this.name = name;
        this.age = age;
        this.img = img;
        this.role = role;
        if(courses) {
            this.courses = courses;
        }
    }
    render() {return`
        <div class="user">
            <div class="user__info">
                <div class="user__info--data">
                    <img src="${this.img}" alt="${this.name}" height="50">
                </div>
                <div class="user__naming">
                    <p>Name: <b>${this.name}</b></p>
                    <p>Age: <b>${this.age}</b></p>
                </div>
                <div class="user__info--role ${this.role}">
                    <img src="${roles[this.role]}" alt="${this.role}" height="25">
                    <p>${this.role}</p>
                </div>
            </div>
            ${this.courses ? this.renderCourses() : ''}
        </div>`;
    }

    renderCourses() {
        let coursesInfo = this.courses
        .map(course => {return`
            <p class="user__courses--course ${this.role}"> 
                ${course.title} <span class="${usersGradation(gradation, course.mark)}">${usersGradation(gradation, course.mark)}</span>
            </p>`
        }
    )
    .join("");
    return `<div class="user__courses">${coursesInfo}</div>`
    }
};

class Student extends User {
    constructor(name, age, img, role, courses) {
        super(name,age,img,role,courses);
    }
};
class Lector extends User {
    constructor(name, age, img, role, courses) {
        super(name, age, img, role, courses);
    }

    renderCourses() {
        let coursesInfo = this.courses
        .map(course => {return`
            <div class="user__courses--course ${this.role}">
                <p>Title: <b>${course.title}</b></p>
                <p>Lector's score: <span class="${usersGradation(gradation, course.studentsScore)}">${usersGradation(gradation, course.studentsScore)}</span></p>
                <p>Average student's score:<span class="${usersGradation(gradation, course.studentsScore )}">${usersGradation(gradation, course.studentsScore )}</span> </p>
            </div>`
        }
    )
    .join("");
    return `<div class="user__courses admin--info"></div>`
    }
};
class Admin extends User {
    constructor(name, age, role, courses) {
        super(name, age, role, courses);
    }
    renderCourses() {
        let CoursesInfo = this.courses
        .map(course => {return`
            <div class="user__courses--course ${this.role}">
                <p>Title: <b>${course.title}</b></p>
                <p>Admin's score: <span class="${usersGradatiton(gradation, course.score)}">${usersGradatiton(gradation, course.score)}</span></p>
                <p>Lector:<b>${course.lector}</b></p>
            </div>`
        }
    )
    .join("");
    return `<div class="user__courses admin--info">${coursesInfo}</div>`
    }
};

function getUser(userArr) {
    return userArr.map(
        function(obj) {
            if (obj.role ==="student") {
                return new Student(obj.name, obj.age, obj.img, obj.role, obj.courses);
            } else if (obj.role === "lector") {
                return new Lector(obj.name, obj.age, obj.img, obj.role, obj.courses);
            } else {
                return new Admin(obj.name, obj.age, obj.img, obj.role, obj.courses);
            }
        }
    )
    .map(
        function(userObject) {
            return userObject.render();
        }
    )
    .join("");
};

function usersGradation(gradationObj, mark) {
    let userMark;
    for(let key in gradationObj) {
        if (mark <= key) {
            userMark = gradationObj[key];
            break;
        }
    }
    return userMark;
};

document.write(`
    <div class="users">
        ${getUser(users)}
    </div>
`);