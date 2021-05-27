import Link from "next/link";
// import { getStrapiMedia } from "../utils/medias";

const CoursesList = ({ courses, dept }) => {
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
      {courses.map((_course) => (
        <div
          key={_course.id}
          className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md"
        >
          <Link href={`/courses/${_course.cid}`}>
            <a>
              <div className="rounded-t-lg bg-white pt-2 pb-2" style={{backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16)}}>
                {/* <img
                  className="crop mx-auto"
                  src={getStrapiMedia(_course.image.formats.thumbnail.url)}
                  alt={_course.title}
                /> */}
              </div>
              <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                <h3 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {(_course.department.name ?? dept.name) + " " + _course.course_number}
                </h3>
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_course.course_title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  {_course.credit_hours === 1 ? "1 Credit" : _course.credit_hours + " Credits"}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CoursesList;
