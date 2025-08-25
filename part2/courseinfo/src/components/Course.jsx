const Header = ({ name }) => {
  return <h1>{name}</h1>;
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
  const calculateTotal = () => {
    return course.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <p>total of {calculateTotal()} exercises</p>
    </>
  );
};

export default Course;
