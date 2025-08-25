const Header = ({ name }) => {
  return <h2>{name}</h2>;
};
const Content = ({ parts }) => {
  return parts.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>
        total of {course.parts.reduce((acc, cur) => acc + cur.exercises, 0)}{" "}
        exercises
      </p>
    </>
  );
};

export default Course;
