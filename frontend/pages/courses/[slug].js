import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCourses, getCourse } from "../../utils/api";
import { getStrapiMedia } from "../../utils/medias";

const CoursePage = ({ course }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading course...</div>;
  }

  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
      <Head>
        <title>{course.department + " " + course.course_number}</title>
      </Head>
      <div className="rounded-t-lg pt-2 pb-2">
        {/* <img
          src={getStrapiMedia(course.image.formats.thumbnail.url)}
          className="m-auto"
          alt={course.title}
        /> */}
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700 space-y-10">
            {course.course_title}
          </h4>
          {/* <div className="mt-1 text-gray-600">{course.description}</div> */}
          {course.topics.map( (_topic) => (
            <Link href={`/topics/${_topic.tid}`} key={_topic.tid}>
              <div className="mt-1 text-sm text-gray-700 cursor-pointer border rounded hover:underline w-auto p-2 bg-gray-300">
                {_topic.topic_title}
              </div>
            </Link>
          ))}
        </div>

        {/* {course.status === "published" ? (
          <button
            className="snipcart-add-item mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
            data-item-id={course.id}
            data-item-price={course.price}
            data-item-url={router.asPath}
            data-item-description={course.description}
            data-item-image={getStrapiMedia(
              course.image.formats.thumbnail.url
            )}
            data-item-name={course.title}
            v-bind="customFields"
          >
            Add to cart
          </button>
        ) : (
          <div className="text-center mr-10 mb-1" v-else>
            <div
              className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Coming soon...
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                This article is not available yet.
              </span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CoursePage;

export async function getStaticProps({ params }) {
  const course = await getCourse(params.slug);
  return { props: { course } };
}

export async function getStaticPaths() {
  const courses = await getCourses();
  return {
    paths: courses.map((_course) => {
      return {
        params: { slug: _course.cid },
      };
    }),
    fallback: true,
  };
}
