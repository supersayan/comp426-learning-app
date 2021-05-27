import { getSession } from 'next-auth/client';

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function fetchAPI_POST(path, body) {
  const session = await getSession();
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: 'Bearer ' + session.jwt,
      "Content-Type": 'application/json',
    }
  });
  const data = await response.json();
  return data;
}

// Departments

export async function getDepartments() {
  const departments = await fetchAPI("/departments");
  return departments;
}

export async function getDepartment(did) {
  const departments = await fetchAPI(`/departments?did=${did}`);
  return departments?.[0];
}

export async function getDepartmentByName(name) {
  const departments = await fetchAPI(`/departments?name=${name}`);
  return departments?.[0];
}

// Courses

export async function getCourses() {
  const courses = await fetchAPI("/courses");
  return courses;
}

export async function getCourse(cid) {
  const courses = await fetchAPI(`/courses?cid=${cid}`);
  return courses?.[0];
}

// Performance

export async function getPerformance() {
  const performance = await fetchAPI("/performance");
  return performance;
}

// Topics

export async function getTopics() {
  const topics = await fetchAPI("/topics");
  return topics;
}

export async function getTopic(tid) {
  const topics = await fetchAPI(`/topics?tid=${tid}`);
  return topics?.[0];
}

// Questions

export async function getQuestions() {
  const questions = await fetchAPI("/questions");
  return questions;
}

export async function getQuestion(qid) {
  const question = await fetchAPI(`/questions?qid=${qid}`);
  return question?.[0];
}

export async function addQuestion(topic, question_text, model_answer, points) {
  const session = await getSession();
  // console.log((question_text + model_answer));
  // console.log((question_text + model_answer).hashCode());
  console.log(question_text, model_answer);
  const question = await fetchAPI_POST(`/questions`, {
    "qid": ((question_text + model_answer).hashCode() + Math.floor(Math.random() * 100000)).toString().substring(0,5),
    "question_text": question_text,
    "model_answer": model_answer,
    "topic": topic,
    "points": points,
  });
  return question?.[0];
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};