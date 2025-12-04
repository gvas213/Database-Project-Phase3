async function createCourse(num, name, desc) {
    const resp = await fetch("/course_create", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({num, name, desc})
    });

    const data = await resp.json();

    return data;
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("createCourseForm");

    const numInp = document.getElementById("createCourseCNum");
    const nameInp = document.getElementById("createCourseCName");
    const descInp = document.getElementById("createCourseCDesc");
    const errorBox = document.getElementById("createCourseError");
    const redirectBrowse = document.getElementById("redirectBrowse");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        errorBox.textContent = "";
        errorBox.classList.remove('text-success');
        errorBox.classList.add('text-danger');


        const { error, message } = await createCourse(numInp.value, nameInp.value, descInp.value);

        if(error) {
            errorBox.textContent = error;
            return;
        }

        errorBox.classList.remove('text-danger');
        errorBox.classList.add('text-success');
        errorBox.textContent = message;

        form.reset();

    });

    redirectBrowse.addEventListener('click', _e => {
        window.location.href = 'browse-courses.html';
    });
})
