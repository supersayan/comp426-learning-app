import Head from "next/head";
import { useRouter } from "next/router";
import { getTopics, getTopic, addQuestion } from "../../utils/api";
import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/client';

const TopicPage = ({ topic, error, session }) => {
  const [ _topic, setTopic ] = useState(topic);
  const [ _session, refreshSession ] = useState(session);
  // const [ session ] = useSession();
  // const [ _session, dontSetSession ] = useState(session);

  // const [session] = useSession();
  useEffect( async () => {
    refreshSession(await getSession());
  });

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading topic...</div>;
  }

  const submitQuestionForm = async event => {
    event.preventDefault();

    if (event.target.question_text.value === '' || event.target.model_answer.value === '') {
      return;
    }

    addQuestion(topic.id, event.target.question_text.value, event.target.model_answer.value, event.target.points.value).then(async (res) => {
      const topic_ = await getTopic(_topic.tid);
      setTopic(topic_);
    });
  }

  return (
    <div className="m-6 gap-4 mt-8">
      <Head>
        <title>{_topic.topic_title}</title>
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
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">
            {_topic.topic_title}
          </h4>
          <div className="table w-full p-2">
            <form onSubmit={submitQuestionForm}>
              <table className="w-full border table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b">
                      <th className="p-2 border-r text-sm font-thin text-gray-500">qid</th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">question</th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">answer</th>
                      <th className="p-2 border-r text-sm font-thin text-gray-500">points</th>
                  </tr>
                </thead>
                <tbody>
                  {_topic.questions.map((_question) => (
                      <tr className="bg-gray-100 text-center border-b text-sm text-gray-600" key={_question.qid}>
                        <td className="p-2 border-r">{_question.qid}</td>
                        <td className="p-2 border-r">{_question.question_text}</td>
                        <td className="p-2 border-r">{_question.model_answer}</td>
                        <td className="p-2 border-r">{_question.points}</td>
                      </tr>
                  ))}
                  { (_session) ? 
                  <tr className="bg-gray-50 text-center">
                    <td className="p-2 border-r">
                        {/* <input type="number" className="border p-1" onChange={this.handleChange.bind(this, 'qid')}/> */}
                        <button className="btn border p-1 btn-blue" type="submit">+</button>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1" id="question_text" name="question_text"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1" id="model_answer" name="model_answer"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="number" defaultValue="1" className="border p-1" id="points" name="points"/>
                    </td>
                  </tr> : <tr></tr>}
                </tbody>
              </table>
            </form>
            <button className="btn">

            </button>
          </div>
        </div>

        <div>
          {(error) ? {error} : ''}
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

export default TopicPage;

export async function getStaticProps(ctx) {
  const topic = await getTopic(ctx.params.slug);
  return {
    props: {
      topic: topic,
      error: (ctx.res && ctx.res.statusCode !== 200) ? ctx.res.statusCode + ': ' + ctx.res.statusMessage : null,
    }
  }
}

export async function getStaticPaths() {
  const topics = await getTopics();
  return {
    paths: topics.map((_topic) => {
      return {
        params: { slug: _topic.tid },
      };
    }),
    fallback: true,
  };
}

// export async function getServerSideProps(ctx) {
  // const topic = await getTopic(ctx.params.slug);
  // return {
  //   props: topic,
  //   error: (ctx.res && ctx.res.statusCode !== 200) ? ctx.res.statusCode + ': ' + ctx.res.statusMessage : null,
  // }
// }