from faker import Faker
import random
import csv


NUM_ROWS = 50

fake = Faker()

fall_grades_file = open("24F.csv", mode="r", newline="")
fall_grades = csv.DictReader(fall_grades_file)


def id():
    return fake.unique.random_number(digits=6, fix_len=True)


def address():
    return fake.address().replace("\n", ", ")


def run_gen(gen, rows):
    return [[x[1]() for x in gen] for _ in range(rows)]


def header(gen):
    return [x[0] for x in gen]


def phone_number():
    return fake.phone_number()[:14]


counselor_gen = [
    ("cid", id),
    ("ssn", fake.unique.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("alpha_range", lambda: random.choice(["A-G", "G-N", "N-T", "T-Z"])),
]

counselors = run_gen(counselor_gen, 50)


student_gen = [
    ("sid", id),
    ("cid", lambda: random.choice(counselors)[0]),
    ("ssn", fake.unique.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("gpa", lambda: fake.random_int(min=0, max=4)),
    ("dob", fake.date_of_birth),
    ("email", fake.unique.email),
    ("address", address),
]

students = run_gen(student_gen, 1000)
random_sids = random.sample([x[0] for x in students], len(students))

senior_gen = [("sid", lambda: random_sids.pop()), ("grad_status", fake.boolean)]
seniors = run_gen(senior_gen, 30)

junior_gen = [
    ("sid", lambda: random_sids.pop()),
    ("sat", lambda: fake.random_int(min=500, max=1600)),
]
juniors = run_gen(junior_gen, 30)

sophmore_gen = [
    ("sid", lambda: random_sids.pop()),
    ("psat", lambda: fake.random_int(min=500, max=1600)),
]

sophmores = run_gen(sophmore_gen, 30)

teacher_gen = [
    ("tid", id),
    ("ssn", fake.unique.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("email", fake.unique.email),
    ("phone", phone_number),
    ("room_no", id),
]

teachers = run_gen(teacher_gen, 77)

administrator_gen = [
    ("aid", id),
    ("ssn", fake.unique.ssn),
    ("fname", fake.first_name),
    ("lname", fake.last_name),
    ("email", fake.unique.email),
    ("phone", phone_number),
    ("room_no", id),
]

administrators = run_gen(administrator_gen, 33)

random_teachers = random.sample([x[0] for x in teachers], len(teachers))

supervises_gen = [
    ("aid", lambda: random.choice(administrators)[0]),
    ("tid", lambda: random_teachers.pop()),
]
supervises = run_gen(supervises_gen, 77)


course_names = list(set(x["Subject"] + x["Catalog Nbr"] for x in fall_grades))

course_names_gen = course_names.copy()
course_gen = [
    ("course_num", id),
    ("course_name", lambda: course_names_gen.pop()),
    ("course_description", fake.sentence),
]

courses = run_gen(course_gen, len(course_names))

course_nums = [course[0] for course in courses]

random_course_nums_ap = random.sample(course_nums, len(course_nums))
ap_course_gen = [
    ("course_name", lambda: random_course_nums_ap.pop()),
    ("exam_date", lambda: fake.date_between(start_date="today", end_date="+1y")),
]

ap_courses = run_gen(ap_course_gen, 50)

prereq_gen = [
    ("course_num", lambda: random.choice(course_nums)),
    ("prereq_num", lambda: random.choice(course_nums)),
]

prereqs = run_gen(prereq_gen, 10)


section_gen = [
    ("section_id", id),
    ("course_num", lambda: random.choice(course_nums)),
    ("tid", lambda: random.choice(teachers)[0]),
    ("class_time", lambda: f"{fake.day_of_week()} {fake.time(pattern="%H:%M")}"),
    ("room_no", id),
]

sections = run_gen(section_gen, len(courses) * 3)

# sections_file = open("section.csv", mode="r", newline="")
# sections = [list(section) for section in csv.reader(sections_file)]
# students = [
#     student for student in csv.reader(open("student.csv", mode="r", newline=""))
# ][1:]


random_sections = random.choices(sections, k=4000)
random_section_ids = [section[0] for section in random_sections]
random_course_nums = [section[1] for section in random_sections]

enroll_gen = [
    ("sid", lambda: random.choice(students)[0]),
    ("section_id", lambda: random_section_ids.pop()),
    ("course_num", lambda: random_course_nums.pop()),
]


enrolls = [list(y) for y in list(set(tuple(x) for x in run_gen(enroll_gen, 4000)))]


def write_fake_csv(file_name, fake_header, fake_data):

    with open(file_name, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)

        writer.writerow(fake_header)

        for row in fake_data:
            writer.writerow(row)


# write_fake_csv("student.csv", header(student_gen), students)
# write_fake_csv("senior.csv", header(senior_gen), seniors)
# write_fake_csv("junior.csv", header(junior_gen), juniors)
# write_fake_csv("sophmore.csv", header(sophmore_gen), sophmores)
# write_fake_csv("teacher.csv", header(teacher_gen), teachers)
# write_fake_csv("administrator.csv", header(administrator_gen), administrators)
# write_fake_csv("counselor.csv", header(counselor_gen), counselors)
# write_fake_csv("supervises.csv", header(supervises_gen), supervises)
# write_fake_csv("course.csv", header(course_gen), courses)
# write_fake_csv("ap_course.csv", header(ap_course_gen), ap_courses)
# write_fake_csv("prereq.csv", header(prereq_gen), prereqs)
# write_fake_csv("section.csv", header(section_gen), sections)
# write_fake_csv("enroll.csv", header(enroll_gen), enrolls)
