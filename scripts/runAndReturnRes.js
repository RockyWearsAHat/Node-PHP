import child_process from "child_process";
const runAndReturnRes = (path) => {
  const spawn = child_process.spawnSync;
  var process = spawn("php", [`${path}`]);
  return process.stdout;
};

export default runAndReturnRes;
