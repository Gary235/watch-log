
const importData = (json) => {
  console.log(json)
  const data = JSON.parse(json);
  Object.entries(data).forEach(([key, value]) => localStorage.setItem(key, JSON.stringify(value)));
  location.reload();
}

export default importData