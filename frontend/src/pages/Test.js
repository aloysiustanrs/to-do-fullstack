import { useTaskContext } from "../context/TaskContext";

const Test = () => {
  const { testString } = useTaskContext();

  return <div>AWS CICD SUCCESS! String is "{testString}"</div>;
};
export default Test;
