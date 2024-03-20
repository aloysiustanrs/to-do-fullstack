import { useTaskContext } from "../context/TaskContext";

const Test = () => {
  const { testString } = useTaskContext();

  return <div>TEST 1132 03202024 "{testString}"</div>;
};
export default Test;
