
//get html elements by class
// const levelFilter = document.getElementById("levelFilter");
// const subjectFilter = document.getElementById("subjectFilter");
const coursesContainer = document.getElementById("coursesContainer");
const summaryText = document.getElementById("summaryText");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const courseSearchInp = document.getElementById("courseSearch");
const redirectCreateCourse = document.getElementById("redirect-createCourse");

async function getCourses() {
  const resp = await fetch("/courses");
  const data = await resp.json();
  return data;
}

async function deleteCourse(course_num) {
  await fetch(`/course_delete/${course_num}`, { method: 'DELETE' } );
}


// render course cards
async function renderCourses(courses) {

coursesContainer.innerHTML = "";


if (courses.length === 0) {
  coursesContainer.innerHTML =
  `<div class="no-results">
    No courses match your filters. Try selecting a different level or subject.
  </div>`;
  return;
}

courses.forEach(course => {
  const card = document.createElement("article");
  card.className = "course-card";


  card.innerHTML =
  `<div class="course-title-row">
      <div>
        <div class="course-name">${course.course_name}</div>
        <div class="course-code">${course.course_num}</div>
      </div>
      <button id=${course.course_num}></button>
    </div>
    <div class="course-details">
        ${course.course_description}
    </div>`;

  coursesContainer.appendChild(card);

  document.getElementById(course.course_num).addEventListener('click', async event => {
      await deleteCourse(course.course_num);
      await displayAllCourses();
  });

});
}

async function displayAllCourses() {
    const courses = await getCourses();
    renderCourses(courses);
}

async function clearSearch() {
    courseSearchInp.value = "";
    await displayAllCourses();
}

async function searchCourses(event) {
    const resp = await fetch(`/course_search_safe?course_name=${event.target.value}`);
    const courses = await resp.json();
    renderCourses(courses);
}

//listeners for change and click
clearFiltersBtn.addEventListener("click", clearSearch);
courseSearchInp.addEventListener("input", searchCourses)
redirectCreateCourse.addEventListener('click', () => {
    window.location.href = 'create_course.html';
})

// generate courses
displayAllCourses();
