//Course browser js
//Dummy info array (generated data will change once csv is created)
const courses = [
    { code: "ENG1", name: "English I", level: "On Level", subject: "English", grade: "9", credits: 1 },
    { code: "ENG1H", name: "English I Honors", level: "Honors", subject: "English", grade: "9", credits: 1 },
    { code: "ENG2AP", name: "AP English Language & Composition", level: "AP", subject: "English", grade: "11", credits: 1 },

    { code: "ALG1", name: "Algebra I", level: "On Level", subject: "Math", grade: "9", credits: 1 },
    { code: "GEOMH", name: "Geometry Honors", level: "Honors", subject: "Math", grade: "9–10", credits: 1 },
    { code: "CALCAP", name: "AP Calculus AB", level: "AP", subject: "Math", grade: "11–12", credits: 1 },

    { code: "BIO1", name: "Biology", level: "On Level", subject: "Science", grade: "9–10", credits: 1 },
    { code: "BIO1H", name: "Biology Honors", level: "Honors", subject: "Science", grade: "9–10", credits: 1 },
    { code: "CHEMAP", name: "AP Chemistry", level: "AP", subject: "Science", grade: "11–12", credits: 1 },

    { code: "WHIST", name: "World History", level: "On Level", subject: "Social Studies", grade: "10", credits: 1 },
    { code: "USHISAP", name: "AP U.S. History", level: "AP", subject: "Social Studies", grade: "11", credits: 1 },

    { code: "SPAN1", name: "Spanish I", level: "On Level", subject: "World Languages", grade: "9–11", credits: 1 },
    { code: "SPAN2H", name: "Spanish II Honors", level: "Honors", subject: "World Languages", grade: "10–12", credits: 1 },
    { code: "SPANAP", name: "AP Spanish Language", level: "AP", subject: "World Languages", grade: "11–12", credits: 1 },

    { code: "ART1", name: "Art I", level: "On Level", subject: "Fine Arts", grade: "9–12", credits: 1 },
    { code: "CSAP", name: "AP Computer Science Principles", level: "AP", subject: "Technology", grade: "10–12", credits: 1 }
  ];

  //get html elements by class
  const levelFilter = document.getElementById("levelFilter");
  const subjectFilter = document.getElementById("subjectFilter");
  const coursesContainer = document.getElementById("coursesContainer");
  const summaryText = document.getElementById("summaryText");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  async function getCourses() {
      const resp = await fetch("/courses");
      const data = await resp.json();
      console.log(data);
      return data;
  }

  //init dropdown - populate based on data (dummy)
  function subjectOptions() {
    const subjects = Array.from(new Set(courses.map(c => c.subject)));
    subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectFilter.appendChild(option);
    });
  }

  //filter courses
  function getFilteredCourses() {
    const level = levelFilter.value;
    const subject = subjectFilter.value;

    return courses.filter(course => {
      const matchesLevel = (level === "all") || (course.level === level);
      const matchesSubject = (subject === "all") || (course.subject === subject);
      return matchesLevel && matchesSubject;
    });
  }

  // render course cards
  async function renderCourses() {
    // const filtered = getFilteredCourses();
    const filtered = await getCourses();
    console.log(filtered);

    coursesContainer.innerHTML = "";

    //summary
    const levelLabel = levelFilter.value === "all" ? "All levels" : levelFilter.value;
    const subjectLabel = subjectFilter.value === "all" ? "All subjects" : subjectFilter.value;
    summaryText.textContent = `${filtered.length} course(s) matching: ${levelLabel}, ${subjectLabel}`;

    if (filtered.length === 0) {
      coursesContainer.innerHTML =
      `<div class="no-results">
        No courses match your filters. Try selecting a different level or subject.
      </div>`;
      return;
    }

    filtered.forEach(course => {
      const card = document.createElement("article");
      card.className = "course-card";

      card.innerHTML =
      `<div class="course-title-row">
          <div>
            <div class="course-name">${course.course_name}</div>
            <div class="course-code">${course.course_num}</div>
          </div>
        </div>
        <div class="course-details">
            ${course.course_description}
        </div>`;

      coursesContainer.appendChild(card);
    });
  }

  //clear filters
  function clearFilters() {
    levelFilter.value = "all";
    subjectFilter.value = "all";
    renderCourses();
  }

  //listeners for change and click
  levelFilter.addEventListener("change", renderCourses);
  subjectFilter.addEventListener("change", renderCourses);
  clearFiltersBtn.addEventListener("click", clearFilters);

  // generate courses
  subjectOptions();
  renderCourses();
