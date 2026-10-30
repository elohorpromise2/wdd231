
const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces programming fundamentals, including variables, decisions, calculations, loops, arrays, and input/output, to solve problems.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces the World Wide Web and careers in website design and development through hands-on website projects.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to research, call, write, debug, and test functions and handle errors while solving practical programming problems.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces classes, objects, encapsulation, inheritance, and polymorphism.",
        technology: ["C#"],
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to build dynamic websites using JavaScript, respond to events, update page content, and create responsive user experiences.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const courseContainer = document.querySelector("#courseContainer");
const creditTotal = document.querySelector("#creditTotal");
const courseSummary = document.querySelector("#courseSummary");
const filterButtons = document.querySelectorAll(".filter-button");

function createCourseCard(course) {
    const card = document.createElement("article");
    card.className = course.completed
        ? "course-card completed"
        : "course-card";

    const code = document.createElement("p");
    code.className = "course-code";
    code.textContent = `${course.subject} ${course.number}`;

    const title = document.createElement("h3");
    title.textContent = course.title;

    const status = document.createElement("span");
    status.className = "course-status";
    status.textContent = course.completed
        ? "✓ Completed"
        : "○ In Progress / Not Completed";

    const description = document.createElement("p");
    description.className = "course-description";
    description.textContent = course.description;

    const credits = document.createElement("p");
    credits.textContent = `Credits: ${course.credits}`;

    const technology = document.createElement("p");
    technology.className = "course-tech";

    const techLabel = document.createElement("strong");
    techLabel.textContent = "Technology: ";

    technology.append(
        techLabel,
        document.createTextNode(course.technology.join(", "))
    );

    card.append(code, title, status, description, credits, technology);

    return card;
}

function displayCourses(subject = "ALL") {
    const filteredCourses = subject === "ALL"
        ? courses
        : courses.filter((course) => course.subject === subject);

    courseContainer.replaceChildren();

    filteredCourses.forEach((course) => {
        courseContainer.appendChild(createCourseCard(course));
    });

    const totalCredits = filteredCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    const completedCount = filteredCourses.filter(
        (course) => course.completed
    ).length;

    creditTotal.textContent =
        `Total credits displayed: ${totalCredits}`;

    courseSummary.textContent =
        `${filteredCourses.length} courses displayed · ` +
        `${completedCount} completed`;

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === subject;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        displayCourses(button.dataset.filter);
    });
});

displayCourses();
