//Student Dashboard
//card generation
//sample course array (dummy data generated)
const currentCourses = [
    {
      name: "AP Calculus AB",
      professor: "Dr. Nguyen",
      grade: "95 (A)",
      term: "Spring 2026"
    },
    {
      name: "English III Honors",
      professor: "Ms. Carter",
      grade: "88 (B+)",
      term: "Spring 2026"
    },
    {
      name: "Physics",
      professor: "Mr. Lopez",
      grade: "91 (A-)",
      term: "Spring 2026"
    },
    {
      name: "U.S. History",
      professor: "Mrs. Patel",
      grade: "89 (B+)",
      term: "Spring 2026"
    },
    {
      name: "Spanish II",
      professor: "Mr. Ramirez",
      grade: "93 (A)",
      term: "Spring 2026"
    },
    {
      name: "Computer Science I",
      professor: "Ms. Kim",
      grade: "100 (A+)",
      term: "Spring 2026"
    }
  ];

  //images
  const COURSE_IMAGE_PATH = "./course-images/";
    const COURSE_IMAGES = [
      "course1.jpg",
      "course2.jpg",
      "course3.jpg",
      "course4.jpg",
      "course5.jpg",
      "course6.jpg"
    ];
    function getRandomImage() {
        const index = Math.floor(Math.random() * COURSE_IMAGES.length);
        return COURSE_IMAGE_PATH + COURSE_IMAGES[index];
      }

  //dashboard function
  function renderDashboard() {
    const grid = document.getElementById("coursesGrid");
    const countLabel = document.getElementById("courseCount");

    grid.innerHTML = "";

    countLabel.textContent = `${currentCourses.length} course(s) this term`;

    currentCourses.forEach((course) => {
      const col = document.createElement("div");
      col.className = "col";

      const imgSrc = getRandomImage();

      col.innerHTML = `
        <div class="card course-card h-100">
          <img src="${imgSrc}" class="card-img-top" alt="Course image" />
          <div class="card-body">
            <div class="grade-pill">
              ${course.grade}
            </div>
            <h5 class="card-title mb-1">${course.name}</h5>
            <p class="course-subtext mb-1">Instructor: ${course.professor}</p>
            <p class="term-text mb-3">${course.term}</p>
            <a href="#" class="btn btn-sm btn-primary">Go to course</a>
          </div>
        </div>
      `;

      grid.appendChild(col);
    });
  }

  renderDashboard();
